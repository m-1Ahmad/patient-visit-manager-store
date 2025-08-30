import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  onDelete(userId: number): void {
    if(confirm("Are you sure you want to delete this user?")){
      this.userService.deleteUser(userId);
      this.router.navigate(['/users']);
    }
  }
}
