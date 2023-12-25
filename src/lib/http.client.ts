import { AppErrorCode } from '@/app';
import axios, { AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL as string;

export const getClient = () =>
  axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(localStorage.getItem('token')
        ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
        : {}),
    },
  });

export function handleAxiosError(err: any) {
  if (err instanceof AxiosError) {
    if (err.response) {
      const errorPayload = err.response.data as any;
      return errorPayload.errorCode;
    }
  }
  return AppErrorCode.SERVER_FAILURE;
}
