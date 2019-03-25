import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { RatingItem } from "../models/rating-item";

@Component({
  selector: "app-rating-item",
  templateUrl: "./rating-item.component.html",
  styleUrls: ["./rating-item.component.scss"]
})
export class RatingItemComponent implements OnInit {
  @Output()
  itemChange = new EventEmitter<RatingItem>();
  @Input()
  item: RatingItem;

  showRatingButtons = false;

  constructor() {}

  ngOnInit() {}

  ratingItemClick(event: any) {
    this.showRatingButtons = !this.showRatingButtons;
  }

  neutralClick() {
    this.item.rating = 0;
  }

  positiveClick() {
    this.item.rating = 1;
    this.itemChange.emit(this.item);
  }

  negativeClick() {
    this.item.rating = -1;
    this.itemChange.emit(this.item);
  }
}
