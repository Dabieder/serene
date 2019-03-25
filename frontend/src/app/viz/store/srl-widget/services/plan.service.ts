import { Injectable } from "@angular/core";
import { RatingItem } from "../models/rating-item";

@Injectable({
  providedIn: "root"
})
export class PlanService {
  constructor() {}

  // TODO: Move to server side
  public static getDefaultReasonsOffline() {
    const defaultReasons: RatingItem[] = [];

    const imgFolder = "assets/images";

    const itemSocialLife = new RatingItem();
    itemSocialLife.name = "Social Life";
    itemSocialLife.icon = imgFolder + "/friends_dipf-blue.svg";
    defaultReasons.push(itemSocialLife);

    const itemTimeManagement = new RatingItem();
    itemTimeManagement.name = "Time Management";
    itemTimeManagement.icon = imgFolder + "/time_dipf-blue.svg";
    defaultReasons.push(itemTimeManagement);

    const itemGroupWork = new RatingItem();
    itemGroupWork.name = "Group Work";
    itemGroupWork.icon = imgFolder + "/collaboration_dipf-blue.svg";
    defaultReasons.push(itemGroupWork);

    const itemAvailableInformation = new RatingItem();
    itemAvailableInformation.name = "Available Information";
    itemAvailableInformation.icon = imgFolder + "/information_dipf-blue.svg";
    defaultReasons.push(itemAvailableInformation);

    const itemLearningGoals = new RatingItem();
    itemLearningGoals.name = "Learning Goals";
    itemLearningGoals.icon = imgFolder + "/goal_dipf-blue.svg";
    defaultReasons.push(itemLearningGoals);

    const itemMotivation = new RatingItem();
    itemMotivation.name = "Motivation";
    itemMotivation.icon = imgFolder + "/motivation_dipf-blue.svg";
    defaultReasons.push(itemMotivation);

    return defaultReasons;
  }
}
