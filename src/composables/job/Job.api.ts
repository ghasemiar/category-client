import { api } from 'boot/axios';
export interface jobI {
  id:number
  name:string,
  parent?:number
}
export const getAllJobs = async ():Promise<jobI | Error>=>{
 const response = await api.get("/job")
  return response.data
}
