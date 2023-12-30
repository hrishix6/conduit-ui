import { getClient, handleAxiosError } from '@/lib/http.client';
import { Profile } from '../types';
import { UserInfo } from '@/app';

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

export async function getUserProfile(username: string) {
  try {
    const client = getClient();
    const response = await client.get(`/profiles/${username}`);
    if (response.data && response.data.profile) {
      return response.data.profile as Profile;
    }
    return null;
  } catch (error) {
    throw handleAxiosError(error);
  }
}



export async function updateUserProfile(dto: Partial<UserInfo> & { password?: string }) {
  try {
    const client = getClient();
    const response = await client.put(`/user`, { user: dto });
    if (response.data && response.data.user) {
      return response.data.user as UserInfo;
    }
    return null;
  } catch (error) {
    throw handleAxiosError(error);
  }
}