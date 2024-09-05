<script setup lang="ts">
import {useForm, useIsFormValid} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/yup';
import * as yup from 'yup';
import {useAuth} from "~/store/auth";

const authStore = useAuth();
const emits = defineEmits(['update:page'])

const schema = toTypedSchema(yup.object(
    {
      email: yup.string().required().email(),
      password: yup.string().required()
    }
));

const {errors, defineField} = useForm({
  validationSchema: schema,
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const isValid = useIsFormValid();

const onLogin = async () => {
  await authStore.authenticate(email, password);
}

const updatePage = () => {
  emits('update:page')
}
</script>

<template>
  <UCard class="w-7/12">
    <h1 class="mb-8 text-3xl">Login</h1>
    <form class="mb-8" @submit.prevent="onLogin">
      <div class="mb-4">
        <UFormGroup label="Email*" class="flex flex-col">
          <UInput class="bg-transparent" type="email" v-model="email" v-bind="emailAttrs"/>
          <ErrorMessage :message="errors.email"/>
        </UFormGroup>
      </div>
      <div class="mb-8">
        <UFormGroup label="Password*" class="flex flex-col">
          <UInput type="password" v-model="password" v-bind="passwordAttrs"/>
          <ErrorMessage :message="errors.password"/>
        </UFormGroup>
      </div>
      <UButton class="w-full justify-center" type="submit" :disabled="!isValid">
        Login
      </UButton>
      <ErrorMessage class="mt-3" :message="authStore.loginError"/>
    </form>
    <p class="text-center">Need to create an account?
      <button class="underline" @click="updatePage()">Sign Up</button>
    </p>
  </UCard>
</template>

<style scoped>
</style>
