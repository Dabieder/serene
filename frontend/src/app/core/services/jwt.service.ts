import { Injectable } from "@angular/core";
import { LocalStorageService, STORAGE_KEYS } from "./local-storage.service";

@Injectable()
export class JwtService {
  constructor() {}

  getToken(): String {
    return LocalStorageService.getItem(STORAGE_KEYS.jwt);
  }

  saveToken(token: String) {
    LocalStorageService.setItem(STORAGE_KEYS.jwt, token);
  }

  destroyToken() {
    LocalStorageService.deleteItem(STORAGE_KEYS.jwt);
  }
}
