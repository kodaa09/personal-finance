<script setup lang="ts">
import type {Transaction} from "~/interfaces/transaction";

const modal = useModal()
const emits = defineEmits(['success'])
const props = defineProps({
  id: String
})

const transaction = ref<Transaction | undefined>(undefined)
const categoriesValues = ref<any>([])
const recurrentValues = ['no', 'yes']
const typeValues = ['out', 'in']

const type = ref(typeValues[0])
const recurrent = ref(recurrentValues[0])
const categories = ref<{ value: string, name: string } | undefined>(undefined)
const amount = ref(0)
const description = ref('')
const date = ref('')
const loading = ref(false)

onMounted(async () => {
  categoriesValues.value = await useCategories().index();
  categories.value = {value: categoriesValues.value[0].id, name: categoriesValues.value[0].name}

  if (props.id) {
    loading.value = true
    transaction.value = await useTransaction().show(props.id)
    affectFormValue()
    loading.value = false
  }
})

const affectFormValue = () => {
  if (transaction.value) {
    type.value = transaction.value.type
    if (transaction.value.recurrent) recurrent.value = 'yes'
    else recurrent.value = 'no'
    amount.value = transaction.value.amount
    description.value = transaction.value.description
    date.value = useDate().formatedISO(transaction.value.date)
    categories.value = {value: transaction.value.category.id, name: transaction.value.category.name}
  }
}

const formattedCategories = computed(() => {
  return categoriesValues.value.map((category: any) => {
    return {
      value: category.id,
      name: category.name,
    }
  });
});

const onUpdate = async () => {
  if (!props.id) return

  await useTransaction().update(props.id, {
    type: type.value,
    amount: amount.value,
    description: description.value,
    date: date.value,
    recurrent: recurrent.value === 'yes',
    categoryId: categories.value ? categories.value.value : '',
  })

  await onSuccess()
}

const onSuccess = async () => {
  emits('success')
  await modal.close()
}
</script>

<template>
  <UModal>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3>Add new transaction</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                   @click="modal.close()"/>
        </div>
      </template>
      <template #footer>
        <form action="" @submit.prevent="onUpdate" v-if="!loading">
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
          <UButton class="w-full justify-center" type="submit">Update transaction</UButton>
        </form>
        <p v-else>loading...</p>
      </template>
    </UCard>
  </UModal>
</template>
