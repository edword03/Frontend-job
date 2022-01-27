export interface DetailsInfoType {
  vacancyItem: {
    id: string;
    name: string;
    description: string;
    branded_description: string;
    salary: {
      currency: string;
      from: string;
      to: string;
      gross: string;
    };
    employer: {
      name: string;
      logo_urls: {
        original: string;
        _90: string;
        _240: string;
      };
    };
    experience: {
      name: string;
    };
    address: {
      city: string;
    };
  };
}

export interface VacancyIdType {
  vacancyId: string;
}