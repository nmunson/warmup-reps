"use client";

import React from "react";

import { barTypeLabel, isMetric } from "@/lib/warmup";

const UNIT_OPTIONS = [
  { id: "units-pounds", label: "Pounds" },
  { id: "units-kilograms", label: "Kilograms" }
];

const BAR_OPTIONS = [
  { id: "bar-type-squat", name: "Squat" },
  { id: "bar-type-olympic", name: "Olympic" },
  { id: "bar-type-womens", name: "Womens" },
  { id: "bar-type-standard", name: "Standard" },
  { id: "bar-type-technique", name: "Technique" }
];

export function SettingsPanel({ units, barType, onUnitsChange, onBarTypeChange }) {
  const metric = isMetric(units);

  return (
    <div className="settings-panel">
      <fieldset className="settings-fieldset">
        <legend>Unit system:</legend>
        <div className="choice-row">
          {UNIT_OPTIONS.map((option) => (
            <label
              key={option.id}
              className={`choice-pill ui-btn ui-corner-all ${
                units === option.id ? "choice-pill-active" : ""
              }`}
              htmlFor={option.id}
            >
              <input
                checked={units === option.id}
                id={option.id}
                name="units"
                onChange={() => onUnitsChange(option.id)}
                type="radio"
                value={option.id}
              />
              <span className="choice-pill-label">{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="settings-fieldset">
        <legend>Bar type:</legend>
        <div className="choice-row choice-row-nowrap">
          {BAR_OPTIONS.map((option) => (
            <label
              key={option.id}
              className={`choice-pill ui-btn ui-corner-all ${
                barType === option.id ? "choice-pill-active" : ""
              }`}
              htmlFor={option.id}
            >
              <input
                checked={barType === option.id}
                id={option.id}
                name="bar-type"
                onChange={() => onBarTypeChange(option.id)}
                type="radio"
                value={option.id}
              />
              <span className="choice-pill-label">
                {option.name} ({barTypeLabel(option.id, metric)})
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
