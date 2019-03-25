import { Time } from "@angular/common";

export const uniqueId = function() {
  return Math.random()
    .toString(36)
    .substr(2, 16);
};

export const addLeadingZero = v => (v >= 10 ? `${v}` : `0${v}`);
