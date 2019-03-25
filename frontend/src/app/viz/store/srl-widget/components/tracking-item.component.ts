import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TrackingItem } from '../models/tracking-item';

@Component({
  selector: "app-srl-tracking-item",
  templateUrl: "./tracking-item.component.html",
  styleUrls: ["./tracking-item.component.scss"]
})
export class TrackingItemComponent implements OnInit {
  @Input() trackingItem: TrackingItem;
  @Output() activeChange = new EventEmitter<TrackingItem>();

  constructor() {}

  ngOnInit() {}

  trackingItemClick(event: any) {
    this.trackingItem.selected = !this.trackingItem.selected;
    this.activeChange.emit(this.trackingItem);
  }
}
