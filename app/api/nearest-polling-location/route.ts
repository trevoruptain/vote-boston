import { NextResponse } from "next/server";
import { getPollingLocations } from "../../../lib/pollingLocations";
import { PollingLocation } from "../../types/pollingLocation";

interface NearestPollingLocationRequest {
  userLat: number;
  userLng: number;
}

function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  // Haversine formula to calculate distance between two coordinates in kilometers
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance; // Distance in kilometers
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userLat, userLng } = body as NearestPollingLocationRequest;

    if (typeof userLat !== "number" || typeof userLng !== "number") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const pollingLocations: PollingLocation[] = await getPollingLocations();

    let nearestLocation: PollingLocation | null = null;
    let minDistance = Infinity;

    pollingLocations.forEach((location) => {
      const distance = calculateDistance(
        userLat,
        userLng,
        location.POINT_Y,
        location.POINT_X
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestLocation = location;
      }
    });

    if (!nearestLocation) {
      return NextResponse.json(
        { error: "No polling locations found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ nearestLocation, distance: minDistance });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
