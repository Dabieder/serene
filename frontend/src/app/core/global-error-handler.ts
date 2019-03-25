import { Injectable, ErrorHandler, Injector } from "@angular/core";
import { LoggingService } from "./services/logging.service";

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  // Use injector because error handler is loaded before other dependencies
  // See: https://medium.com/@amcdnl/global-error-handling-with-angular2-6b992bdfb59c
  constructor(private injector: Injector) {
    super();
  }

  handleError(error: Error) {
    const loggingService = this.injector.get(LoggingService);
    loggingService.logError(error);
    console.error(error);
    super.handleError(error);
  }
}
