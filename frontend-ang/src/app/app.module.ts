import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatChipTrailingIcon} from "@angular/material/chips";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatMenu, MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatList, MatListItem} from "@angular/material/list";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbar,
    MatButton,
    MatIconModule,
    MatChipTrailingIcon,
    MatIcon,
    MatIconButton,
    MatMenuModule,
    MatSidenavModule,
    MatList,
    MatListItem,
    AdminTemplateComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
