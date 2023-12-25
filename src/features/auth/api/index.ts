import { getClient, handleAxiosError } from '@/lib/http.client';
import { LoginDTO, RegisterDTO } from '../types';
import { UserInfo } from '@/app';

export async function attemptLogin(body: LoginDTO) {
  try {
    const client = getClient();
    const response = await client.post(
      '/users/login',
      { user: body },
      {
        headers: {
          Authorization: '',
        },
      }
    );

    if (response.data && response.data.user) {
      return response.data.user as UserInfo;
    }

    return null;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function attemptSignUp(body: RegisterDTO) {
  try {
    const client = getClient();
    const response = await client.post(
      '/users',
      { user: body },
      {
        headers: {
          Authorization: '',
        },
      }
    );

    if (response.data && response.data.user) {
      return response.data.user as UserInfo;
    }

    return null;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
