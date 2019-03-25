import { Component } from "@angular/core";

@Component({
  selector: "app-full-screen-overlay",
  template: `
    <div class="full-screen-overlay"></div>
  `,
  styles: [
    `
      .full-screen-overlay {
        position: absolute;
        background: #000;
        opacity: 0.3;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 100;
      }
    `
  ]
})
export class FullScreenOverlayComponent {}
