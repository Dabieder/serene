// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: "http://localhost:8080/lad-backend",
  xapi_backend_url:
    "https://tlacx311.edutec.guru/lrs-backend/resources/xapi/statements",
  default_user: {
    email: "a@b.c",
    password: "1234"
  },
  cas_login_url: "https://ssl.studiumdigitale.uni-frankfurt.de/cas",
  allowThirdPartyLogIn: false
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
import "zone.js/dist/zone-error"; // Included with Angular CLI.
