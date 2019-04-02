import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input
} from "@angular/core";
import { Chart } from "chart.js";
import { SurveyResult } from "../../models/survey-result";

@Component({
  selector: "app-srl-dimensions-chart",
  templateUrl: "./srl-dimensions-chart.component.html",
  styleUrls: ["./srl-dimensions-chart.component.scss"]
})
export class SrlDimensionsChartComponent implements OnInit, AfterViewInit {
  @ViewChild("chartCanvas")
  chartRef;
  chart: any;

  canvasWidth = 440;
  canvasHeight = 300;
  ticksMin = 0;
  ticksMax = 7;

  private _surveyResults: SurveyResult;
  @Input("surveyResults")
  set surveyResults(surveyData: SurveyResult) {
    if (!surveyData.dimensions) return;
    this._surveyResults = surveyData;
    const chartDataSubjective = [];
    const chartLabels = [];
    console.log("Received updated survey results: ", surveyData);
    for (const dimension of surveyData.dimensions) {
      chartDataSubjective.push(dimension.value);
      chartLabels.push(dimension.name);
    }
    const chartData = [
      {
        data: chartDataSubjective,
        label: "Subjective",
        borderColor: "rgba(255, 153, 0, 0.8)"
      }
    ];

    this.createChart(chartLabels, chartData);
  }

  get surveyResults() {
    return this._surveyResults;
  }

  // Radar
  public radarChartLabels: string[] = [
    "Goal Setting",
    "Time Management",
    "Help Seeking",
    "Task Strategies",
    "Self-Evaluation"
  ];

  public radarChartData: any = [
    {
      data: [6.5, 4.5, 5.5, 3.5, 3],
      label: "Subjective",
      borderColor: "rgba(255, 153, 0, 0.8)"
    },
    {
      data: [6, 1.3, 4, 4.5, 1],
      label: "System",
      borderColor: "rgba(102, 153, 204, 0.8)"
    }
  ];
  public radarChartType = "radar";

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {}

  createChart(labels: string[], data: any) {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: "radar",
      data: {
        labels: labels,
        datasets: data
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scale: {
          ticks: {
            min: 0,
            max: 7
          }
        },
        legend: {
          position: "bottom"
        }
      }
    });
  }
}
