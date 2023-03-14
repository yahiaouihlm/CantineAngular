import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorComponent } from 'src/app/globalCompenets/validator/validator.component';
import { CantineHandlerService } from 'src/app/services/cantine-handler.service';

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.component.html',
  styles: [
  ]
})



export class EditMealComponent implements OnInit {

  idmealtoupdate = "";

  submitted = false;

  meal = { label: "", description: "", prixht: 0, quantite: 0, categorie: "", image: "" };

  image!: File;


  newmeal: FormGroup = new FormGroup({
    mealname: new FormControl(this.meal.label, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    mealdescription: new FormControl(this.meal.description, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    mealprice: new FormControl(this.meal.prixht, [Validators.required]),
    mealquantity: new FormControl(this.meal.quantite, [Validators.required]),
    mealcategory: new FormControl(this.meal.categorie, [Validators.required]),
    mealImage: new FormControl('')
  });


  messageError = "Un problème est survenu ! Nous vous invitons à vous reconnecter. Si le problème persiste, veuillez contacter l'administration de votre école"

  constructor(private router: ActivatedRoute, private route: Router, private cantineHandlerService: CantineHandlerService, private matDialog: MatDialog) { }

  ngOnInit(): void {

    this.newmeal.controls['mealImage'].markAsPristine();
    const param = this.router.snapshot.paramMap.get('id');
    if (param == null || param == undefined)
      this.idmealtoupdate = "";
    else {
      this.idmealtoupdate = param;
    }

    this.getmealToedit();



  }



  removeMeal(): void {
    console.log("je suis dans le remove  mail   ");

    const result = this.matDialog.open(ValidatorComponent, {
      data: { message: "Voulez Vous Vraiment supprimer ce plat " }
    });

    result.afterClosed().subscribe((result) => {
      if (result === 'oui') {
        console.log("tu  as clicé sur oui ");

        this.cantineHandlerService.removemealByid(this.idmealtoupdate).subscribe({
          next: next => {
            if (next.message === "DELETED" && next.httpStatus == "OK" && next.data != undefined) {
              alert("Le Plat à  été  supprimer Avec succès ");
              this.route.navigate(['cantine'], { queryParams: { reload: 'true' } });

            }

            else if (next.message === "CONSTRAINT" && next.httpStatus == "OK" && next.data != undefined) {
              const result = this.matDialog.open(ValidatorComponent, {
                data:
                {
                  message: " Il est impossible de supprimer  Ce plats car il  est présent dans  Certains  menu Vous devriez Assurer que il sont dans  aucun menu  ",

                }
              });
              result.afterClosed().subscribe(result => {
                this.route.navigate(['cantine/meals'], { queryParams: { reload: 'true' } });
              })


            }

            else {
              alert("Ce plat n'a pas pu être supprimer. Il est possible qu'il ait été supprimé ou qu'il s'agisse d'une erreur serveur. Dans ce cas, veuillez contacter l'administration");
              localStorage.clear();
              this.route.navigate(['cantine'], { queryParams: { reload: 'true' } });
            }
          },

          error: error => {
            if (error.status == 403 && error.error.message === "EXPIRED_TOKEN" && error.error.data === "EXPIRED_TOKEN") {
              localStorage.clear();
              this.route.navigate(['cantine/ExpiredSession'], { queryParams: { reload: 'true' } });
              return;
            }

            alert("Ce plat n'a pas pu être supprimer. soit  il s'agit d'un probléme réseau  ou une erreur serveur. Dans ce cas, veuillez contacter l'administration");
            localStorage.clear();
            this.route.navigate(['cantine'], { queryParams: { reload: 'true' } });
          }
        });
      }
      else {
        return;
      }


    })

    return;

  }


  get f(): { [key: string]: AbstractControl } {
    return this.newmeal.controls;
  }



  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0]
    this.image = file;
  }


  //  enregister les modification 
  onSubmit() {
    console.log("je suis dans le subbmited");

    this.submitted = true;
    if (this.newmeal.invalid)
      return;
    const result = this.matDialog.open(ValidatorComponent, {
      data: { message: "Voulez Vous Vraiment Modifier hhhhhh  ce plat " }
    });
    result.afterClosed().subscribe((result) => {
      if (result != undefined || result != null || result === 'oui') {
        this.updateMeal();
      }
    })

  }




  updateMeal() {
    const formData: FormData = new FormData();
    if (this.image != null || this.image != undefined) // envoyer  une image  uniquement si  y'a eu  une image  ! 
      formData.append('image', this.image);

    formData.append('categorie', this.newmeal.controls['mealcategory'].value)
    formData.append('description', this.newmeal.controls['mealdescription'].value);
    formData.append('label', this.newmeal.controls['mealname'].value);
    formData.append('prixht', this.newmeal.controls['mealprice'].value);
    formData.append('quantite', this.newmeal.controls['mealquantity'].value);

    this.cantineHandlerService.updateMeal(formData, this.idmealtoupdate).subscribe({
      next: next => {
        if (next.message == "SUCCESS" && next.httpStatus == "OK" && next.data != undefined) {
          this.matDialog.open(ValidatorComponent, {
            data:
              { message: " Votre Meu à était Modifier  Avec Succees   " }
          });
          this.route.navigate(['cantine/meals'], { queryParams: { reload: 'true' } });
        }
        else {
          console.log("ya une erreur  quel  que part  dans le else ");

        }
      },
      error: error => {
        if (error.status == 403 && error.error.message === "EXPIRED_TOKEN" && error.error.data === "EXPIRED_TOKEN") {
          localStorage.clear();
          this.route.navigate(['cantine/ExpiredSession'], { queryParams: { reload: 'true' } });
          return;
        }
        else {
          localStorage.clear();
          alert(this.messageError);
          this.route.navigate(['cantine'], { queryParams: { reload: 'true' } });
        }
      }

    })

  }


  // Lire le plat à modifier depuis le serveur  
  getmealToedit() {
    this.cantineHandlerService.getmealByid(this.idmealtoupdate)
      .subscribe({
        next: next => {
          if (next.data != undefined && next.httpStatus === "OK" && next.message === "SENDED") {
            this.meal.prixht = next.data.prixht;
            this.meal.label = next.data.label;
            this.meal.categorie = next.data.categorie;
            this.meal.description = next.data.description;
            this.meal.quantite = next.data.quantite;
            this.meal.image = next.data.image;
          }

          else {
            alert("Ce plat n'a pas pu être chargé. Il est possible qu'il ait été supprimé ou qu'il s'agisse d'une erreur serveur. Dans ce cas, veuillez contacter l'administration");
            localStorage.clear();
            this.route.navigate(['cantine'], { queryParams: { reload: 'true' } });
          }

        },
        error: error => {
          if (error.status == 403 && error.error.message === "EXPIRED_TOKEN" && error.error.data === "EXPIRED_TOKEN") {
            localStorage.clear();
            this.route.navigate(['cantine/ExpiredSession'], { queryParams: { reload: 'true' } });
            return;
          }


          localStorage.clear();
          alert(this.messageError);
          this.route.navigate(['cantine'], { queryParams: { reload: 'true' } });
        }

      })
  }


  goback() {
    console.log("je suis dans annuler ");

    this.route.navigate(['cantine/meals']);
  }



}
