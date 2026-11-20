import { describe, expect, it } from "vitest";
import { formatCountdown } from "./formatCountdown";

describe("formatCountdown", () => {
  it("reads as minutes and zero-padded seconds", () => {
    expect([formatCountdown(300), formatCountdown(65), formatCountdown(9)]).toEqual(["5:00", "1:05", "0:09"]);
  });
});
