import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, Subject, takeUntil } from 'rxjs';
import { TYPE } from 'src/app/models/type.enum';
import { IUser } from 'src/app/models/user.model';
import { DummyapiService } from 'src/app/service/dummyapi.service';
import { ViaCepService } from 'src/app/service/Via Cep/via-cep.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  prepareUser!: IUser;
  isUpdate: boolean = false;
  isView: boolean = false;
  title: string = 'Cadastro';
  userId!: string;

  private cepSubject = new Subject<string>();
  private destroy$ = new Subject<void>;

  constructor(
    private fb: FormBuilder,
    private viaCepService: ViaCepService,
    private dummyApi: DummyapiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];

    if(this.router.url.includes('view')) {
      this.isView = true;
      this.isUpdate = false;
      this.title = 'Visualização';
    }

    if(this.router.url.includes('update')) {
      this.isUpdate = true;
      this.isView = false;
      this.title = 'Atualização';
    }

    this.buildUserForm();

    if(this.userId) {
      this.getUserById()
    }

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

      if(this.userId) {
        this.prepareUser.id = this.userId;
        this.updateUser();
        return;
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
      id: [''],
      firstName: [{ value: '', disabled: this.isView }, [Validators.required, Validators.minLength(2)]],
      lastName:  [{ value: '', disabled: this.isView }, [Validators.required, Validators.minLength(2)]],
      gender:    [{ value: '', disabled: this.isView }, [Validators.required]],
      picture: [{ value: '', disabled: this.isView }],
      email:     [{ value: '', disabled: this.isView || this.isUpdate }, [Validators.required, Validators.email]],
      dateOfBirth: [{ value: '', disabled: this.isView }, [Validators.required]], 
      phone: [{ value: '', disabled: this.isView }, [Validators.required]],
      cep:  [{ value: '', disabled: this.isView }],
      street:  [{ value: '', disabled: this.isView }],
      city:    [{ value: '', disabled: this.isView }],
      state:   [{ value: '', disabled: this.isView }],
      country: [{ value: '', disabled: this.isView }],
      timezone: [{ value: '', disabled: this.isView }]
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
        this.toast(TYPE.SUCCESS, 'Cadastrado com sucesso!')
        this.userForm.reset();
        this.router.navigate(['/user/list']);
      }
    })
  }

  private getUserById(): void {
    this.dummyApi.getRegisteredUser(this.userId).pipe(takeUntil(this.destroy$)).subscribe({
      next: res => {
        this.userForm.get('id')?.setValue(res.id)
        this.userForm.get('firstName')?.setValue(res.firstName);
        this.userForm.get('lastName')?.setValue(res.lastName);
        this.userForm.get('gender')?.setValue(res.gender);
        this.userForm.get('picture')?.setValue(res.picture);
        this.userForm.get('email')?.setValue(res.email);
        this.userForm.get('dateOfBirth')?.setValue(this.convertDate(res.dateOfBirth));
        this.userForm.get('phone')?.setValue(res.phone);
        this.userForm.get('street')?.setValue(res.location.street);
        this.userForm.get('city')?.setValue(res.location.city);
        this.userForm.get('state')?.setValue(res.location.state);
        this.userForm.get('country')?.setValue(res.location.country);
        this.userForm.get('timezone')?.setValue(res.location.timezone);
        
      }
    })
  }

  private updateUser(): void {
    this.dummyApi.updateRegisteredUser(this.userId, this.prepareUser).pipe(takeUntil(this.destroy$)).subscribe({
      next: res => {
        this.toast(TYPE.SUCCESS, 'Atualizado com sucesso!')
        this.router.navigate(['/user/view/'+this.userId]);
      }
    });
  }

  private convertDate(date: string): string {
    const isoDate = date;
    const dateObj = new Date(isoDate);

    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private toast(type: any, msg: string) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: type,
      timer: 3000,
      title: msg
    })
  }

}
