import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UploadComponent } from './components/upload/upload.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { BlockViewComponent } from './components/block-view/block-view.component';
import {AppRoutingModule} from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UploadComponent,
    TableViewComponent,
    BlockViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
