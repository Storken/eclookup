export interface Card {
  attributes: Attribute[]
  id: number
  name: string
  description: string
  external_url: string
  image: string
  traits: Trait[]
  layer_artists: string[]
  layer_image: string
  artist: string
  title: string
  owner: string
}

export interface Attribute {
  trait_type: string
  value: string
}

export interface RandomTraits {
  traits: string[]
  trait_types: string[]
  series: string
}

export interface Trait {
  name:        string;
  description: string;
  id:          number;
  icon:        string;
}
