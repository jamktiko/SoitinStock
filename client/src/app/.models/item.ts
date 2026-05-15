import { Condition } from './enums';

export interface RawItem {
  id_Item: number;
  barcode: string;
  rent_day: number;
  rent_week: number;
  rent_month: number;
  is_available: 0 | 1;
  item_condition: Condition;
  Instrument_id_Instrument: number;
}

export interface RentalItem extends RawItem {
  amount: number;
  totalprice: number;
}

// Interfaces for items. RentalItem is used with Renting-Form and cartStore
