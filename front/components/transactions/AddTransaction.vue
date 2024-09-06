<script setup lang="ts">
import {useCategories} from "#imports";

const emits = defineEmits(['update:transactions'])
const isOpen = ref(false)

const categoriesValues = ref<any>([])
const recurrentValues = ['no', 'yes']
const typeValues = ['out', 'in']

const type = ref(typeValues[0])
const recurrent = ref(recurrentValues[0])
const categories = ref<{ value: string, name: string } | undefined>(undefined)
const amount = ref(0)
const description = ref('')
const date = ref('')

onMounted(async () => {
  categoriesValues.value = await useCategories().index();
  categories.value = {value: categoriesValues.value[0].id, name: categoriesValues.value[0].name}
})

const formattedCategories = computed(() => {
  return categoriesValues.value.map((category: any) => {
    return {
      value: category.id,
      name: category.name,
    }
  });
});

const onAddTransaction = async () => {
  const transaction = await useTransaction().store({
    type: type.value,
    amount: amount.value,
    description: description.value,
    date: date.value,
    recurrent: recurrent.value === 'yes',
    categoryId: categories.value ? categories.value.value : '',
  })

  if (transaction) {
    isOpen.value = false
    emits('update:transactions')
  }
}
</script>

<template>
  <div>
    <UButton label="Add New Transaction" @click="isOpen = true"/>
    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3>Add new transaction</h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                     @click="isOpen = false"/>
          </div>
        </template>
        <template #footer>
          <form action="" @submit.prevent="onAddTransaction">
            <UFormGroup class="mb-4" label="Type" required>
              <USelectMenu v-model="type" :options="typeValues" icon="ph:arrows-left-right-light"/>
            </UFormGroup>
            <UFormGroup class="mb-4" label="Amount" required>
              <UInput placeholder="1200" icon="material-symbols:euro" v-model="amount"/>
            </UFormGroup>
            <UFormGroup class="mb-4" label="Description" required>
              <UInput placeholder="Supermarket course" icon="material-symbols:description" v-model="description"/>
            </UFormGroup>
            <UFormGroup class="mb-4" label="Date" required>
              <UInput type="date" icon="material-symbols-light:calendar-today-outline-rounded" v-model="date"/>
            </UFormGroup>
            <UFormGroup class="mb-4" label="Recurrent" required>
              <USelectMenu v-model="recurrent" :options="recurrentValues"
                           icon="material-symbols-light:update"/>
            </UFormGroup>
            <UFormGroup class="mb-8" label="Category" required>
              <USelectMenu v-model="categories" :options="formattedCategories" option-attribute="name"
                           icon="iconamoon:category-light"/>
            </UFormGroup>
            <UButton class="w-full justify-center" type="submit">Add transaction</UButton>
          </form>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
