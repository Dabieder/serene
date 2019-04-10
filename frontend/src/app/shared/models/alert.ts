export interface Alert {
  type: AlertType;
  message: string;
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}

export const ALERTS = {
  SERVER_CONNECTION_ERROR: {
    type: AlertType.Warning,
    message: "Trouble connecting to the server"
  },
  NEW_MESSAGE: {
    type: AlertType.Info,
    message: "You got a new message. Click here to review it"
  }
};
