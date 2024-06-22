import { api } from 'boot/axios';
import { useFetchData } from 'src/helper/AxiosHelper';
export const getAllCitiesService = ()=>{
  const {fetchData} = useFetchData('get',)
  return {fetchData}
}
