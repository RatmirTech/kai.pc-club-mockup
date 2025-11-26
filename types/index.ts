export type PCStatus = "available" | "occupied" | "reserved" | "maintenance";

export interface Client {
  id: string;
  name: string;
  nickname: string;
  email: string;
  phone: string;
}

export interface Zone {
  id: string;
  name: string;
  description?: string;
  color: string; // For UI representation
}

export interface PC {
  id: string;
  number: string;
  zone: string; // Changed from union type to string to support dynamic zones
  status: PCStatus;
  currentClient?: Client;
  endTime?: string; // ISO string
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  validUntil: string;
  discount: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  unit: string;
  zone: string;
}
