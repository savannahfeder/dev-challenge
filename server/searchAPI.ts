import express, { Request, Response } from 'express';
import { UnsplashResult, PexelsResult, SearchResults } from '../shared/types';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());

const searchUnsplash = async (
  query: string,
  page: number,
  perPage: number
): Promise<UnsplashResult> => {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${perPage}`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    }
  );
  return response.data;
};

const searchPexels = async (
  query: string,
  page: number,
  perPage: number
): Promise<PexelsResult> => {
  const response = await axios.get(
    `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${perPage}`,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
    }
  );
  return response.data;
};

const performSearch = async (
  query: string,
  page: number,
  perPage: number,
  api: string
): Promise<SearchResults> => {
  try {
    let searchResults: SearchResults;

    if (api === 'unsplash') {
      searchResults = await searchUnsplash(query, page, perPage);
    } else if (api === 'pexels') {
      searchResults = await searchPexels(query, page, perPage);
    } else {
      throw new Error('Invalid API specified');
    }

    return searchResults;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};

app.get('/search', async (req: Request, res: Response) => {
  const { query, page, perPage, api } = req.query;

  try {
    const searchResults = await performSearch(
      query as string,
      parseInt(page as string),
      parseInt(perPage as string),
      api as string
    );
    res.json(searchResults);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching search results' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
