import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ExerciseCalculator } from "@/components/exercise-calculator";

const exercise = {
  name: "Bench",
  max: 500,
  workouts: [
    { sets: "2", reps: "5", multiplier: 0 },
    { sets: "1", reps: "5", multiplier: 0.5 },
    { sets: "1", reps: "3", multiplier: 0.7 },
    { sets: "3", reps: "5", multiplier: 1.0 }
  ]
};

describe("ExerciseCalculator", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders stored preferences and updates the workout list when the weight changes", async () => {
    window.localStorage.setItem("units", "units-pounds");
    window.localStorage.setItem("bar_type", "bar-type-olympic");
    window.localStorage.setItem("bench", "185");

    render(<ExerciseCalculator exercise={exercise} />);

    await waitFor(() => {
      expect(screen.getByText(/2x5 45 lbs \(Bar\)/)).toBeInTheDocument();
      expect(screen.getByText(/3x5 185 lbs \(45 25\)/)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole("slider"), {
      target: { value: "225" }
    });

    await waitFor(() => {
      expect(screen.getByText(/3x5 225 lbs \(2x45\)/)).toBeInTheDocument();
    });

    expect(window.localStorage.getItem("bench")).toBe("225");
  });

  it("keeps the number input and slider in sync", async () => {
    render(<ExerciseCalculator exercise={exercise} />);

    const slider = screen.getByRole("slider");
    const input = screen.getByLabelText("Weight value");

    expect(input).toHaveValue(100);

    fireEvent.change(input, {
      target: { value: "205" }
    });

    await waitFor(() => {
      expect(slider).toHaveValue("205");
      expect(screen.getByText(/3x5 205 lbs \(45 35\)/)).toBeInTheDocument();
    });

    fireEvent.change(slider, {
      target: { value: "225" }
    });

    await waitFor(() => {
      expect(input).toHaveValue(225);
    });
  });

  it("allows typing a full weight without rewriting the input mid-edit", async () => {
    render(<ExerciseCalculator exercise={exercise} />);

    const input = screen.getByLabelText("Weight value");

    fireEvent.change(input, {
      target: { value: "170" }
    });

    expect(input).toHaveValue(170);

    await waitFor(() => {
      expect(screen.getByText(/3x5 170 lbs \(45 10 5 2.5\)/)).toBeInTheDocument();
    });

    expect(window.localStorage.getItem("bench")).toBe("170");
  });

  it("allows clearing the input temporarily and restores the minimum safe value on blur", async () => {
    render(<ExerciseCalculator exercise={exercise} />);

    const input = screen.getByLabelText("Weight value");

    fireEvent.change(input, {
      target: { value: "" }
    });

    expect(input).toHaveValue(null);

    fireEvent.blur(input);

    await waitFor(() => {
      expect(input).toHaveValue(100);
    });
  });

  it("uses stored metric settings and recalculates the visible units", async () => {
    window.localStorage.setItem("units", "units-kilograms");
    window.localStorage.setItem("bar_type", "bar-type-olympic");

    render(<ExerciseCalculator exercise={exercise} />);

    await waitFor(() => {
      expect(screen.getByText(/3x5 100 kgs \(2x20\)/)).toBeInTheDocument();
    });

    expect(window.localStorage.getItem("units")).toBe("units-kilograms");
  });
});
