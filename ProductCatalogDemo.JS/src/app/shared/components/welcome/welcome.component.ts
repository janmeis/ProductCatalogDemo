import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ApiService, IUser } from 'src/app/services/api.service';

export interface Data {
  id: number;
  name: string;
  age: number;
  address: string;
  disabled: boolean;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  users: Observable<IUser[]>;

  isOperating = false;
  listOfDisplayData: IUser[] = [];
  listOfAllData: Data[] = [];
  numberOfChecked = 0;

  isVisible = false;
  user = {} as IUser;

  constructor(private apiService: ApiService) {
  }

  currentPageDataChange($event: IUser[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  operateData(): void {
    this.isOperating = true;
    setTimeout(() => {
      this.listOfAllData.forEach(item => (this.mapOfCheckedId[item.id] = false));
      this.refreshStatus();
      this.isOperating = false;
    }, 1000);
  }

  ngOnInit(): void {
    this.users = this.apiService.getUsers();
    this.apiService.getProducts().pipe(first())
      .subscribe(products => {
        console.log(products);
      });
  }

  showUser(id: number) {
    this.apiService.getUser(id).pipe(first())
      .subscribe(user => {
        this.user = user;
        this.isVisible = true;
      });
  }
  handleCancel() {
    this.isVisible = false;
  }
  handleOk() {
    this.isVisible = false;
  }
}
