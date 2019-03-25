import { Component, OnInit, Input, HostBinding } from "@angular/core";

@Component({
  selector: "[app-menu-item]",
  templateUrl: "./menu-item.component.html",
  styleUrls: ["./menu-item.component.scss"]
})
export class MenuItemComponent implements OnInit {
  @Input()
  hasChildren: boolean;
  @Input()
  router: string;
  @Input()
  title: string;
  @Input()
  routerLinkActiveClass: string;

  @HostBinding("class.nav-item")
  someField = true;

  constructor() {}

  ngOnInit() {}
}
