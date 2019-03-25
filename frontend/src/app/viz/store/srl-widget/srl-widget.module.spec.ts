import { SrlWidgetModule } from "./srl-widget.module";
import { VizService } from "../../visualisation.service";

describe("SrlWidgetModule", () => {
  let srlWidgetModule: SrlWidgetModule;
  let vizService = new VizService();

  beforeEach(() => {
    vizService = new VizService();
    srlWidgetModule = new SrlWidgetModule(vizService);
  });

  it("should create an instance", () => {
    expect(srlWidgetModule).toBeTruthy();
  });
});
