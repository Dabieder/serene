import { EventEmitter } from "events";

export class EventService {
  GlobalEventEmitter = new EventEmitter();
}
