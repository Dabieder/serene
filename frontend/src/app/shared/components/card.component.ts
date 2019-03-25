import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  public options: ICardOptions = {};

  @Output()
  public btnClick: EventEmitter<IHeaderButton> = new EventEmitter();

  showCardTools = false;

  constructor() {}

  ngOnInit() {
    if (this.options.button && this.options.button.length > 0) {
      this.showCardTools = true;
    }
  }

  clickButton(btn: IHeaderButton) {
    this.btnClick.emit(btn);
  }
}

export interface ICardOptions {
  button?: IHeaderButton[];
  description?: string;
  done?: boolean;
}

export interface IHeaderButton {
  label?: string;
  icon?: any;
  id?: string;
}
