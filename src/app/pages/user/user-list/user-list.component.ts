import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { DummyapiService } from 'src/app/service/dummyapi.service';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
	public userList!: IUser[];
  	public page = 1;
	public collectionSize = 0;
	private destroy$ = new Subject<void>;

	constructor( private dummyApi: DummyapiService ) {	}

	ngOnInit(): void {
		this.getAllRegisteredUser();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	selectPage(page: any) {
		this.page = Number(page);
		this.getAllRegisteredUser();
	}

	formatInput(input: HTMLInputElement) {
		input.value = input.value.replace(FILTER_PAG_REGEX, '');
	}
	
	deleteUser(id?: string):void {
		this.dummyApi.deleteRegisteredUser(id).pipe(takeUntil(this.destroy$)).subscribe({
			next: res => {
				this.getAllRegisteredUser();
			}
		});
	}

	private getAllRegisteredUser(): void {
		let dummyApiPage = this.page - 1;

		this.dummyApi.getAllRegisteredUsers(dummyApiPage).pipe(takeUntil(this.destroy$)).subscribe({
			next: res => {
				this.userList = res?.data;
				this.collectionSize = res?.total;
			},
			error: error => {
				console.log(error);
				
			}
		})
	}
}
