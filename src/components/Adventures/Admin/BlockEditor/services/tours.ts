'use client';

export interface Tour {
  id: number;
  name: string;
  days: number;
  price: number;
  valute: string;
  slug: string;
  photo: {
    file: string;
    alt_text: string | null;
  };
  destination: {
    name: string;
  };
}

export interface ToursResponse {
  data: Tour[];
}

export const fetchTours = async (lang: string = 'en', search: string = ''): Promise<Tour[]> => {
  try {
    const url = new URL('https://api.minzifatravel.com/api/v1/tours');
    url.searchParams.append('locale', lang);
    if (search) {
      url.searchParams.append('search', search);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Failed to fetch tours');
    }
    const result: ToursResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching tours:', error);
    return [];
  }
};
