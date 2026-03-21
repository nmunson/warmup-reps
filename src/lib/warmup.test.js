import { describe, expect, it } from "vitest";

import {
  achievableBarbellWeight,
  availablePlates,
  barWeight,
  calculateBarbellWeights,
  findWeight,
  formatSet,
  roundDown
} from "@/lib/warmup";

describe("warmup helpers", () => {
  it("uses the configured bar weight for imperial and metric bars", () => {
    expect(barWeight(false, "bar-type-olympic")).toBe(45);
    expect(barWeight(false, "bar-type-squat")).toBe(55);
    expect(barWeight(true, "bar-type-squat")).toBe(25);
    expect(barWeight(true, "bar-type-womens")).toBe(15);
    expect(barWeight(true, "bar-type-technique")).toBe(7.5);
  });

  it("rounds down to the correct step size without going below the bar", () => {
    expect(roundDown(133, false, "bar-type-olympic")).toBe(130);
    expect(roundDown(53, false, "bar-type-squat")).toBe(55);
    expect(roundDown(18, true, "bar-type-olympic")).toBe(20);
    expect(roundDown(79, true, "bar-type-standard")).toBe(77.5);
  });

  it("returns the correct available plates when the smallest plate preference changes", () => {
    expect(availablePlates(false)).toEqual([45, 35, 25, 10, 5, 2.5]);
    expect(availablePlates(false, true)).toEqual([45, 35, 25, 10, 5]);
    expect(availablePlates(true)).toEqual([20, 15, 10, 5, 2.5, 1.25]);
    expect(availablePlates(true, true)).toEqual([20, 15, 10, 5, 2.5]);
  });

  it("calculates plate loading per side", () => {
    expect(calculateBarbellWeights(225, false, "bar-type-olympic")).toBe("2x45");
    expect(calculateBarbellWeights(235, false, "bar-type-squat")).toBe("2x45");
    expect(calculateBarbellWeights(25, true, "bar-type-squat")).toBe("Bar");
    expect(calculateBarbellWeights(315, false, "bar-type-olympic")).toBe("3x45");
    expect(calculateBarbellWeights(20, true, "bar-type-olympic")).toBe("Bar");
  });

  it("finds the nearest achievable barbell load without the smallest plates", () => {
    expect(achievableBarbellWeight(170, false, "bar-type-olympic", true)).toBe(165);
    expect(calculateBarbellWeights(165, false, "bar-type-olympic", true)).toBe("45 10 5");
    expect(achievableBarbellWeight(77.5, true, "bar-type-standard", true)).toBe(75);
    expect(calculateBarbellWeights(75, true, "bar-type-standard", true)).toBe("20 10 2.5");
    expect(achievableBarbellWeight(45, false, "bar-type-olympic", true)).toBe(45);
  });

  it("derives warmup weights from multipliers and formats the display text", () => {
    const workout = { sets: "1", reps: "3", multiplier: 0.7 };
    const setWeight = findWeight(workout, 200, false, "bar-type-olympic");

    expect(setWeight).toBe(140);
    expect(formatSet(workout, setWeight, false)).toBe("1x3 140 lbs");
  });
});
