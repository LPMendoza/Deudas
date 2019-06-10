import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('KEY_ACCESS') != '1234554321') {
      this.router.navigateByUrl('/login');
    }
  }

}
