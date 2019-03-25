import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-timeline-item",
  templateUrl: "./timeline-item.component.html",
  styleUrls: ["./timeline-item.component.css"]
})
export class TimelineItemComponent implements OnInit {
  @Input() event: any;

  constructor() {}

  ngOnInit() {}
  getTimestamp(event: any) {
    return new Date(event.timestamp).toLocaleTimeString();
  }

  getDatestamp(event: any) {
    return new Date(event.timestamp).toLocaleDateString();
  }

  getDetails(event: any) {
    return JSON.stringify(event, null, 2);
  }
}
