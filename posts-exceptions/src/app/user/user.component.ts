import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AllUsersComponent } from './all-users/all-users.component';
import { SingleUserWithMessageComponent } from './single-user-with-message/single-user-with-message.component';
import { SingleUserComponent } from './single-user/single-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  standalone: true,
  imports: [CommonModule,
    AllUsersComponent,
    SingleUserComponent,
    SingleUserWithMessageComponent],
  styleUrls: ['./user.component.css']
})
export class UserComponent {

}
