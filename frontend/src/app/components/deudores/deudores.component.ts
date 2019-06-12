import { Component, OnInit } from '@angular/core';
import { DeudoresService } from '../../service/deudores.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.component.html',
  styleUrls: ['./deudores.component.css']
})
export class DeudoresComponent implements OnInit {

  deudas: any = [];
  pagos: any = [];
  adeudo: any = [];

  constructor(private deudoresService: DeudoresService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("KEY_ACCESS") == '') {
      this.router.navigateByUrl('/login');
    }
    else {
      this.getAdeudo();
      this.getPagos();
      this.getDeudas();
    }
  }

  getDeudas() {
    this.deudoresService.getDeudas().subscribe(
      res => {
        this.deudas = res;
      },
      err => console.error(err),
    );
  }

  getPagos() {
    this.deudoresService.getPagos().subscribe(
      res => {
        this.pagos = res;
      },
      err => console.error(err),
    );
  }

  getAdeudo() {
    this.deudoresService.getAdeudo().subscribe(
      res => {
        this.adeudo = res;
      },
      err => console.error(err),
    );
  }

}
