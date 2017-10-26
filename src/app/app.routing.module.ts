import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {UploadComponent} from './components/upload/upload.component';
import {TableViewComponent} from './components/table-view/table-view.component';
import {BlockViewComponent} from './components/block-view/block-view.component';
import {AuthGuard} from './services/auth-guard.service';
import {PATH_LOGIN} from './constants';


export const appRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: 'upload', component: UploadComponent},
      {
        path: 'view',
        children: [
          {path: 'table', component: TableViewComponent},
          {path: 'blocks', component: BlockViewComponent},
        ]
      },
    ]
  },
  {path: PATH_LOGIN, component: LoginComponent},
  {path: '**', redirectTo: PATH_LOGIN}
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
