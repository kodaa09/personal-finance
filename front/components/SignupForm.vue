<script setup lang="ts">
import {useForm, useIsFormValid} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/yup';
import * as yup from 'yup';

const endpoint = useRuntimeConfig().public.apiBase
const emits = defineEmits(['update:page'])

const schema = toTypedSchema(yup.object(
    {
      fullName: yup.string().min(4).required(),
      email: yup.string().required().email(),
      password: yup.string().required()
    }
));

const {errors, defineField} = useForm({
  validationSchema: schema,
});

const signupError = useState('loginError', () => '')
const [fullName, fullNameAttrs] = defineField('fullName');
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const isValid = useIsFormValid();

const onSignup = async () => {
  const {status} = await useFetch(`${endpoint}/signup`, {
    method: 'POST',
    body: {
      fullName: fullName.value,
      email: email.value,
      password: password.value
    },
    credentials: 'include'
  })

  if (status.value === 'success') {
    emits('update:page')
  }
}

const updatePage = () => {
  emits('update:page')
}
</script>

<template>
  <UCard class="w-7/12">
    <h1 class="mb-8 text-3xl">Signup</h1>
    <form class="mb-8" @submit.prevent="onSignup">
      <div class="mb-4">
        <UFormGroup label="Name*" class="flex flex-col" for="">
          <UInput class="bg-transparent" type="text" v-model="fullName" v-bind="fullNameAttrs"/>
          <ErrorMessage :message="errors.fullName"/>
        </UFormGroup>
      </div>
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
      <UButton class="w-full justify-center" type="submit" :disabled="!isValid">Signup</UButton>
      <ErrorMessage class="mt-3" :message="signupError"/>
    </form>
    <p class="text-center">Already have an account?
      <button class="underline" @click="updatePage()">Login</button>
    </p>
  </UCard>
</template>

<style scoped>
</style>
