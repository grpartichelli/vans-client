import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import {RoutesDialogComponent} from "../components/routes-dialog/routes-dialog.component";
import {StudentsSelectDialogComponent} from "../components/students-select-dialog/students-select-dialog.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ShiftPipe} from "../pipe/shift.pipe";
import {DeleteDialogComponent} from "../components/delete-dialog/delete-dialog.component";
import {RoutesPlayComponent} from "../components/routes-play/routes-play.component";
import {ProfileComponent} from "../components/profile/profile.component";
import {DirectionPipe} from "../pipe/direction.pipe";
import {RouteNamePipe} from "../pipe/route-name.pipe";
import {ConfirmSelectDialogComponent} from "../components/confirm-select-dialog/confirm-select-dialog.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    BottomBar,
    StudentsComponent,
    RoutesComponent,
    StudentsDialogComponent,
    StudentsSelectDialogComponent,
    RoutesDialogComponent,
    ShiftPipe,
    DeleteDialogComponent,
    RoutesPlayComponent,
    ProfileComponent,
    DirectionPipe,
    RouteNamePipe,
    ConfirmSelectDialogComponent
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
    MatCheckboxModule,
    DragDropModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
