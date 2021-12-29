export interface MetroRoute {
  route_id: string;
  route_label?: string;
}

export interface RouteDirection {
  direction_id: number;
  direction_name?: string;
}

export interface StopsList {
  place_code: string;
  description?: string;
}
