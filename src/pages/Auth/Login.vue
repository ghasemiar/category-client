<template>
  <div class="tw-m-10">
    <q-form @submit="onSubmit">
      <q-input
        v-model="username"
        label="Username"
        error-message="Please enter a valid username"
        v-bind="usernameAttr"
      />
      <div>{{ errors.username }}</div>
      <q-input
        v-model="password"
        label="Password"
        type="password"
        error-message="Please enter a valid password"
        v-bind="passwordAttr"
      />
      <div>{{ errors.password }}</div>
      <q-btn type="submit" label="Login" />
    </q-form>
    <RouterLink to="register">do not have any account</RouterLink>
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

const schema = toTypedSchema(yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
}));

const { handleSubmit, errors,defineField } = useForm({
  validationSchema: schema,
});

const [username, usernameAttr] = defineField('username');
const [password, passwordAttr] = defineField('password');

const onSubmit = handleSubmit(async (values) => {
  await authStore.login(values);
  console.log(authStore.isAuthenticated());
  if (authStore.isAuthenticated()) {
    await router.push('/add-post');
  }
});
</script>
