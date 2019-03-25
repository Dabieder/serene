import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch(err => console.log(err));
// ToDo: Workaround for otherwise dysfunctional service worker registration found from
// https://github.com/angular/angular-cli/issues/8779#issuecomment-351583429
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    if ("serviceWorker" in navigator && environment.production) {
      navigator.serviceWorker.register("/ngsw-worker.js");
    }
  })
  .catch(err => console.log(err));
