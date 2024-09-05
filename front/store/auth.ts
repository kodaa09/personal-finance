import {defineStore} from "pinia";
import type {Ref} from "vue";

export const useAuth = defineStore('auth', () => {
  const user = useState('user', (): null | loginResponse => null)
  const loginError = useState('loginError', () => null)

  const authenticate = async (email: Ref, password: Ref) => {
    const {data, status, error} = await useFetch<loginResponse>('http://localhost:3333/api/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      },
      credentials: 'include'
    })

    if (status.value === "success") {
      user.value = {
        fullName: data.value?.fullName,
        email: data.value?.email
      }
      await navigateTo('/dashboard')
    } else {
      loginError.value = error?.value?.data.errors[0].message
    }
  }

  return {
    user,
    loginError,
    authenticate
  }

})

interface loginResponse {
  fullName: string | undefined,
  email: string | undefined,
}
