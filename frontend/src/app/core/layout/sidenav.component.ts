import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnInit {
  @Input()
  logo: string;
  @Input()
  brand: string;
  @Input()
  link: string;
  @Input()
  activeLinkClass: string;

  constructor() {}

  ngOnInit() {}
}
