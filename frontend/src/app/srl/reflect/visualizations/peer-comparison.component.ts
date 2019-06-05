import { Component, OnInit, AfterContentInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-peer-comparison",
  templateUrl: "./peer-comparison.component.html",
  styleUrls: ["./peer-comparison.component.scss"]
})
export class PeerComparisonComponent implements OnInit, AfterContentInit {
  @ViewChild("canvasChart", { static: true })
  chartRef;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit() {}

  createChart() {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      title: {
        display: true,
        text: "Number of goals by completion"
      },
      scales: {
        xAxes: [
          {
            barThickness: 20,
            ticks: {
              min: 0,
              beginAtZero: true,
              stepSize: 1
            }
          }
        ],
        yAxes: [
          {
            barThickness: 20
          }
        ]
      }
    };

    const data = {
      labels: [
        "You",
        "Course Average"
      ],
    }

    this.proportionChart = new Chart(this.chartRefBar.nativeElement, {
      type: "horizontalBar",
      data: data,
      options: options
    });
  }
}
