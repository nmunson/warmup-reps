export function slugify(value) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export function getStoredUnits() {
  if (typeof window === "undefined") {
    return "units-pounds";
  }

  return localStorage.getItem("units") || "units-pounds";
}

export function getStoredBarType() {
  if (typeof window === "undefined") {
    return "bar-type-olympic";
  }

  return localStorage.getItem("bar_type") || "bar-type-olympic";
}

export function getStoredIgnoreSmallestPlate() {
  if (typeof window === "undefined") {
    return false;
  }

  return localStorage.getItem("ignore_smallest_plate") === "true";
}

export function isMetric(units) {
  return units === "units-kilograms";
}

export function barWeight(metric, barType) {
  if (barType === "bar-type-squat") {
    return metric ? 25 : 55;
  }

  if (barType === "bar-type-standard") {
    return metric ? 10 : 20;
  }

  if (barType === "bar-type-technique") {
    return metric ? 7.5 : 15;
  }

  if (barType === "bar-type-womens") {
    return metric ? 15 : 35;
  }

  return metric ? 20 : 45;
}

export function barTypeLabel(barType, metric) {
  const weight = barWeight(metric, barType);
  return `${weight} ${metric ? "kg" : "lb"}`;
}

export function stepSize(metric) {
  return metric ? 2.5 : 5;
}

export function availablePlates(metric, ignoreSmallestPlate = false) {
  const plates = metric ? [20, 15, 10, 5, 2.5, 1.25] : [45, 35, 25, 10, 5, 2.5];

  if (!ignoreSmallestPlate) {
    return plates;
  }

  return plates.slice(0, -1);
}

export function roundDown(value, metric, barType) {
  const step = stepSize(metric);
  const minimum = barWeight(metric, barType);
  const rounded = value - (value % step);

  return rounded < minimum ? minimum : rounded;
}

export function findWeight(workout, targetWeight, metric, barType) {
  if (workout.multiplier !== undefined) {
    return roundDown(workout.multiplier * targetWeight, metric, barType);
  }

  return workout.weight;
}

export function formatSet(workout, weight, metric) {
  return `${workout.sets}x${workout.reps} ${weight} ${metric ? "kgs" : "lbs"}`;
}

export function achievableBarbellWeight(totalWeight, metric, barType, ignoreSmallestPlate = false) {
  let workingWeight = Number(totalWeight) - barWeight(metric, barType);

  if (workingWeight <= 0) {
    return barWeight(metric, barType);
  }

  const plates = availablePlates(metric, ignoreSmallestPlate);
  workingWeight /= 2;
  let loadableWeightPerSide = 0;

  while (workingWeight > 0) {
    const plate = plates.find((value) => workingWeight >= value);

    if (!plate) {
      break;
    }

    loadableWeightPerSide += plate;
    workingWeight = Number((workingWeight - plate).toFixed(5));
  }

  return Number((barWeight(metric, barType) + loadableWeightPerSide * 2).toFixed(5));
}

export function calculateBarbellWeights(totalWeight, metric, barType, ignoreSmallestPlate = false) {
  let workingWeight = Number(totalWeight) - barWeight(metric, barType);

  if (workingWeight <= 0) {
    return "Bar";
  }

  const plates = availablePlates(metric, ignoreSmallestPlate);
  const counts = new Map();
  workingWeight /= 2;

  while (workingWeight > 0) {
    const plate = plates.find((value) => workingWeight >= value);

    if (!plate) {
      break;
    }

    counts.set(plate, (counts.get(plate) || 0) + 1);
    workingWeight = Number((workingWeight - plate).toFixed(5));
  }

  return plates
    .filter((plate) => counts.has(plate))
    .map((plate) => {
      const count = counts.get(plate);
      return count > 1 ? `${count}x${plate}` : `${plate}`;
    })
    .join(" ");
}

export function getExerciseStorageKey(name) {
  return slugify(name);
}
