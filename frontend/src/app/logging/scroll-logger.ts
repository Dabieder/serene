import { IInteractionLogger } from "./interaction-logger";

const WINDOW = "WINDOW";

export class ScrollLogger implements IInteractionLogger {
  isTracking: boolean;
  trackWindow: boolean;
  scrollLogs: any = {};
  test: "ALF";

  getLog() {
    return this.scrollLogs;
  }

  onScroll(scrollEvent) {
    if (!scrollEvent.target.tagName) {
      if (!this.scrollLogs[WINDOW]) {
        this.scrollLogs[WINDOW] = [];
      }
      this.scrollLogs[WINDOW].push(this.scrollEventToLog(scrollEvent));
    } else {
      const name = this.getLogNameFromTarget(scrollEvent.target);
      if (!this.scrollLogs[name]) {
        this.scrollLogs[name] = [];
      }
      this.scrollLogs[name].push(this.scrollEventToLog(scrollEvent));
    }
  }

  getLogNameFromTarget(target): string {
    return target.nodeName + "." + target.className + "#" + target.id;
  }

  scrollEventToLog(scrollEvent): any {
    return {
      pageY: scrollEvent.pageY,
      offsetTop: scrollEvent.target.offsetTop,
      timestamp: scrollEvent.timeStamp
    };
  }

  startLogging() {
    if (!this.isTracking) {
      window.addEventListener("scroll", this.onScroll.bind(this), true);
      this.isTracking = true;
    }
  }

  stopLogging() {
    if (this.isTracking) {
      window.removeEventListener("scroll", this.onScroll);
      this.isTracking = false;
    }
  }

  resetLogging() {
    this.scrollLogs = {};
  }

  constructor() {
    this.scrollLogs = {
      WINDOW: []
    };
  }
}
