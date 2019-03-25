import { KafkaService, KAFKA_TOPICS } from "./KafkaService";
import logger from "../util/logger";
import { SurveyData, SurveyDataModel } from "../models/SrlWidget/SurveyData";

export enum SURVEY_KEYS {
  OSRLQ = "Online-Self-Reg-c4e86313ea"
}

export class SurveyAnalyzeService {
  // this.storeSurveyMessage(jsonValue.data.fact);

  constructor(private kafkaService: KafkaService) {
    this.kafkaService.addConsumer(
      KAFKA_TOPICS.XAPI_SURVEY,
      this.storeSurveyMessage
    );
  }
  storeSurveyMessage = async (msg: any) => {
    const fact = msg.data.fact;
    const factRaw = JSON.stringify(fact);
    logger.silly("Receive Survey Message to store");
    let surveyId = "<bla@blubl.net>:Test-fc9bca7314";
    const filterVerb = "http://adlnet.gov/expapi/verbs/answered";
    let accountName = "";
    let dimensionKey = "";
    let resultRaw = 0;
    let resultMax = 0;
    let resultMin = 0;
    let surveyKey = "";
    // let survey = "<bla@blubl.net>:Test-fc9bca7314";
    // Only accept "answered" as the rest is not interesting to us
    if (fact.verb.id !== filterVerb) return;
    // At the moment, only accept the SRL survey
    // if (fact.context.contextActivities.parent[0].id !== surveyId) return;
    // const accountName = msg.actor.account.name;

    // const surveyResults = {
    //     [dimension]
    // }
    // const query = {accountName};
    // const update = {$set:{surveyResults}
    // await SurveyData.findOneAndUpdate
    try {
      accountName = fact.actor.account.name;
      resultRaw = fact.result[0].score.raw;
      resultMax = fact.result[0].score.max;
      resultMin = fact.result[0].score.min;
      surveyKey = fact.context.contextActivities.grouping[0].id.replace(
        /\./,
        "&#46;"
      );
      dimensionKey = fact.context.contextActivities.parent[0].id.replace(
        /\./,
        ""
      );
    } catch (error) {
      logger.error(`Error Trying to parse the xAPI statement: ${error}`);
    }
    // Remove dots from the survey key

    logger.info(`Received Survey for key: ${surveyKey}`);

    let surveyDataModel = await SurveyData.findOne({
      accountName: accountName,
      surveyId: surveyKey
    })
      .exec()
      .catch(err => {
        logger.error(`Error retrieving survey results for ${accountName}`);
      });

    // Update existing or create new
    if (surveyDataModel) {
      const existingModel = surveyDataModel as SurveyDataModel;
      if (existingModel.surveyResults[surveyKey]) {
        existingModel.surveyResults[surveyKey][dimensionKey] = resultRaw;
      } else {
        existingModel.surveyResults[surveyKey] = { [dimensionKey]: resultRaw };
      }
      existingModel.resultsRaw.push(factRaw);
      await existingModel.save().catch(err => {
        logger.error(`Error saving results for ${accountName}`);
      });
    } else {
      logger.info(`No survey results yet for ${accountName}, creating new`);
      const newSurveyData = new SurveyData({
        accountName,
        surveyId: surveyKey,
        dimension: surveyKey,
        surveyResults: {
          min: resultMin,
          max: resultMax,
          raw: resultRaw
        },
        resultsRaw: [factRaw]
      });
      await newSurveyData.save().catch(err => {
        logger.error(`Error saving results for ${accountName}`, err);
      });
    }
  };

  getMsqlSurveyData = async (accountName: string) => {
    let surveyData = await this.getSurveyData(accountName, SURVEY_KEYS.OSRLQ);
    const result: any = {};
    if (Array.isArray(surveyData)) {
      surveyData = surveyData as SurveyDataModel[];
      for (let dimension of surveyData) {
        result[dimension.dimension] = dimension.surveyResults.resultRaw;
      }
    }
    return result;
  };

  getSurveyData = async (accountName: string, surveyId: string) => {
    const surveyData = await SurveyData.find({
      accountName,
      surveyId
    })
      .exec()
      .catch(err => {
        logger.error(
          `Error while retrieving data for survey ${surveyId} and user ${accountName}`,
          err
        );
      });

    return surveyData;

    // TODO: Replace TestData
    // return {
    //   name: "MSLQ",
    //   dimensions: [
    //     {
    //       min: 0,
    //       max: 7,
    //       value: 6,
    //       name: "Dimension 1"
    //     },
    //     {
    //       min: 0,
    //       max: 7,
    //       value: 6,
    //       name: "Dimension 2"
    //     },
    //     {
    //       min: 0,
    //       max: 7,
    //       value: 6,
    //       name: "Dimension 3"
    //     },
    //     {
    //       min: 0,
    //       max: 7,
    //       value: 6,
    //       name: "Dimension 4"
    //     },
    //     {
    //       min: 0,
    //       max: 7,
    //       value: 7,
    //       name: "Dimension 5"
    //     }
    //   ]
    // };

    return await SurveyData.findOne({
      accountName,
      surveyId
    });
  };
}
