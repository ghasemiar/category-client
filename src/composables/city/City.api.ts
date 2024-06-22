import { api } from 'boot/axios';
export interface jobI {
  id: number;
  name: string;
  parent?: number;
}
export const getAllCities = async (
  provinceId: number
): Promise<jobI | Error> => {
  const response = await api.get(`/city/${provinceId}`);
  return response.data;
};
