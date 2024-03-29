import AxiosClient from '../plugins/axios';

export const createContact = async (payload) => {
  const client = await AxiosClient();
  return (await client.post('contacts', payload))?.data;
};

export const fetchContacts = async (query) => {
  const client = await AxiosClient();
  return (await client.get(`contacts?${new URLSearchParams(query)}`))?.data;
};

export const fetchContact = async (id) => {
  const client = await AxiosClient();
  return (await client.get(`contacts/${id}`))?.data;
};

export const deleteContact = async (id) => {
  const client = await AxiosClient();
  return (await client.delete(`contacts/${id}`, { }))?.data;
};
