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
    if(localStorage.getItem("KEY_ACCESS") != '1234554321') {
      this.router.navigateByUrl('/login');
    }
    else {
      this.getDeudores();
    }
  }

  getDeudores(){
    this.adminService.getDeudores().subscribe(
      res => {
        this.deudores = res;
      }
    )
  }

  saveDeudor(form: NgForm) {
    
    if(this.deudor.telefono == '' || this.deudor.pass == '' 
    || this.deudor.nombre == '' || this.deudor.mail == '') {
        
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
