import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DeudoresComponent } from './components/deudores/deudores.component';
import { AdminComponent } from './components/admin/admin.component';
import { DeudasComponent } from './components/deudas/deudas.component';
import { PagosComponent } from './components/pagos/pagos.component';
 
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'deudores',
    component: DeudoresComponent
  },
  {
    path: 'admin/deudas',
    component: DeudasComponent
  },
  {
    path: 'admin/pagos',
    component: PagosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
