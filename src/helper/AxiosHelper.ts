import { api } from 'boot/axios';
export const useFetchData = (
  method:'get'|'post'|'put'|'delete'|'patch',
)=> {
  const fetchData = async (route:string,params = {},body = {},) =>{
    const response = await api[method](`/${route}`,{params:params , data:body});
    return response.data;
  }
  return { fetchData }
};
