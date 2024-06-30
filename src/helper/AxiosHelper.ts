import { api } from 'boot/axios';
import { useRouter } from 'vue-router';


export const fetchAllData = async (route:string,params:object = {})=> {
  const router = useRouter()
  try {
    return await api.get(route, { params: params });
  }catch (err: any) {
    if (err.response && err.response.status === 401) {
      console.log('Token expired or unauthorized!');
      await router.push({ path: '/login', replace: true })
    } else {
      console.error('Error fetching data:', err);
      throw err; // Re-throw other errors
    }
  }
}
export const createData = async (route:string,data: object = {})=> {
  const router = useRouter()
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
  const router = useRouter()
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
export const deleteData = async (route:string,id:number|string)=> {
  await api.delete(route + "/" + id)
}
