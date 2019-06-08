import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DeudoresComponent } from './components/deudores/deudores.component';
import { HttpClientModule } from '@angular/common/http';
import { NgForm, FormsModule} from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { DeudasComponent } from './components/deudas/deudas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DeudoresComponent,
    AdminComponent,
    DeudasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
