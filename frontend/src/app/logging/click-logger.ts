import { IInteractionLogger } from "./interaction-logger";

export class ClickLogger implements IInteractionLogger {
  logs: any = [];
  isTracking: boolean;

  onClick(clickEvent) {
    const clickEventLog = this.eventToLogEntry(clickEvent);
    this.logs.push(clickEventLog);
  }

  eventToLogEntry(clickEvent): any {
    return {
      target: this.getLogNameFromTarget(clickEvent.target),
      nextLabeledAncestor: this.getLogNameFromTarget(
        this.findNextLabeledAncestor(clickEvent.target)
      ),
      pageY: clickEvent.pageY,
      offsetTop: clickEvent.target.offsetTop,
      timestamp: clickEvent.timeStamp
    };
  }

  getLogNameFromTarget(target): string {
    if (target) {
      return target.nodeName + "." + target.className + "#" + target.id;
    } else {
      return "No Target Found";
    }
  }

  findNextLabeledAncestor(element): any {
    return element.closest(".CLICKLOG");
  }

  getLog(): any {
    return this.logs;
  }

  constructor() {}

  startLogging() {
    if (!this.isTracking) {
      window.addEventListener("click", this.onClick.bind(this), true);
      this.isTracking = true;
    }
  }

  stopLogging() {
    window.removeEventListener("click", this.onClick.bind(this), true);
  }
}
