import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildUserForm();
  }

  onSubmit():void {}

  private buildUserForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName:  ['', [Validators.required, Validators.minLength(2)]],
      gender:    ['', [Validators.required]],
      email:     ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required]], 
      phone:     [
        '', 
        [
          Validators.required, 
          Validators.pattern(/^(\(\d{2}\)\s?)?\d{4,5}\-?\d{4}$/)
        ]
      ],
      location: this.fb.group({
        street:  ['', Validators.required],
        city:    ['', Validators.required],
        state:   ['', Validators.required],
        country: ['', Validators.required],
        timezone: ['', Validators.required]
      })
    });
  }

}
