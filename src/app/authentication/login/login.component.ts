import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {
    const userInfo: string = localStorage.getItem('userinfo');
    if (userInfo) {
      this.checkRoute(JSON.parse(userInfo));
    }
   }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private checkRoute(respData): void {
    if (respData.role === 'admin') {
      this.router.navigateByUrl('/adminDelivery/details');
    } else if (respData.role === 'user') {
      this.router.navigateByUrl('/userParcel/details');
    }
  }

  public authenticateUser(): void {
    this.authService.authenticateUser(this.loginForm.value).subscribe(response => {
      if (response && response.data) {
        localStorage.setItem('userinfo', JSON.stringify(response.data));
        this.checkRoute(response.data);
      }
    }
    );
  }

}
