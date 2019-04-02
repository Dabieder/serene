export class SurveyResult {
  dimensions: SurveyResultDimension[];
  name: string;
}

export class SurveyResultDimension {
  min: number;
  max: number;
  value: number;
  name: string;
}
