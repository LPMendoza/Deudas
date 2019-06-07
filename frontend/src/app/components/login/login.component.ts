import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService} from '../../service/login.service';
import { User } from 'src/app/models/User';

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


  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    
    console.log(this.user);
    localStorage.setItem("KEY_ACCESS", this.user.telefono);
    this.router.navigateByUrl('/admin');

    
  }

}
