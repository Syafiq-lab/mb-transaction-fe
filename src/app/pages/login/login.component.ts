import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule] // Import FormsModule for ngModel
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    Swal.fire({
      title: 'Logging in...',
      text: 'Please wait while we process your request.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();  // Show loading spinner
      }
    });

    this.authService.login(this.username, this.password).subscribe(
      response => {
        Swal.close();
        this.authService.saveToken(response.token);
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You will be redirected to the transactions page.',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/transactions']);
        });
      },
      error => {
        Swal.close();  // Close the loading spinner
        console.error('Login failed', error);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Please check your credentials and try again.'
        });
      }
    );
  }
}
