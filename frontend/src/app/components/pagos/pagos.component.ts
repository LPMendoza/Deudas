import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pago } from '../../models/Pago';
import { Filtro } from '../../models/Filtro';
import { PagosService } from '../../service/pagos.service';
 
@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  pagos: any = [];

  filtro: Filtro = {
    id_deudor: '',
    mes: 0
  };

  constructor(private router: Router, private pagosService: PagosService) { }

  ngOnInit() {
    if(localStorage.getItem('KEY_ACCESS') != '1234554321') {
      this.router.navigateByUrl('/login');
    }
    else {
      this.getPagosFiltrados();
    }
  }
/*
  getPagos() {
    this.pagosService.getPagos().subscribe(
      res => {
        this.pagos = res;
      },
      err => console.error(err)
    )
  }*/

  getPagosFiltrados() {
    console.log(this.filtro)
    this.pagosService.getPagosFiltrados(this.filtro).subscribe(
      res => {
        this.pagos = res;
      },
      err => console.error(err)
    )
  }

  setMesNull() {
    this.filtro.mes = null;
  }

}
