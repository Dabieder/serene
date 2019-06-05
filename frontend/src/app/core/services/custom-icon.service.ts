import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
@Injectable()
export class CustomIconService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "calendar",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "/assets/icons/deadline_gray.svg"
      )
    );
  }
}
