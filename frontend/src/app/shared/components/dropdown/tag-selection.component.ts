import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-tag-selection",
  templateUrl: "./tag-selection.component.html",
  styleUrls: ["./tag-selection.component.scss"]
})
export class TagSelectionComponent implements OnInit {
  isOpen = false;

  @Input() tags;
  @Output() tagClicked = new EventEmitter<string>();

  activeFilters = [];

  constructor() {}

  ngOnInit() {}

  toggleDropdownClick() {
    this.isOpen = !this.isOpen;
  }

  tagClick(tag: string) {
    this.tagClicked.emit(tag);
  }
}
