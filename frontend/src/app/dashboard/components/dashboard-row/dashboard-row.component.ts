import { Component, OnInit, Input } from "@angular/core";
import { DashboardPageRow } from "../../models/dashboard";

@Component({
  selector: "ng-dashboard-row",
  templateUrl: "./dashboard-row.component.html",
  styleUrls: ["./dashboard-row.component.css"]
})
export class DashboardRowComponent implements OnInit {
  @Input()
  row: DashboardPageRow;

  constructor() {}

  ngOnInit() {}

  setMyClasses(col) {
    if (col) {
      const classes = {};
      col.split(" ").map(x => (classes[x] = true));
      return classes;
    }
    return {
      "col-lg-12": true
    };
  }
}
