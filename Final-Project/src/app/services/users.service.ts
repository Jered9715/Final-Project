import { Injectable } from '@angular/core';
import { user } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: user[] =[
    {
      userId:1 ,
      firstName: 'John',
      lastName: 'Doe',
    },
    {
      userId:2 ,
      firstName: 'Jane',
      lastName: 'Smith',
    },
    {
      userId:3 ,
      firstName: 'Kyler',
      lastName: 'Anderson',
    },
  ];

  constructor() { }

  getUsers():user[]{
    return this.users;
  }

  getUser(id:number): user | undefined {
    return this.users.find(u =>u.userId === id);
  }

  addUser(user:user): user{
    user.userId=this.users.length +1;
    this.users.push(user);
    return user;
  }

  updateUser (updatedUser: user): boolean {
    const index = this.users.findIndex(u => u.userId === updatedUser.userId)
    if (index !== -1){
      this.users[index] = updatedUser;
      return true;
    }
    return false;
  }

  deleteUser(id: number): boolean{
    const index = this.users.findIndex(u=>u.userId === id)
    if(index !== -1){
      this.users.splice(index,1);
      return true;
    }
    return false;
  }
}
