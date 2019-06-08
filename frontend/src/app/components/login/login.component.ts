import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService} from '../../service/login.service';
import { User } from 'src/app/models/User';

declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    telefono: '',
    pass: '' 
  };
  
  checkUser: any = [];


  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    localStorage.setItem('KEY_ACCESS', '');
  }

  onLogin() {
    
    this.loginService.checkAdmin().subscribe(
      res => {
        this.checkUser = res;
        if(this.checkUser[0].telefono == this.user.telefono ||
          this.checkUser[0].pass == this.user.pass) {
            localStorage.setItem('KEY_ACCESS', this.user.telefono);
            this.router.navigateByUrl('/admin');
        }
        else {
          this.loginService.checkDeudor().subscribe(
            res => {
              this.checkUser = res;
              for(let i = 0; i < this.checkUser.length; i++) {
                if(this.checkUser[i].telefono == this.user.telefono ||
                  this.checkUser[i].pass == this.user.pass) {
                    localStorage.setItem('KEY_ACCESS', this.user.telefono);
                    this.router.navigateByUrl('/deudores');
                }
                else {
                  M.toast({html: 'Algo fué mal'});
                }
              }
            }
          )
        }
      },
      err => console.error(err)
    );
    
  }

}
