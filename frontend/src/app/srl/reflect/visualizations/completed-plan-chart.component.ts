import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { LearningPlan } from "../../models/learning-plan";
import { Chart } from "chart.js";
import { SrlWidgetAnalysisService } from "../../services/srl-widget-analysis.service";

@Component({
  selector: "app-completed-plan-chart",
  templateUrl: "./completed-plan-chart.component.html",
  styleUrls: ["./completed-plan-chart.component.scss"]
})
export class CompletedPlanChartComponent implements OnInit {
  @Input("learningPlans")
  set learningPlans(plans: LearningPlan[]) {
    const plansByCompletion = this.analysisService.getPlansByCompletion(plans);

    // this.createProportionDonutChart();
    this.createProportionBarChart(
      plansByCompletion.completedOnTime,
      plansByCompletion.openOnTime,
      plansByCompletion.completedBehindSchedule,
      plansByCompletion.openBehindSchedule
    );
  }

  proportionChart: any;
  absoluteChart: any;
  completionData = [35, 60, 5];
  backgroundColors = ["#3cba9f", "#3e95cd", "#acc236", "#c45850"];
  labels = [
    "Completed On Time",
    "Completed Behind Schedule",
    "Overdue And Not Completed"
  ];

  @ViewChild("canvasDonutChart", { static: false })
  chartRefDonut;
  @ViewChild("canvasBarChart", { static: true })
  chartRefBar;

  constructor(private analysisService: SrlWidgetAnalysisService) {}

  ngOnInit() {}

  createProportionDonutChart() {
    const options = {
      rotation: 1 * Math.PI,
      circumference: 1 * Math.PI,
      responsive: false
    };

    const data = {
      datasets: [
        {
          data: this.completionData,
          backgroundColor: this.backgroundColors
        }
      ],
      labels: this.labels
    };

    this.proportionChart = new Chart(this.chartRefDonut.nativeElement, {
      type: "doughnut",
      data: data,
      options: options
    });
  }

  createProportionBarChart(
    goalsCompletedOnTime: LearningPlan[],
    GoalsOpenOnTime: LearningPlan[],
    goalsCompletedLate: LearningPlan[],
    goalsOpenLate: LearningPlan[]
  ) {
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
        "On Time",
        "On Time and Open",
        "Completed Late",
        "Late and Open"
      ],
      datasets: [
        {
          backgroundColor: this.backgroundColors,
          data: [
            goalsCompletedOnTime.length,
            GoalsOpenOnTime.length,
            goalsCompletedLate.length,
            goalsOpenLate.length
          ]
        }
      ]
    };

    this.proportionChart = new Chart(this.chartRefBar.nativeElement, {
      type: "horizontalBar",
      data: data,
      options: options
    });
  }
}
