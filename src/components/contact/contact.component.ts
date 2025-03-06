import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contacts: any[] = [];
  form: FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.minLength(4), Validators.required]
    }),
    email: new FormControl('', {
      validators: [Validators.required, this.customEmailValidator]
    }),
    phone: new FormControl('', {
      validators: [Validators.required, Validators.pattern('^[0-9]{10}$')]
    }),
    message: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(500)]
    })
  });

  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  getError(control: any): string {
    if (control.errors?.required && control.touched)
      return 'This field is required';
    else if (control.errors?.emailError && control.touched)
      return 'Please enter a valid email address';
    else return '';
  }

  customEmailValidator(control: AbstractControl) {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    const value = control.value;
    if (!pattern.test(value))
      return { emailError: true };
    else return null;
  }

  onSave() {
    if (this.form.valid) {
      this.contacts.push(this.form.value);
      localStorage.setItem('contacts', JSON.stringify(this.contacts));
      alert(`Hi ${this.form.value.name}, data sent!`);
    }
    this.form.reset();
  }
 
}
