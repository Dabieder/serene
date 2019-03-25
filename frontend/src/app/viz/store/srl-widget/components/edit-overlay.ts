import { Component } from "@angular/core";

@Component({
  selector: "app-edit-overlay",
  template: `
             <div class="edit-overlay">
             </div>`,
  styles: [
    `
      .edit-overlay {
        display: inline-block;
        height: 100%;
        width: 100%;
        z-index: 50;
        background-color: rgba(120, 120, 120, 0.068);
        position: absolute;
      }
    `
  ]
})
export class EditOverlayComponent {}
