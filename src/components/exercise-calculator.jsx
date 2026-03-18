"use client";

import React from "react";
import { useEffect, useState } from "react";

import { LiftIcon } from "@/components/lift-icon";
import {
  barWeight,
  calculateBarbellWeights,
  findWeight,
  formatSet,
  getExerciseStorageKey,
  getStoredBarType,
  getStoredUnits,
  isMetric,
  roundDown,
  stepSize
} from "@/lib/warmup";

export function ExerciseCalculator({ exercise }) {
  const [units, setUnits] = useState("units-pounds");
  const [barType, setBarType] = useState("bar-type-olympic");
  const [targetWeight, setTargetWeight] = useState(100);
  const [weightInput, setWeightInput] = useState("100");
  const [isLoaded, setIsLoaded] = useState(false);

  const updateTargetWeight = (nextWeight) => {
    setTargetWeight(nextWeight);
    setWeightInput(String(nextWeight));
  };

  useEffect(() => {
    const nextUnits = getStoredUnits();
    const nextBarType = getStoredBarType();
    const storedWeight = localStorage.getItem(getExerciseStorageKey(exercise.name));
    const nextWeight = storedWeight ? Number(storedWeight) : 100;

    setUnits(nextUnits);
    setBarType(nextBarType);
    setTargetWeight(nextWeight);
    setWeightInput(String(nextWeight));
    setIsLoaded(true);
  }, [exercise.name]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem("units", units);
  }, [isLoaded, units]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem("bar_type", barType);
  }, [barType, isLoaded]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem(getExerciseStorageKey(exercise.name), String(targetWeight));
  }, [exercise.name, isLoaded, targetWeight]);

  const metric = isMetric(units);
  const maximum = exercise.max;
  const minimum = barWeight(metric, barType);
  const step = stepSize(metric);
  const safeWeight = Math.min(roundDown(targetWeight, metric, barType), maximum);

  const handleWeightInputChange = (event) => {
    const nextValue = event.target.value;
    setWeightInput(nextValue);

    if (nextValue === "") {
      return;
    }

    const parsedWeight = Number(nextValue);

    if (!Number.isNaN(parsedWeight)) {
      setTargetWeight(parsedWeight);
    }
  };

  const handleWeightInputBlur = () => {
    setWeightInput(String(safeWeight));
  };

  const workouts = exercise.workouts.map((workout) => {
    const setWeight = findWeight(workout, safeWeight, metric, barType);

    return {
      description: formatSet(workout, setWeight, metric),
      plates: calculateBarbellWeights(setWeight, metric, barType)
    };
  });

  return (
    <section>
      <h2 className="exercise-heading">
        <LiftIcon name={exercise.name} />
        <span>{exercise.name}</span>
      </h2>
      <p>
        Choose your working weight. Your warmup sets will then be calculated as
        well as the weights you need to put on each bar side.
      </p>

      <div className="target-weight-container">
        <label htmlFor="target-weight">Weight:</label>
        <div className="target-weight-controls">
          <input
            aria-label="Weight value"
            className="target-weight-input"
            max={maximum}
            min={minimum}
            onBlur={handleWeightInputBlur}
            onChange={handleWeightInputChange}
            step={step}
            type="number"
            value={weightInput}
          />
          <input
            id="target-weight"
            max={maximum}
            min={minimum}
            onChange={(event) => updateTargetWeight(Number(event.target.value))}
            step={step}
            type="range"
            value={safeWeight}
          />
        </div>
      </div>

      <ul
        className="warmup-list ui-listview ui-listview-inset ui-corner-all ui-shadow"
        data-inset="true"
      >
        {workouts.map((workout) => (
          <li
            key={`${workout.description}-${workout.plates}`}
            className="ui-li-static ui-body-inherit"
          >
            {workout.description} ({workout.plates})
          </li>
        ))}
      </ul>
    </section>
  );
}
