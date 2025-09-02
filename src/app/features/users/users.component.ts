import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/models/user';
import { AsyncPipe } from '@angular/common';
import { UsersState } from '../../core/store/users/users.state';
import { LoadUsers, DeleteUser } from '../../core/store/users/users.actions';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../core/store/auth/auth.state';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  @Select(UsersState.users) users$!: Observable<User[]>;
  @Select(AuthState.userId) userId$!: Observable<number>;
  
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadUsers());
  }

  onDelete(userId: number): void {
    if(confirm("Are you sure you want to delete this user?")){
      this.store.dispatch(new DeleteUser(userId));
    }
  }

}
