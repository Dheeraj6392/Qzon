import { Component } from '@angular/core';
import { List } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  search = true;
  list : List[] = [];
  uploadImage(data : List){
    data.image = "not";
   const todo = {image : data.image , sem : data.sem , year : data.year}
   this.list.push(todo);
   console.log(todo);
   this.search = false;
  }
}
