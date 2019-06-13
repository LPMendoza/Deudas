import { Component, OnInit } from '@angular/core';
import { Deudor } from 'src/app/models/Deudor';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Deuda } from '../../models/Deuda';

declare var M: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  deudoresArray = [];
  encontrado = false;
  deudores: any = [];
  conceptos: any = [];

  deuda: Deuda = {
    concepto: '',
    deudores: []
  }

  deudor: Deudor = {

    telefono: '',
    pass: '',
    nombre: '',
    mail: '',
    adeudo: 0,

  }

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("KEY_ACCESS") != '1234554321') {
      this.router.navigateByUrl('/login');
    }
    else {
      this.getDeudores();
      this.getConceptos();
    }

    this.conceptos = []
    
    let ckbAll = <HTMLInputElement>document.getElementById('ckbAll');
    ckbAll.checked = false;

  }

  
  checkAll() {
    let ckbAll = <HTMLInputElement>document.getElementById('ckbAll');

    if(ckbAll.checked == false) {

      this.deudoresArray = [];
      for(let i = 0; i < this.deudores.length; i++) {
        this.deudoresArray.splice(i, 1);
        let ckbD = <HTMLInputElement>document.getElementById(`${this.deudores[i].telefono}`);
        ckbD.checked = false;
      }

    }
    else {
    this.deudoresArray = [];
      for(let i = 0; i < this.deudores.length; i++) {
        this.deudoresArray.push(this.deudores[i].telefono);
        let ckbD = <HTMLInputElement>document.getElementById(`${this.deudores[i].telefono}`);
        ckbD.checked = true;
      }
    }
  }

  
  setTelefono(telefono: number) {

    if(this.deudoresArray.length == 0) {
      this.deudoresArray.push(telefono);
    }
    else {
      for(let i = 0; i < this.deudoresArray.length; i++) {
      
        if(this.deudoresArray[i] == telefono) {
          this.deudoresArray.splice(i,1); 
          this.encontrado = true;
          let ckbAll = <HTMLInputElement>document.getElementById('ckbAll');
          ckbAll.checked = false;
          break;
        }
        else {
         this.encontrado = false;
        }
      }

      if(this.encontrado == false) {
        this.deudoresArray.push(telefono);
      }
    }
  }

  getConceptos() {

    this.adminService.verConceptos().subscribe(
      res => {
        this.conceptos = res;
      },
      err => console.error(err)
    );

  }

  saveDeuda() {

    this.deuda.deudores = this.deudoresArray;
    if(this.deuda.concepto == '' || this.deuda.deudores.length == 0) {
      M.toast({html: 'Concepto o deudores no seleccionados'});
    }
    else {
      this.adminService.addDeuda(this.deuda).subscribe(
        res => {
          M.toast({html: 'Dueda Agregada'});
        },
        err => console.error(err)
      );
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
        );
    }

  }

  cleanForm(form: NgForm): void {

    form.reset();
  }

}
