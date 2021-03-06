import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: "[appDropdown]", exportAs: "appDropdown"
})
export class DropdownDirective {
  @HostBinding("class.show") isOpen = false;

  @HostListener("click") toggleopen() {
    this.isOpen = !this.isOpen;
  }
}
