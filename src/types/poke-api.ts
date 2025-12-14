// Tipos base reutilizáveis
export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface APIResource {
  url: string;
}

export interface Name {
  name: string;
  language: NamedAPIResource;
}

export interface Description {
  description: string;
  language: NamedAPIResource;
}

export interface FlavorText {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
}

// Tipos específicos
export interface Genus {
  genus: string;
  language: NamedAPIResource;
}

export interface PokemonSpeciesDexEntry {
  entry_number: number;
  pokedex: NamedAPIResource;
}

export interface PalParkEncounterArea {
  base_score: number;
  rate: number;
  area: NamedAPIResource;
}

export interface PokemonSpeciesVariety {
  is_default: boolean;
  pokemon: NamedAPIResource;
}

// Interface principal
export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;

  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  hatch_counter: number;

  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  has_gender_differences: boolean;
  forms_switchable: boolean;

  growth_rate: NamedAPIResource;
  pokedex_numbers: PokemonSpeciesDexEntry[];
  egg_groups: NamedAPIResource[];

  color: NamedAPIResource;
  shape: NamedAPIResource;
  habitat: NamedAPIResource | null;

  evolves_from_species: NamedAPIResource | null;
  evolution_chain: APIResource;

  generation: NamedAPIResource;

  names: Name[];
  pal_park_encounters: PalParkEncounterArea[];
  flavor_text_entries: FlavorText[];
  form_descriptions: Description[];
  genera: Genus[];
  varieties: PokemonSpeciesVariety[];
}
