import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-srl-widget-card",
  templateUrl: "./srl-widget-card.component.html",
  styleUrls: ["./srl-widget-card.component.scss"]
})
export class SrlWidgetCardComponent implements OnInit {
  @Input()
  title: string;

  constructor() {}

  ngOnInit() {}
}
