import { describe, expect, it } from "vitest";

import {
  barWeight,
  calculateBarbellWeights,
  findWeight,
  formatSet,
  roundDown
} from "@/lib/warmup";

describe("warmup helpers", () => {
  it("uses the configured bar weight for imperial and metric bars", () => {
    expect(barWeight(false, "bar-type-olympic")).toBe(45);
    expect(barWeight(true, "bar-type-womens")).toBe(15);
    expect(barWeight(true, "bar-type-technique")).toBe(7.5);
  });

  it("rounds down to the correct step size without going below the bar", () => {
    expect(roundDown(133, false, "bar-type-olympic")).toBe(130);
    expect(roundDown(18, true, "bar-type-olympic")).toBe(20);
    expect(roundDown(79, true, "bar-type-standard")).toBe(77.5);
  });

  it("calculates plate loading per side", () => {
    expect(calculateBarbellWeights(225, false, "bar-type-olympic")).toBe("2x45");
    expect(calculateBarbellWeights(315, false, "bar-type-olympic")).toBe("3x45");
    expect(calculateBarbellWeights(20, true, "bar-type-olympic")).toBe("Bar");
  });

  it("derives warmup weights from multipliers and formats the display text", () => {
    const workout = { sets: "1", reps: "3", multiplier: 0.7 };
    const setWeight = findWeight(workout, 200, false, "bar-type-olympic");

    expect(setWeight).toBe(140);
    expect(formatSet(workout, setWeight, false)).toBe("1x3 140 lbs");
  });
});
