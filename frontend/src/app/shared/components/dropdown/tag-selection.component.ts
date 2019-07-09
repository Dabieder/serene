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
  showEditor = false;

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
    if (event.checked) {
      this.tagActivated.emit(tag);
    } else {
      this.tagDeActivated.emit(tag);
    }
  }

  tagEdit(event, tag: Tag) {
    console.log("Edited tag: ", tag);
    console.log("Edited tag Event: ", event);
  }

  toggleEditTags() {
    this.showEditor = !this.showEditor;
  }

  deleteTagClick(tag: Tag) {
    console.log("Delete Tag Click", tag);
  }
}
