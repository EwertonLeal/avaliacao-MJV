import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DummyapiService } from 'src/app/service/dummyapi.service';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  	public page = 0;
	private destroy$ = new Subject<void>;

	constructor( private dummyApi: DummyapiService ) {	}

	ngOnInit(): void {
		this.getAllRegisteredUser();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	selectPage(page: string) {
		this.page = parseInt(page, 10) || 1;
	}

	formatInput(input: HTMLInputElement) {
		input.value = input.value.replace(FILTER_PAG_REGEX, '');
	}

	private getAllRegisteredUser(): void {
		this.dummyApi.getAllRegisteredUsers(this.page).pipe(takeUntil(this.destroy$)).subscribe({
			next: res => {
				console.log(res);
				
			},
			error: error => {
				console.log(error);
				
			}
		})
	}
}
