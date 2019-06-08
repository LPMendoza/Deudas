import { Component, OnInit } from '@angular/core';
import { Deudor } from 'src/app/models/Deudor';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare var M: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  deudor: Deudor = {

    telefono: '',
    pass: '',
    nombre: '',
    adeudo: 0,
    email: ''

  }

  constructor(private adminServie: AdminService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("KEY_ACCESS") == '') {
      this.router.navigateByUrl('/login');
    }
  }

  getDeudores(){
  }

  createDeudor(): void {
    
    if(this.deudor.nombre != '' ||  this.deudor.telefono != '' 
    || this.deudor.pass != '' || this.deudor.adeudo != 0) {
      
      if(this.deudor.telefono.toString().length != 10 ) {
        M.toast({html: 'Teléfono inválido'});
      }      
      else {
        console.log(this.deudor);
        M.toast({html: 'Deudor Registrado'});
      }
    }
    else {
      M.toast({html: 'Hay campos en blanco'});
    }
  }

  cleanForm(form: NgForm): void {

    form.reset();
  }

}
