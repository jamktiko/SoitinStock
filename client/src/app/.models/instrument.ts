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
  img?: String;
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

// different instrument-interfaces used in the project.
// Made at the very start of the project, so some may be unused
