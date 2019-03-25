import mongoose from "mongoose";
import { PushSubscription } from "web-push";

export interface PushNotificationSubscriptionModel extends mongoose.Document {
  accountName: String;
  subscriptions: PushSubscription[];
}

const pushNotificationSubscriptionSchema = new mongoose.Schema(
  {
    accountName: String,
    subscriptions: []
  },
  { timestamps: true }
);

export const PushNotificationSubscription: mongoose.Model<
  PushNotificationSubscriptionModel
> = mongoose.model<PushNotificationSubscriptionModel>(
  "PushNotificationSubscription",
  pushNotificationSubscriptionSchema
);
