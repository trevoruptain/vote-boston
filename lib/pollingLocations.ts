import fs from "fs";
import Papa from "papaparse";
import path from "path";
import { PollingLocation } from "../app/types/pollingLocation";

let pollingLocationsCache: PollingLocation[] | null = null;

export async function getPollingLocations(): Promise<PollingLocation[]> {
  if (pollingLocationsCache) {
    return pollingLocationsCache;
  }

  const filePath = path.join(
    process.cwd(),
    "app",
    "data",
    "polling_locations.csv"
  );

  // Read the CSV file
  const fileContent = fs.readFileSync(filePath, "utf8");

  // Parse the CSV content
  const result = Papa.parse<PollingLocation>(fileContent, {
    header: true,
    dynamicTyping: true,
  });

  // Cache the polling locations
  pollingLocationsCache = result.data.filter(
    (loc) => loc.POINT_X && loc.POINT_Y
  ) as PollingLocation[];

  return pollingLocationsCache;
}
