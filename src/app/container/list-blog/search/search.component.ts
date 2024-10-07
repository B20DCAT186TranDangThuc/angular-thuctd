import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchText: string = '';

  @Output()
  search: EventEmitter<string> = new EventEmitter();

  onSearchChange() {
    this.search.emit(this.searchText);
  }

}
