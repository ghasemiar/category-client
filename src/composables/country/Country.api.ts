import { api } from 'boot/axios';
export interface jobI {
  id:number
  name:string,
  parent?:number
}
export const getAllCountries = async ():Promise<jobI | Error>=>{
 const response = await api.get("/country")
  return response.data
}
