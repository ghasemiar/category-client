import { api } from 'boot/axios';
export interface jobI {
  id:number
  name:string,
  parent?:number
}
export const getAllProvinces = async ():Promise<jobI | Error>=>{
 const response = await api.get("/province")
  return response.data
}
