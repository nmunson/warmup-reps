import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SettingsPanel } from "@/components/settings-panel";

function renderPanel(props = {}) {
  const onUnitsChange = vi.fn();
  const onBarTypeChange = vi.fn();

  render(
    <SettingsPanel
      barType="bar-type-olympic"
      onBarTypeChange={onBarTypeChange}
      onUnitsChange={onUnitsChange}
      units="units-pounds"
      {...props}
    />
  );

  return { onUnitsChange, onBarTypeChange };
}

afterEach(() => {
  cleanup();
});

describe("SettingsPanel", () => {
  it("shows pound labels when the preferred units are pounds", () => {
    renderPanel();

    expect(screen.getByText("Olympic (45 lb)")).toBeInTheDocument();
    expect(screen.getByText("Standard (20 lb)")).toBeInTheDocument();
    expect(screen.getByText("Technique (15 lb)")).toBeInTheDocument();
  });

  it("shows metric labels when the preferred units are kilograms", () => {
    renderPanel({ units: "units-kilograms" });

    expect(screen.getByText("Olympic (20 kg)")).toBeInTheDocument();
    expect(screen.getByText("Standard (10 kg)")).toBeInTheDocument();
    expect(screen.getByText("Technique (7.5 kg)")).toBeInTheDocument();
  });

  it("updates the labels when the user changes unit preference and keeps the bar selection", () => {
    function Harness() {
      const [units, setUnits] = React.useState("units-pounds");
      const [barType, setBarType] = React.useState("bar-type-standard");

      return (
        <SettingsPanel
          barType={barType}
          onBarTypeChange={setBarType}
          onUnitsChange={setUnits}
          units={units}
        />
      );
    }

    render(<Harness />);

    expect(screen.getByLabelText("Standard (20 lb)")).toBeChecked();

    fireEvent.click(screen.getByLabelText("Kilograms"));

    expect(screen.getByLabelText("Standard (10 kg)")).toBeChecked();
    expect(screen.queryByText("Standard (20 lb)")).not.toBeInTheDocument();
  });
});
