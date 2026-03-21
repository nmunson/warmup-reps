import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SettingsPanel } from "@/components/settings-panel";

function renderPanel(props = {}) {
  const onUnitsChange = vi.fn();
  const onBarTypeChange = vi.fn();
  const onIgnoreSmallestPlateChange = vi.fn();

  render(
    <SettingsPanel
      barType="bar-type-olympic"
      ignoreSmallestPlate={false}
      onBarTypeChange={onBarTypeChange}
      onIgnoreSmallestPlateChange={onIgnoreSmallestPlateChange}
      onUnitsChange={onUnitsChange}
      units="units-pounds"
      {...props}
    />
  );

  return { onUnitsChange, onBarTypeChange, onIgnoreSmallestPlateChange };
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
    expect(screen.getByLabelText("Ignore 1.25kg plates")).toBeInTheDocument();
  });

  it("updates the labels when the user changes unit preference and keeps the bar selection", () => {
    function Harness() {
      const [units, setUnits] = React.useState("units-pounds");
      const [barType, setBarType] = React.useState("bar-type-standard");
      const [ignoreSmallestPlate, setIgnoreSmallestPlate] = React.useState(false);

      return (
        <SettingsPanel
          barType={barType}
          ignoreSmallestPlate={ignoreSmallestPlate}
          onBarTypeChange={setBarType}
          onIgnoreSmallestPlateChange={setIgnoreSmallestPlate}
          onUnitsChange={setUnits}
          units={units}
        />
      );
    }

    render(<Harness />);

    expect(screen.getByLabelText("Standard (20 lb)")).toBeChecked();

    fireEvent.click(screen.getByLabelText("Kilograms"));

    expect(screen.getByLabelText("Standard (10 kg)")).toBeChecked();
    expect(screen.getByLabelText("Ignore 1.25kg plates")).toBeInTheDocument();
    expect(screen.queryByText("Standard (20 lb)")).not.toBeInTheDocument();
  });

  it("renders the preferences section and updates the smallest plate preference", () => {
    const { onIgnoreSmallestPlateChange } = renderPanel();

    expect(screen.getByText("Preferences:")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Ignore 2.5lb plates"));

    expect(onIgnoreSmallestPlateChange).toHaveBeenCalledWith(true);
  });
});
