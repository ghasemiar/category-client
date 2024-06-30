import { deleteData } from 'src/helper/AxiosHelper';
import { useRouter } from 'vue-router';

export const deleteProduct = async (id:number|string)=>{
  const router = useRouter()

  await deleteData('product',id).then(r => console.log(r)).catch(err=>{
    if (err.response.status === 401){
      router.push("/login")
    }
  })
}
