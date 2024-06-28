import { useFetchData } from 'src/helper/AxiosHelper';
export const createProfileService = () => {
  const { fetchData } = useFetchData('post');
  return { fetchData };
};
