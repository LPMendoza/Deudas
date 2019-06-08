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
    mail: '',
    adeudo: 0,

  }

  deudores: any = [];

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("KEY_ACCESS") == '') {
      this.router.navigateByUrl('/login');
    }
    this.getDeudores();
  }

  getDeudores(){
    this.adminService.getDeudores().subscribe(
      res => {
        this.deudores = res;
        console.log(res);
      }
    )
  }

  saveDeudor(form: NgForm) {
    
    if(this.deudor.telefono.toString() == '' ||
    this.deudor.pass == '' || this.deudor.nombre == '' || this.deudor.mail == '' || 
    this.deudor.telefono.toString().length > 10) {
        
      M.toast({html: 'Campos incorrectos'});

    }
    else {
        this.adminService.createDeudor(this.deudor).subscribe(
          res => {
            M.toast({html: 'Deudor registrado'});
            this.getDeudores();
            this.cleanForm(form);
          },
          err => console.error(err)
        )
    }

  }

  cleanForm(form: NgForm): void {

    form.reset();
  }

}
