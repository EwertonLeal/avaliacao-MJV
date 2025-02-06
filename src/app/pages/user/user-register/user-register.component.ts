import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, filter, switchMap, Subject, tap, of, delay, takeUntil } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { Address } from 'src/app/models/via-cep-address.model';
import { DummyapiService } from 'src/app/service/dummyapi.service';
import { ViaCepService } from 'src/app/service/Via Cep/via-cep.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  prepareUser!: IUser;
  private cepSubject = new Subject<string>();
  private destroy$ = new Subject<void>;

  constructor(
    private fb: FormBuilder,
    private viaCepService: ViaCepService,
    private dummyApi: DummyapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildUserForm();

    this.cepSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((cep) => this.viaCepService.consultarCEP(cep))
    )
    .subscribe({
      next: (res) => {
        this.userForm.get('street')?.setValue(res.logradouro);
        this.userForm.get('city')?.setValue(res.localidade);
        this.userForm.get('state')?.setValue(res.estado);
      },
      error: (err) => console.error('Erro:', err)
    });
  }

  ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

  onSubmit():void {
    let today = new Date();
    let dateOfBirth = new Date(this.userForm.get('dateOfBirth')?.value)

    if(this.userForm.valid) {
      this.prepareUser = {
        firstName: this.userForm.get('firstName')?.value,
        lastName: this.userForm.get('lastName')?.value,
        gender: this.userForm.get('gender')?.value,
        email: this.userForm.get('email')?.value,
        dateOfBirth: dateOfBirth.toISOString(),
        phone: this.userForm.get('phone')?.value,
        location: {
          cep: this.userForm.get('cep')?.value,
          street: this.userForm.get('street')?.value,
          city: this.userForm.get('city')?.value,
          state: this.userForm.get('state')?.value,
          timezone: this.userForm.get('timezone')?.value,
          country: this.userForm.get('country')?.value,
        },
        picture: this.userForm.get('picture')?.value,
        title: this.userForm.get('title')?.value,
        registerDate: today.toISOString(),
        updatedDate: today.toISOString()
      }

      this.createUser();
    }
  }

  onInputCep(event: any): void {
    this.cepSubject.next(event.target.value);
  }
  
  selectGender(event: any): void {
    this.userForm.get('gender')?.setValue(event.target.value);
    this.userForm.get('title')?.setValue(event.target.value == 'male' ? 'mr' : 'ms');
    this.generateRandomPicture(event.target.value == 'male' ? 'men' : 'women');
  }

  private buildUserForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName:  ['', [Validators.required, Validators.minLength(2)]],
      gender:    ['', [Validators.required]],
      picture: [''],
      email:     [{ value: '', disabled: false }, [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required]], 
      phone: ['', [Validators.required]],
      cep:  [''],
      street:  [''],
      city:    [''],
      state:   [''],
      country: [''],
      timezone: ['']
    });
  }

  private generateRandomPicture(gender: string): void {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let baseUrl = `https://randomuser.me/api/portraits/med/${gender}/${randomNumber}.jpg`;
    this.userForm.get('picture')?.setValue(baseUrl);
  }

  private createUser(): void {
    this.dummyApi.createRegisteredUser(this.prepareUser).pipe(takeUntil(this.destroy$)).subscribe({
      next: res => {
        this.userForm.reset();
        this.router.navigate(['/user/list']);
      }
    })
  }

}
