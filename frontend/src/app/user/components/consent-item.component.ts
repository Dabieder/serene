import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ConsentItem } from "../../settings/models/consent-item";

@Component({
  selector: "app-consent-item",
  templateUrl: "./consent-item.component.html",
  styleUrls: ["./consent-item.component.scss"]
})
export class ConsentItemComponent implements OnInit {
  @Input()
  consentItem: ConsentItem;
  @Output()
  itemExpanded: EventEmitter<string> = new EventEmitter();
  @Output()
  consentChange: EventEmitter<ConsentItem> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  expansionPanelClicked(event: any, name: string) {
    this.itemExpanded.emit(name);
  }

  onConsentChange(event: any) {
    this.consentChange.emit(this.consentItem);
  }
}
