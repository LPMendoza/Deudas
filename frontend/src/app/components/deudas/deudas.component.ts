import { Component, OnInit } from '@angular/core';
import { NgForm, SelectMultipleControlValueAccessor } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';
import {Deuda}  from 'src/app/models/Deuda';
import {Concepto}  from 'src/app/models/concepto';
import {Pago}  from 'src/app/models/pago';

declare var M: any;

@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.component.html',
  styleUrls: ['./deudas.component.css']
})



export class DeudasComponent implements OnInit {

  deudoresArray = []
  encontrado = false;
  deudores: any = [];

  deuda: Deuda = {
    concepto: '',
    deudores: []
  }

  pago: Pago = {
    id_deudor: '',
    referencia_deuda: null,
    monto: null,
  }

  
  conceptos: Concepto[];

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('KEY_ACCESS') != '1234554321') {
      this.router.navigateByUrl('/login');
    }
    this.adminService.getDeudores().subscribe(
      res => {
        this.deudores = res;
      }
    )

    this.conceptos = [
      {nombre: 'kit1'},
      {nombre: 'kit2'},
      {nombre: 'kit3'},
      {nombre: 'kit4'}
      
    ];
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
    console.log(this.deudoresArray);
  }
  saveDeuda() {

    this.deuda.deudores = this.deudoresArray;
    if(this.deuda.concepto == '') {
      M.toast({html: 'Seleccione un concepto'});
    }
    if(this.deuda.deudores.length == 0){

      M.toast({html: 'Seleccione el deudor o deudores'});

    }
    else {
      console.log(this.deuda);
    }
  }

  addPago() {
    if(this.pago.referencia_deuda == null || this.pago.monto == null || this.pago.monto == 0
    || this.pago.id_deudor == '' || this.pago.id_deudor.length < 10) {

      M.toast({html: 'Campos incorrectos'});

    }
    else {
      M.toast({html: 'Pago realizado'});
      console.log(this.pago);
    }
  }

  setTelefono(telefono: number) {

    for(let i = 0; i < this.deudoresArray.length; i++) {
      
      if(this.deudoresArray[i] == telefono) {
        this.deudoresArray.splice(i,1); 
        console.log(this.deudoresArray);
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
      console.log(this.deudoresArray);
    }
  }


}
