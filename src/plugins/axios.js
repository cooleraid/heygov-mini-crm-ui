import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { usePayloadStore } from '@/stores/payload';

const _axios = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    Accept: 'application/json'
  },
  timeout: 60000
});

_axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

_axios.interceptors.response.use(
  async (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default async () => {
  const payloadStore = usePayloadStore();
  if (!payloadStore.payload.client_id) payloadStore.change({ client_id: uuidv4() });
  _axios.defaults.headers.common['x-client-id'] = `${payloadStore.payload.client_id}`;
  return _axios;
};
