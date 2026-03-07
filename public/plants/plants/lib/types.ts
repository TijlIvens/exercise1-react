export interface PlantsData {
  data: Plant[];
  links: Links2;
  meta: Meta;
}

export interface Plant {
  id: number;
  common_name: string;
  slug: string;
  scientific_name: string;
  year: number;
  bibliography: string;
  author: string;
  status: string;
  rank: string;
  family_common_name?: string;
  genus_id: number;
  image_url: string;
  synonyms: string[];
  genus: string;
  family: string;
  links: Links;
}

export interface Links {
  self: string;
  plant: string;
  genus: string;
}

export interface Links2 {
  self: string;
  first: string;
  next: string;
  last: string;
}

export interface Meta {
  total: number;
}

export interface PlantData {
  data: PlantDetails;
  meta: DetailMeta;
}

export interface PlantDetails {
  id: number;
  common_name: string;
  slug: string;
  scientific_name: string;
  year: number;
  bibliography: string;
  author: string;
  status: string;
  rank: string;
  family_common_name: any;
  genus_id: number;
  observations: string;
  vegetable: boolean;
  image_url: string;
  genus: string;
  family: string;
  duration: any;
  edible_part: any;
  edible: boolean;
  images: Images;
  common_names: CommonNames;
  distribution: Distribution;
  distributions: Distributions;
  flower: Flower;
  foliage: Foliage;
  fruit_or_seed: FruitOrSeed;
  sources: Source[];
  specifications: Specifications;
  synonyms: Synonym[];
  growth: Growth;
  links: Links3;
}

export interface Images {
  [key: string]: ImageOfPart[];
}

export interface ImageOfPart {
  id: number;
  image_url: string;
  copyright: string;
}

export interface CommonNames {
  eng: string[];
  por: string[];
  spa: string[];
  fra: string[];
  en: string[];
  ar: string[];
  ca: string[];
  fr: string[];
  hu: string[];
  pt: string[];
  es: string[];
}

export interface Distribution {
  native: string[];
  introduced: string[];
}

export interface Distributions {
  native: Native[];
  introduced: Introduced[];
}

export interface Native {
  id: number;
  name: string;
  slug: string;
  tdwg_code: string;
  tdwg_level: number;
  species_count: number;
  links: Links;
}

export interface Introduced {
  id: number;
  name: string;
  slug: string;
  tdwg_code: string;
  tdwg_level: number;
  species_count: number;
  links: Links2;
}

export interface Links2 {
  self: string;
  plants: string;
  species: string;
}

export interface Flower {
  color: any;
  conspicuous: any;
}

export interface Foliage {
  texture: any;
  color: any;
  leaf_retention: any;
}

export interface FruitOrSeed {
  conspicuous: any;
  color: any;
  shape: any;
  seed_persistence: any;
}

export interface Source {
  last_update: string;
  id: string;
  name: string;
  url?: string;
  citation?: string;
}

export interface Specifications {
  ligneous_type: any;
  growth_form: any;
  growth_habit: any;
  growth_rate: any;
  average_height: AverageHeight;
  maximum_height: MaximumHeight;
  nitrogen_fixation: any;
  shape_and_orientation: any;
  toxicity: any;
}

export interface AverageHeight {
  cm: any;
}

export interface MaximumHeight {
  cm: any;
}

export interface Synonym {
  id: number;
  name: string;
  author: string;
  sources: Source2[];
}

export interface Source2 {
  last_update: string;
  id: string;
  name: string;
  url: string;
  citation: string;
}

export interface Growth {
  description: any;
  sowing: any;
  days_to_harvest: any;
  row_spacing: RowSpacing;
  spread: Spread;
  ph_maximum: any;
  ph_minimum: any;
  light: any;
  atmospheric_humidity: any;
  growth_months: any;
  bloom_months: any;
  fruit_months: any;
  minimum_precipitation: MinimumPrecipitation;
  maximum_precipitation: MaximumPrecipitation;
  minimum_root_depth: MinimumRootDepth;
  minimum_temperature: MinimumTemperature;
  maximum_temperature: MaximumTemperature;
  soil_nutriments: any;
  soil_salinity: any;
  soil_texture: any;
  soil_humidity: any;
}

export interface RowSpacing {
  cm: any;
}

export interface Spread {
  cm: any;
}

export interface MinimumPrecipitation {
  mm: any;
}

export interface MaximumPrecipitation {
  mm: any;
}

export interface MinimumRootDepth {
  cm: any;
}

export interface MinimumTemperature {
  deg_f: any;
  deg_c: any;
}

export interface MaximumTemperature {
  deg_f: any;
  deg_c: any;
}

export interface Links3 {
  self: string;
  plant: string;
  genus: string;
}

export interface DetailMeta {
  images_count: number;
  sources_count: number;
  synonyms_count: number;
  last_modified: string;
}
