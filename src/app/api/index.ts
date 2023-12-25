import { getClient, handleAxiosError } from '@/lib/http.client';
import { UserInfo } from '..';

export async function getUserInfo() {
  try {
    const client = getClient();
    const response = await client.get('/user');
    if (response.data && response.data.user) {
      return response.data.user as UserInfo;
    }
    return null;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
