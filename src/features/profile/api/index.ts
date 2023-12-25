import { getClient, handleAxiosError } from '@/lib/http.client';
import { Profile } from '../types';

export async function followAuthor(username: string) {
  try {
    const client = getClient();
    const response = await client.post(`/profiles/${username}/follow`);
    if (response.data && response.data.profile) {
      return response.data.profile as Profile;
    }
    return null;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function unfollowAuthor(username: string) {
  try {
    const client = getClient();
    const response = await client.delete(`/profiles/${username}/follow`);
    if (response.data && response.data.profile) {
      return response.data.profile as Profile;
    }
    return null;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
