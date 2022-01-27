export type AppType = {
  name: string
}


interface IEmploer {
  alternate_url: string;
  id: string;
  logo_urls: {
    90: string;
    240: string;
    original: string;
  };
  name: string;
  trusted: boolean;
  url: string;
  vacancies_url: string;
}

interface IAdressItem {
  city: string | null;
  building: string | null;
  description: string | null;
  id: string;
  lat: number;
  lng: number;
  raw: string | null;
  street: string | null;
}

export interface Iitem {
  address?: IAdressItem | null;
  alternate_url: string | null;
  accept_temporary?: boolean;
  archived?: boolean;
  area: {
    id: string;
    name: string;
    url: string;
  };
  created_at: string;
  contacts: null;
  department: null;
  employer: IEmploer;
  has_test: boolean;
  id: string;
  insider_interview: null | string;
  name: string;
  premium: boolean;
  published_at: string;
  salary: {
    currency: string;
    from: number;
    gross: boolean;
    to: number;
  };
  schedule: {
    id: string;
    name: string;
  };
  snippet: {
    requirement: string;
    responsibility: string;
  };
  type: {
    id: string;
    name: string;
  };
}

