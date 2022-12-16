import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatToolbarModule} from '@angular/material/toolbar'
import { CoreCantineModule } from './core-cantine/core-cantine.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreCantineModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
