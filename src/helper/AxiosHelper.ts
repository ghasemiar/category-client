import { api } from 'boot/axios';
import { useRouter } from 'vue-router';

const router = useRouter()
export const fetchAllData = async (route:string,params:object = {})=> {
  try {
    return await api.get(route, { params: params });
  }catch (err: any) {
    if (err.response && err.response.status === 401) {
      console.log('Token expired or unauthorized!');
      await router.push('/login');
    } else {
      console.error('Error fetching data:', err);
      throw err; // Re-throw other errors
    }
  }
}
export const createData = async (route:string,data: object = {})=> {
  try {
    return await api.post(route, { data: data });
  }catch (err: any) {
    if (err.response && err.response.status === 401) {
      console.log('Token expired or unauthorized!');
      await router.push('/login');
    } else {
      console.error('Error fetching data:', err);
      throw err; // Re-throw other errors
    }
  }
}
export const updateData = async (route:string, id:string,data: object = {})=> {
  try {
    return await api.put(route + "/" + id,{data:data})
  }catch (err: any) {
    if (err.response && err.response.status === 401) {
      console.log('Token expired or unauthorized!');
      await router.push('/login');
    } else {
      console.error('Error fetching data:', err);
      throw err; // Re-throw other errors
    }
  }
}
export const deleteData = async (route:string,id:number)=> {
  try {await api.delete(route + "/" + id)
  }catch (err: any) {
    if (err.response && err.response.status === 401) {
      console.log('Token expired or unauthorized!');
      await router.push('/login');
    } else {
      console.error('Error fetching data:', err);
      throw err; // Re-throw other errors
    }
  }
}
