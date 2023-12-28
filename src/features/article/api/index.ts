import { getClient, handleAxiosError } from '@/lib/http.client';
import { Article, Comment } from '../types';

export async function loadArticals(
  offset: number,
  limit: number,
  tag?: string
) {
  try {
    const client = getClient();
    const query = new URLSearchParams({
      offset: `${offset}`,
      limit: `${limit}`,
      ...(tag ? { tag } : {}),
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

export async function loadArticlesForUser(
  offset: number,
  limit: number,
  username: string,
  kind: 'author' | 'favorited'
) {
  try {
    const client = getClient();
    const query = new URLSearchParams({
      offset: `${offset}`,
      limit: `${limit}`,
      [kind]: username,
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

export async function loadingArticleDetail(slug: string) {
  try {
    const client = getClient();
    const response = await client.get(`/articles/${slug}`);

    if (response.data && response.data.article) {
      return response.data.article as Article;
    }

    return null;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function loadArticleComments(slug: string) {
  try {
    const client = getClient();
    const response = await client.get(`/articles/${slug}/comments`);

    if (response.data && response.data.comments) {
      return response.data.comments as Comment[];
    }

    return null;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function AddArticleComment(slug: string, body: string) {
  try {
    const client = getClient();
    const response = await client.post(`/articles/${slug}/comments`, {
      comment: {
        body,
      },
    });

    if (response.data && response.data.comment) {
      return response.data.comment as Comment;
    }

    return null;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function deleteArticleComment(slug: string, id: number) {
  try {
    const client = getClient();
    await client.delete(`/articles/${slug}/comments/${id}`);
    return true;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function addArticleToFavourites(slug: string) {
  try {
    const client = getClient();
    const response = await client.post(`/articles/${slug}/favorite`);
    if (response.data && response.data.article) {
      return response.data.article as Article;
    }
    return null;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function removeArticleFromFavourites(slug: string) {
  try {
    const client = getClient();
    const response = await client.delete(`/articles/${slug}/favorite`);
    if (response.data && response.data.article) {
      return response.data.article as Article;
    }
    return null;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
