import { Injectable } from "@angular/core";

const APP_PREFIX = "TLA-LAD-";

export enum STORAGE_KEYS {
  srlReasons = "srlReasons",
  srlMetaSettings = "srlMetaSettings",
  jwt = "jwt"
}

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  constructor() {}

  static setItem(key: STORAGE_KEYS, value: any) {
    localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  static deleteItem(key: STORAGE_KEYS) {
    localStorage.removeItem(`${APP_PREFIX}${key}`);
  }

  static getItem(key: STORAGE_KEYS) {
    let item = null;
    try {
      item = JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
    } catch (e) {
      console.log("Error while trying retrieve locally stored item: ", key);
    } finally {
      return item;
    }
  }
}
