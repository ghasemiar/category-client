import { api } from 'boot/axios';
export interface jobI {
  id:number
  name:string,
  parent?:number
}
export const getAllCategories = async ():Promise<jobI | Error>=>{
  const response = await api.get("/category")
  return response.data
}
