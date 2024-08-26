import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.username, this.password).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Your account has been created successfully!',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.router.navigate(['/login']);  // Redirect to login after the alert
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'There was a problem with your registration. Please try again.',
        });
        console.error('Registration failed', error);
      }
    );
  }
}
