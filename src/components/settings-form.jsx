"use client";

import React from "react";
import { useEffect, useState } from "react";

import { SettingsPanel } from "@/components/settings-panel";
import { getStoredBarType, getStoredIgnoreSmallestPlate, getStoredUnits } from "@/lib/warmup";

export function SettingsForm() {
  const [units, setUnits] = useState("units-pounds");
  const [barType, setBarType] = useState("bar-type-olympic");
  const [ignoreSmallestPlate, setIgnoreSmallestPlate] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setUnits(getStoredUnits());
    setBarType(getStoredBarType());
    setIgnoreSmallestPlate(getStoredIgnoreSmallestPlate());
    setIsLoaded(true);
  }, []);

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

    localStorage.setItem("ignore_smallest_plate", String(ignoreSmallestPlate));
  }, [ignoreSmallestPlate, isLoaded]);

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
