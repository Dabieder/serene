import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild
} from "@angular/core";
import { Chart } from "chart.js";
import { Monitoring } from "../../models/monitoring";

@Component({
  selector: "app-learning-goal-chart",
  templateUrl: "./learning-goal-chart.component.html",
  styleUrls: ["./learning-goal-chart.component.scss"]
})
export class LearningGoalChartComponent implements OnInit, AfterViewInit {
  private numBars = 8;
  @Input("monitorings")
  set weeklyPlans(monitorings: Monitoring[]) {
    const dataCompleted = [];
    const labels = [];
    let weekIndex = 1;

    for (const monitoring of monitorings) {
      labels.push("wk" + weekIndex);
      for (const goal of monitoring.plans) {
        dataCompleted.push(goal.progress);
      }
      weekIndex++;
      if (weekIndex === this.numBars) {
        break;
      }
    }

    // fill out with empties until 10 so it always has the same width
    const remaining = this.numBars - weekIndex;
    for (let i = 0; i < remaining; i++) {
      labels.push(weekIndex++);
      dataCompleted.push(0);
    }

    this.createChart(labels, dataCompleted);
  }

  @ViewChild("chartCanvasLearningGoals")
  chartRef;
  chart: any;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: false,
    legend: {
      position: "bottom"
    }
  };
  public barChartLabels: string[] = ["", "", "", "", "", "", "", "", "", ""];
  public barChartType = "bar";
  public barChartLegend = false;

  public barChartData = [65, 59, 80, 81, 100, 73, 0, 0, 0, 0];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngAfterViewInit(): void {
    Chart.defaults.global.legend.display = false;
  }

  createChart(labels: string[], dataCompleted: number[]) {
    const bgColors = this.getBackgroundColorsForValues(this.barChartData);
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: "bar",
      data: {
        labels: ["wk1", "wk2", "wk3", "wk4"],
        datasets: [
          {
            data: [55, 80, 60, 75],
            backgroundColor: "#3cba9f",
            borderWidth: 1
          },
          {
            data: [33, 20, 35, 0],
            backgroundColor: "#3e95cd",
            borderWidth: 1
          },
          {
            data: [12, 0, 5, 25],
            backgroundColor: "#c45850",
            borderWidth: 1
          }
        ]
      },
      options: {
        events: ["click"],
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true,
              display: true,
              ticks: {
                min: 0,
                max: 100,
                suggestedMax: 100,
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  getBackgroundColorsForValues(values: number[]) {
    const colors = [];
    for (const val of values) {
      colors.push(this.getColorBasedOnSuccess(val));
    }
    return colors;
  }

  getColorBasedOnSuccess(val: number) {
    const percentage = Math.max(0.5, val / 100);

    // const red = 255 - percentage * 255;
    // const green = 153;
    // const blue = percentage * 255;
    const red = 242;
    const green = 148;
    const blue = 0;

    return "rgba(" + red + ", " + green + ", " + blue + ", 1)";
  }

  ngOnInit() {}
}
