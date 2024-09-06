<script setup lang="ts">
import AddTransaction from "~/components/transactions/AddTransaction.vue";
import {useTransaction} from "~/composables/transactions";
import {useDate} from "~/composables/date";
import UpdateTransaction from "~/components/transactions/UpdateTransaction.vue";

definePageMeta({
  middleware: ["auth"]
})

const columns = [
  {
    key: 'date',
    label: 'Date'
  },
  {
    key: 'description',
    label: 'Description'
  }, {
    key: 'amount',
    label: 'Amount'
  },
  {
    key: 'category',
    label: 'Category'
  },
  {
    key: 'actions',
    label: 'Actions'
  }
]

const modal = useModal()

const items = (row: any) => [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        modal.open(UpdateTransaction,
            {
              id: row.id,
              onSuccess() {
                loadTransactions()
              }
            })
      }
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: async () => {
        await useTransaction().destroy(row.id)
        await loadTransactions()
      }
    }
  ]
]

const transactions = ref<any>(null)
const q = ref('')
const loading = ref(false)

onMounted(async () => {
  await loadTransactions()
})

const formattedTransactions = computed(() => {
  return transactions.value?.map((transaction: any) => {
    return {
      id: transaction.id,
      description: transaction.description,
      amount: {value: transaction.amount, class: transaction.type === 'in' ? '!text-green-400' : '!text-red-400'},
      date: useDate().formateDate(transaction.date),
      category: transaction.category?.name,
      class: transaction.recurrent ? 'bg-slate-800' : '',
    };
  })
})

const filteredRows = computed(() => {
  if (!q.value) {
    return formattedTransactions.value
  }

  return formattedTransactions.value.filter((transaction: any) => {
    return Object.values(transaction).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const onUpdateTransactions = async () => {
  await loadTransactions()
}

const loadTransactions = async () => {
  loading.value = true
  transactions.value = await useTransaction().index();
  loading.value = false
}
</script>

<template>
  <NuxtLayout>
    <div class="flex items-center justify-between mb-8">
      <h2>Transactions</h2>
      <AddTransaction @update:transactions="onUpdateTransactions"/>
    </div>
    <div>
      <div>
        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
          <UInput v-model="q" placeholder="Search transaction..."/>
        </div>
        <UTable
            :rows="filteredRows"
            :columns="columns"
            :loading="loading"
            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
            :progress="{ color: 'primary', animation: 'carousel' }">
          <template #amount-data="{ row }">
            {{ row.amount.value }}
          </template>
          <template #actions-data="{ row }">
            <UDropdown :items="items(row)">
              <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid"/>
            </UDropdown>
          </template>
        </UTable>
      </div>
    </div>
    <UpdateTransaction/>
  </NuxtLayout>
</template>

<style scoped>
.in {
  background-color: red;
}
</style>
