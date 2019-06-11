import { Component, OnInit } from '@angular/core';
import { NgForm, SelectMultipleControlValueAccessor } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';
import {Concepto}  from 'src/app/models/concepto';
import {Pago}  from 'src/app/models/pago';

declare var M: any;

@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.component.html',
  styleUrls: ['./deudas.component.css']
})



export class DeudasComponent implements OnInit {

  
  pago: Pago = {
    id_deudor: '',
    referencia_deuda: null,
    monto: null,
  }

  deudas: any = [];
  
  conceptos: Concepto[];

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('KEY_ACCESS') != '1234554321') {
      this.router.navigateByUrl('/login');
    }
    else {
      this.getDeudas();
    }
  }

  setIdDeudor(id_referencia: number, id_deudor: string, concepto: string) {
    this.pago.id_deudor = id_deudor;
    this.pago.referencia_deuda = id_referencia;
    let rbReferencia = <HTMLInputElement>document.getElementById('rdb');
    rbReferencia.textContent = `${this.pago.referencia_deuda} - ${concepto}`;
  }

  addPago() {
    if(this.pago.referencia_deuda == null || this.pago.monto == null || this.pago.monto == 0
    || this.pago.id_deudor == '' || this.pago.id_deudor.length < 10) {

      M.toast({html: 'Campos incorrectos'});

    }
    else {

      this.adminService.addPago(this.pago).subscribe(
        res => {
          M.toast({html: 'Pago realizado'});
          this.getDeudas();
        },
        err => console.error(err)
      );
    }
  }

  getDeudas() {

    this.adminService.getDeudas().subscribe(
      res => {
        this.deudas = res;
      },
      err => console.error(err)
    );

  }

}
