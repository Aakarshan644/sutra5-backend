export interface SlotAvailability {
  date: string;
  remaining: number;
  soldOut: boolean;
}

export interface HoldRequest {
  date: string;
  sessionId: string;
}
