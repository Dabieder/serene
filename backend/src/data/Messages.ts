import { MONITORING_URL } from "../util/constants";

export const MESSAGES: any = {
  PUSH_NOTIFICATION_TITLE: {
    de: `Serene`,
    en: `Serene`
  },
  PUSH_NOTIFICATION_BODY: {
    de: `Denk daran deine Lernbeobachtung auf ${MONITORING_URL}?ref=push einzugeben`,
    en: `Denk daran deine Lernbeobachtung auf ${MONITORING_URL}?ref=push einzugeben`
  },
  MAIL_SUBJECT: {
      de: "Denk daran deine Lernbeobachtung einzugeben",
      en: "Remember to Monitor your Learning"
  },
  MAIL_BODY_TEXT: {
      de: `Hast du deine Lernziele erreicht? Gehe auf ${MONITORING_URL}?ref=mail und halte deinen Fortschritt fest.`,
      en: `Have you reached your learning goals? Go to ${MONITORING_URL}?ref=mail and monitor your progress.`
  }
};
