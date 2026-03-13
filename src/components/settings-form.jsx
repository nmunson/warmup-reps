"use client";

import React from "react";
import { useEffect, useState } from "react";

import { SettingsPanel } from "@/components/settings-panel";
import { getStoredBarType, getStoredUnits } from "@/lib/warmup";

export function SettingsForm() {
  const [units, setUnits] = useState("units-pounds");
  const [barType, setBarType] = useState("bar-type-olympic");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setUnits(getStoredUnits());
    setBarType(getStoredBarType());
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

  return (
    <SettingsPanel
      barType={barType}
      onBarTypeChange={setBarType}
      onUnitsChange={setUnits}
      units={units}
    />
  );
}
