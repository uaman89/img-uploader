import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {UploadComponent} from './components/upload/upload.component';
import {TableViewComponent} from './components/table-view/table-view.component';
import {BlockViewComponent} from './components/block-view/block-view.component';
import {AppRoutingModule} from './app.routing.module';
import {UsersService} from './services/users.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth-guard.service';
import { DndDirective } from './directives/dnd.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UploadComponent,
    TableViewComponent,
    BlockViewComponent,
    DndDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    UsersService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
