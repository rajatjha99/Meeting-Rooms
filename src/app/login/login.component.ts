import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    if (this.authService.login(this.username, this.password)) {
      localStorage.setItem('userName', this.username);
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid credentials');
    }
  }

}
