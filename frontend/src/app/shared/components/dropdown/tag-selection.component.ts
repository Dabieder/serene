import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { Tag } from "src/app/shared/models/tag";

@Component({
  selector: "app-tag-selection",
  templateUrl: "./tag-selection.component.html",
  styleUrls: ["./tag-selection.component.scss"]
})
export class TagSelectionComponent implements OnInit {
  isOpen = false;

  @Input() tags;
  @Output() tagClicked = new EventEmitter<Tag>();
  @Output() tagActivated = new EventEmitter<Tag>();
  @Output() tagDeActivated = new EventEmitter<Tag>();

  activeFilters = [];

  constructor() {}

  ngOnInit() {}

  toggleDropdownClick() {
    this.isOpen = !this.isOpen;
  }

  tagClick(tag: Tag) {
    this.tagClicked.emit(tag);
  }

  tagChange(event: MatCheckboxChange, tag: Tag) {
    console.log("Mat Checkbox change: ", event);
    console.log("Tag: ", tag);
    if (event.checked) {
      this.tagActivated.emit(tag);
    } else {
      this.tagDeActivated.emit(tag);
    }
  }
}
