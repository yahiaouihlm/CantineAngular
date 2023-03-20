import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorComponent } from 'src/app/globalCompenets/validator/validator.component';
import { Meal } from 'src/app/Models/meal';
import { CantineHandlerService } from 'src/app/services/cantine-handler.service';
import { PlatListComponent } from '../plat-list/plat-list.component';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styles: [],
  providers: [CantineHandlerService]
})
export class EditMenuComponent implements OnInit {
  isLoading = true;
  submitted = false;
  mealsIDs: number[] = [];
  menuToedit = { idmenu: -4, label: "", description: "", prixht: 0, quantite: 0, status: 0, image: "", plats: [] as Meal[] };
  idmenuToUpdate!: string;
  image!: File;
  choosenmealformenu: Meal[] = [];
  newmenu: FormGroup = new FormGroup({
    menuname: new FormControl(this.menuToedit.label, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    menudescription: new FormControl(this.menuToedit.description, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    menuprice: new FormControl(this.menuToedit.prixht, [Validators.required]),
    menuquantity: new FormControl(this.menuToedit.quantite, [Validators.required]),
    menuImage: new FormControl('')
  });
  messageError = "Un problème est survenu ! Nous vous invitons à vous reconnecter. Si le problème persiste, veuillez contacter l'administration de votre école";

  constructor(private router: ActivatedRoute, private cantineHandlrService: CantineHandlerService, private route: Router, private matDialog: MatDialog) { }


     /*   TODO    il  faut  ajouter la suppression  */ 
  ngOnInit(): void {
    const param = this.router.snapshot.paramMap.get('id');
    if (param == null || param == undefined)
      this.idmenuToUpdate = "";
    else {
      this.idmenuToUpdate = param;
    }

    this.getMenu();
  }


  onSubmit() {

    this.submitted = true;

    if (this.newmenu.invalid)
      return;

    const result = this.matDialog.open(ValidatorComponent, {
      data: { message: " Voulez Vous  Enregistrer  Les Modifications " }
    });
    result.afterClosed().subscribe((result: string) => {
      if (result === 'oui') {
        this.updateMeal();
        return;
      }
      else {
        return;
      }
    })



    // 
  }



  onChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0]
    this.image = file;

  }

  get f(): { [key: string]: AbstractControl } {
    return this.newmenu.controls;
  }


  updateMeal() {
    const formData: FormData = new FormData();
    if (this.image != null || this.image != undefined) // envoyer  une image  uniquement si  y'a eu  une image  ! 
      formData.append('image', this.image);

    formData.append('label', this.newmenu.controls['menuname'].value);
    formData.append('description', this.newmenu.controls['menudescription'].value)
    formData.append('prixht', this.newmenu.controls['menuprice'].value)
    formData.append('quantite', this.newmenu.controls['menuquantity'].value)
    if (this.choosenmealformenu.length < 2)
      this.choosenmealformenu = this.menuToedit.plats;

    this.choosenmealformenu.forEach((meal: Meal) => {
      this.mealsIDs.push(+meal.id);
    })

    const mealsJSON = JSON.stringify(this.mealsIDs);

    formData.append('mealsIDS', mealsJSON);

    this.cantineHandlrService.updateMenu(formData, this.menuToedit.idmenu).subscribe({
      next: next => {
         
        if (next.message == "SAVED" && next.httpStatus == "OK" && next.data != undefined) {
          this.matDialog.open(ValidatorComponent, {
            data: { message: "  Vos modifications ont étais bien  Enregistré Menu à était Enregistré avec succée " }
          });
          this.route.navigate(['cantine/menus'], { queryParams: { reload: 'true' } });
        }
        else {
          alert("Probléme de Serveur ou  de Envoie de données SVP réessez si Le probléme persiste contactez l'adminstration  de votre école")
          localStorage.clear();
          this.route.navigate(['cantine'], { queryParams: { reload: 'true' } });
        }
      },
      error: error => {
        this.errorHandler(error);
      }
    }
    )
  }


  getMenu() {
    this.cantineHandlrService.getmenuByid(this.idmenuToUpdate).subscribe({
      next: next => {
        if (next.message == "SENDED" && next.httpStatus == "OK" && next.data != undefined) {
          this.menuToedit.idmenu = next.data.idmenu
          this.menuToedit.status = next.data.status;
          this.menuToedit.description = next.data.description;
          this.menuToedit.label = next.data.label;
          this.menuToedit.image = next.data.image;
          this.menuToedit.prixht = next.data.prixht;
          this.menuToedit.quantite = next.data.quantite;
          this.menuToedit.plats = next.data.plats;
          this.matchFormsValue();
          this.isLoading = false;
        }
        else {
          alert("Ce menu n'a pas pu être chargé. Il est possible qu'il ait été supprimé ou qu'il s'agisse d'une erreur serveur. Dans ce cas, veuillez contacter l'administration");
          localStorage.clear();
          this.route.navigate(['cantine'], { queryParams: { reload: 'true' } });
        }
      },
      error: error => {
        this.errorHandler(error);
      }
    })
  }

  matchFormsValue() {
    this.newmenu.patchValue({
      menuname: this.menuToedit.label,
      menudescription: this.menuToedit.description,
      menuprice: this.menuToedit.prixht,
      menuquantity: this.menuToedit.quantite,
    })

  }

  goback() {
    console.log("je suis dans annuler ");
    this.route.navigate(['cantine/menus']);
  }

  onOpenDialogClick() {
    const result = this.matDialog.open(PlatListComponent);
    result.afterClosed().subscribe((result: Meal) => {
      if (result === undefined)
        this.choosenmealformenu = this.menuToedit.plats;

      else {
        this.choosenmealformenu.push(result);
      }
      //  this.clicked =  true ;  
    })



  }


  errorHandler(error: any) {
    if (error.status == HttpStatusCode.Forbidden && error.error.message === "EXPIRED_TOKEN" && error.error.data === "EXPIRED_TOKEN") {
      localStorage.clear();
      this.route.navigate(['cantine/ExpiredSession'], { queryParams: { reload: 'true' } });
      return;
    }
    else if (error.status = HttpStatusCode.InternalServerError) {
      localStorage.clear();
      alert(error.error.message);
      this.route.navigate(['cantine'], { queryParams: { reload: 'true' } });
      return;
    }
    else if (error.status = HttpStatusCode.BadRequest) {      
      localStorage.clear();
      alert(error.error.message);
      this.route.navigate(['cantine'], { queryParams: { reload: 'true' } });
      return;
    }
    else {
            localStorage.clear();
      alert(this.messageError);
      this.route.navigate(['cantine'], { queryParams: { reload: 'true' } });
    }
  }


}


