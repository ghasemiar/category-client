import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

export const CreateProfileSchema = toTypedSchema(
  yup.object({
    sex: yup.object().required('sex is required'),
    birthday: yup.string().required(),
    image: yup.mixed(),
    country: yup.object().required('country is required'),
    province: yup.object().required('province is required'),
    city: yup.object().required('city is required'),
    job: yup.object().required('job is required'),
  })
);
