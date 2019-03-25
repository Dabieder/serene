import mongoose from "mongoose";

export interface UserConsentSubmissionModel extends mongoose.Document {
  accountName: string;
  submissions: [
    {
      consentId: string;
      modifiedAt: Date;
      consentItems: Array<UserConsentItemSubmission>;
    }
  ];
}

export type UserConsentItemSubmission = {
  id: string;
  consented: boolean;
};

const UserConsentSubmissionSchema = new mongoose.Schema({
  accountName: String,
  submissions: [
    {
      consentId: String,
      consentItems: [
        {
          id: String,
          consented: Boolean
        }
      ]
    }
  ]
});
