import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "../components/login/login.component";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {ToolbarComponent} from "../components/toolbar/toolbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {BottomBar} from "../components/bottom-bar/bottom-bar.component";
import {StudentsComponent} from "../components/students/students.component";
import {RoutesComponent} from "../components/routes/routes.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {StudentsDialogComponent} from "../components/students-dialog/students-dialog.component";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    BottomBar,
    StudentsComponent,
    RoutesComponent,
    StudentsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
