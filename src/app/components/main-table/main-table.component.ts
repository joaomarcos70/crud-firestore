import { Component } from '@angular/core';
import { IUser } from 'src/app/shared/utils/interfaces/user.interface';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss'],
})
export class MainTableComponent {
  users: IUser[] = [
    { name: 'John', email: 'john@example.com' },
    { name: 'Jane', email: 'jane@example.com' },
  ];

  editUser(user: IUser) {
    console.log('teste', user);
    // Implement your edit functionality here
  }

  deleteUser(user: IUser) {
    this.users = this.users.filter((u) => u !== user);
  }
}
