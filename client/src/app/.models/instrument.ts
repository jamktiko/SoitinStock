export interface RawInstrumentType {
  id_type: number;
  type_name: string;
}
export interface RawInstrument {
  id_Instrument: number;
  name: string;
  model?: string;
  Description?: string;
  Instrument_type_id: number;
}

export const mapRawInstrument = (r: RawInstrument) => {
  id: r.id_Instrument;
  name: r.name;
  model: r.model;
  description: r.Description;
  instrTypeId: r.Instrument_type_id;
};

export interface Instruments {
  instruments: RawInstrument[];
}
