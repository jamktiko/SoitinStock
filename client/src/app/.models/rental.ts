import { RentStatus } from './enums';

export interface RawRental {
  id_Rentals: number;
  start_date: string;
  end_date: string;
  returned_date?: string | null;
  employee?: string;
  rent_status: RentStatus;
  customer_id: number;
  total_price: number;
}
export interface RawRentalsHasItem {
  Rentals_id: number;
  Item_id: number;
}
