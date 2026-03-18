"use client";

import React from "react";

const UNIT_OPTIONS = [
  { id: "units-pounds", label: "Pounds" },
  { id: "units-kilograms", label: "Kilograms" }
];

const BAR_OPTIONS = [
  { id: "bar-type-squat", label: "Squat (55)" },
  { id: "bar-type-olympic", label: "Olympic (45)" },
  { id: "bar-type-womens", label: "Womens (35)" },
  { id: "bar-type-standard", label: "Standard (20)" },
  { id: "bar-type-technique", label: "Technique (15)" }
];

export function SettingsPanel({ units, barType, onUnitsChange, onBarTypeChange }) {
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
        <legend>Bar type (in lbs):</legend>
        <div className="choice-row">
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
              <span className="choice-pill-label">{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
