import { getClient, handleAxiosError } from '@/lib/http.client';
import { Article } from '../types';

export async function loadArticals(offset: number, limit: number, tag: string) {
  try {
    const client = getClient();
    const query = new URLSearchParams({
      offset: `${offset}`,
      limit: `${limit}`,
      tag,
    }).toString();

    const response = await client.get(`/articles?${query}`);

    if (response.data && response.data.articles) {
      return response.data.articles as Article[];
    }

    return null;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function loadTags() {
  try {
    const client = getClient();

    const response = await client.get('/tags');

    if (response.data && response.data.tags) {
      return response.data.tags as string[];
    }

    return null;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function loadFeed(offset: number, limit: number) {
  try {
    const client = getClient();
    const query = new URLSearchParams({
      offset: `${offset}`,
      limit: `${limit}`,
    }).toString();

    const response = await client.get(`/articles/feed?${query}`);

    if (response.data && response.data.articles) {
      return response.data.articles as Article[];
    }

    return null;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
