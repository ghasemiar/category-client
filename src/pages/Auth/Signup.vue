<template>
  <div class="tw-m-10">
    <q-form @submit="onSubmit">
      <q-input class="tw-mt-5"
        v-model="name"
        label="name"
        v-bind="nameAttrs"
      />
      <div>{{ errors.name }}</div>
      <q-input class="tw-mt-5"
        v-model="username"
        label="Username"
        v-bind="usernameAttrs"
      />
      <div>{{ errors.username }}</div>
      <q-input class="tw-mt-5"
        v-model="email"
        label="email"
        v-bind="emailAttrs"
      />
      <div>{{ errors.email }}</div>
      <q-input class="tw-mt-5"
        v-model="phone"
        label="phone"
        v-bind="phoneAttrs"
      />
      <div>{{ errors.phone }}</div>
      <q-input class="tw-mt-5"
        v-model="password"
        label="Password"
        type="password"
        v-bind="passwordAttrs"
      />
      <div>{{ errors.password }}</div>
      <q-input class="tw-mt-5"
        v-model="confirmPassword"
        label="confirmPassword"
        type="password"
        v-bind="passwordAttrs"
      />
      <div>{{ errors.confirmPassword }}</div>
      <q-btn type="submit" label="Sing Up" />
    </q-form>
    <RouterLink class="tw-text-red" to="login">در حال حاضر یک اکانت دارید</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from 'stores/auth.store';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const schema = toTypedSchema(yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .required('Name is required'),
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .required('Username is required'),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, 'Phone number must be only digits')
    .min(10, 'Phone number must be at least 10 digits long')
    .max(15, 'Phone number must be at most 15 digits long')
    .required('Phone number is required'),
  password: yup
    .string()
    .matches(
      passwordRegExp,
      'Password must be at least 8 characters long, contain one uppercase, one lowercase, one number and one special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
}));

const { handleSubmit, errors,defineField } = useForm({
  validationSchema: schema,
});

const [name, nameAttrs] = defineField('name');
const [username, usernameAttrs] = defineField('username');
const [email, emailAttrs] = defineField('email');
const [phone, phoneAttrs] = defineField('phone');
const [password, passwordAttrs] = defineField('password');
const [confirmPassword,confirmPasswordAttrs] = defineField('confirmPassword');

const onSubmit = handleSubmit(async (values) => {
  await authStore.login(values);
  console.log(authStore.isAuthenticated());
  if (authStore.isAuthenticated()) {
    await router.push('/add-post');
  }
});
</script>
