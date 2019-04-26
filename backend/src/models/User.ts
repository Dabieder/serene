import mongoose from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../util/secrets";
import { defaultSettings } from "../data/defaultSettings";

export type HashSalt = {
  hash: string;
  salt: string;
};

export enum Role {
  User = "Learner",
  Administrator = "Administrator"
}

export interface UserModel extends mongoose.Document {
  email: string;
  password: string;
  salt: string;
  accountName: string;
  settings: any;
  consented: boolean;
  role: Role;

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
  toUserInfo: toUserInfoFunction;
}

export type PrivacySetting = {
  id: string;
  value: object;
};

type comparePasswordFunction = (candidatePassword: string) => boolean;
type setPasswordFunction = (password: string) => void;
type generateJWTFunction = () => string;
type toAuthJSONFunction = () => object;
type toUserInfoFunction = () => object;

const userSchema = new mongoose.Schema(
  {
    email: String,
    consented: Boolean,
    password: String,
    accountName: { type: String, unique: true },
    settings: Object,
    role: Object,
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
      role: this.role,
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
    consented: this.consented,
    role: this.role
  };
};

const toUserInfo: toUserInfoFunction = function() {
  return {
    accountName: this.accountName,
    role: this.role
  };
};

export const GetUserWithDefaults = (accountName: string, password: string) => {
  const userData = {
    email: "",
    accountName,
    settings: defaultSettings.DIPF,
    consented: false,
    role: Role.User
  };
  if (password) {
    const hashSalt = getHashAndSalt(password);
    return new User({
      ...userData,
      password: hashSalt.hash,
      salt: hashSalt.salt
    });
  } else {
    return new User({
      ...userData
    });
  }
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
userSchema.methods.toUserInfo = toUserInfo;

export const User: mongoose.Model<UserModel> = mongoose.model<UserModel>(
  "User",
  userSchema
);
