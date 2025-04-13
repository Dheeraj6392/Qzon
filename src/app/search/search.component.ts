import { Component } from '@angular/core';
import { List } from '../data-type';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  search = true;
  list : List[] = [];
  constructor(private userService : UserService){}
  // uploadImage(data : List){
  //   data.image = "not";
  //  const todo = {image : data.image , sem : data.sem , year : data.year}
  //  this.list.push(todo);
  //  console.log(todo);
  //  this.search = false;
  // }

  // searchQp(data : any){
  //   // this.list = this.userService.getQp();
  //   console.log(this.list);
  //   this.search = false;
  // }

  searchQp(data : any) {
    console.log(data);
    this.userService.getQp().subscribe(
      response => {
        console.log('Data received:', response);
        this.list = (response);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    this.search = false;
  }
}
