import type {Category} from "~/interfaces/categories";

export function useCategories() {

  async function index() {
    const categories = await $fetch('http://localhost:3333/api/categories', {
      credentials: 'include'
    })

    if (categories) return categories
  }

  async function show(id: string) {
    const {data, status} = await useFetch<Category>(`http://localhost:3333/api/categories/${id}`, {
      credentials: 'include'
    })

    if (status.value === "success") {
      return data.value
    }
  }

  async function update(id: string, data: Category) {
    const {data: response, status} = await useFetch<Category>(`http://localhost:3333/api/categories/${id}`, {
      method: 'PATCH',
      body: {
        name: data.name,
        color: data.color,
      },
      credentials: 'include'
    })
  }

  return {
    index,
    show
  }
}
