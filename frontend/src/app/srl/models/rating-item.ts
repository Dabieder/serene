import { TrackingItem } from "./tracking-item";

export class RatingItem implements TrackingItem, IRatingItem {
  name: string;
  icon?: string;
  rating = 0;
  labelHelped = "";
  labelHindered = "";
  labelQuestion = "";
  get selected() {
    return this.rating !== 0;
  }

  static toTransfer(ratingItem: RatingItem): IRatingItem {
    return {
      name: ratingItem.name,
      rating: ratingItem.rating
    };
  }
}

export interface IRatingItem {
  name: string;
  rating: number;
}
