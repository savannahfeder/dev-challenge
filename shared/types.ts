export type UnsplashResult = {
  total: number;
  total_pages: number;
  results: {
    id: string;
    urls: {
      regular: string;
    };
    alt_description: string;
  }[];
};

export type PexelsResult = {
  total_results: number;
  page: number;
  per_page: number;
  photos: {
    id: number;
    src: {
      medium: string;
    };
    alt: string;
  }[];
};

export type SearchResults = UnsplashResult | PexelsResult;

export type NormalizedImage = {
  id: string | number;
  src: string;
  alt: string;
};
