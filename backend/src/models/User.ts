import mongoose from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../util/secrets";

export type HashSalt = {
  hash: string;
  salt: string;
};

export interface UserModel extends mongoose.Document {
  email: string;
  password: string;
  salt: string;
  accountName: string;
  settings: object;
  consented: boolean;

  profile: {
    firstName: string;
    lastName: string;
    gender: string;
    location: string;
    picture: string;
  };

  comparePassword: comparePasswordFunction;
  setPassword: setPasswordFunction;
  generateJWT: generateJWTFunction;
  toAuthJSON: toAuthJSONFunction;
}

export type PrivacySetting = {
  id: string;
  value: object;
};

type comparePasswordFunction = (candidatePassword: string) => boolean;
type setPasswordFunction = (password: string) => void;
type generateJWTFunction = () => string;
type toAuthJSONFunction = () => object;

const userSchema = new mongoose.Schema(
  {
    email: String,
    consented: Boolean,
    password: String,
    accountName: { type: String, unique: true },
    settings: Object,
    salt: String,
    profile: {
      firstName: String,
      lastName: String,
      gender: String,
      location: String,
      picture: String
    }
  },
  { timestamps: true }
);

const generateJWT: generateJWTFunction = function() {
  const today = new Date();
  const expires = new Date(today);
  expires.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      sub: this.accountName,
      accountName: this.accountName,
      exp: Math.round(expires.getTime() / 1000)
    },
    JWT_SECRET,
    {
      algorithm: "HS512"
    }
  );
};

export interface JWTContent {
  id: string;
  sub: string;
  accountName: string;
  exp: string;
}

const setPassword: setPasswordFunction = function(password: string) {
  let hashSalt = getHashAndSalt(password);
  this.salt = hashSalt.salt;
  this.password = hashSalt.hash;
};

const comparePassword: comparePasswordFunction = function(candidatePassword) {
  let candidateHash = getHash(candidatePassword, this.salt);
  return this.password === candidateHash;
};

const toAuthJSON: toAuthJSONFunction = function() {
  return {
    accountName: this.accountName,
    token: this.generateJWT(),
    consented: this.consented
  };
};

export const verfifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, this.jwtSecret, (err: any) => {
      if (err) {
        resolve(false);
        return;
      }

      resolve(true);
      return;
    });
  }) as Promise<boolean>;
};

const getHash = (pw: string, salt: string): string => {
  return crypto.pbkdf2Sync(pw, salt, 1000, 512, "sha512").toString("hex");
};

export let getHashAndSalt = (password: string): HashSalt => {
  let salt = crypto.randomBytes(16).toString("hex");
  let hash = getHash(password, salt);

  return {
    hash,
    salt
  };
};

export let comparePasswords = (
  userHash: string,
  userSalt: string,
  candidatePw: string
): boolean => {
  let candidateHash = getHash(candidatePw, userSalt);
  return userHash === candidateHash;
};

userSchema.methods.comparePassword = comparePassword;
userSchema.methods.setPassword = setPassword;
userSchema.methods.generateJWT = generateJWT;
userSchema.methods.toAuthJSON = toAuthJSON;

export const User: mongoose.Model<UserModel> = mongoose.model<UserModel>(
  "User",
  userSchema
);
