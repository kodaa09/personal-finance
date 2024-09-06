import type {TransactionApi, TransactionBody} from "~/interfaces/transaction";

export function useTransaction() {

  async function index() {
    const transactions = await $fetch('http://localhost:3333/api/transactions', {
      credentials: 'include'
    })

    if (transactions) return transactions
  }

  async function store(body: TransactionBody) {
    const transactions = await $fetch('http://localhost:3333/api/transactions', {
      method: 'POST',
      body,
      credentials: 'include'
    })

    if (transactions) return transactions
  }

  async function show(id: string) {
    const transactions = await $fetch<TransactionApi>(`http://localhost:3333/api/transactions/${id}`, {
      credentials: 'include'
    })

    if (transactions) return transactions
  }

  async function update(id: string, body: TransactionBody) {
    const transactions = await $fetch(`http://localhost:3333/api/transactions/${id}`, {
      method: 'PATCH',
      body,
      credentials: 'include'
    })

    if (transactions) return transactions
  }

  async function destroy(id: string) {
    const transactions = await $fetch(`http://localhost:3333/api/transactions/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })

    if (transactions) return transactions
  }

  return {
    index,
    store,
    show,
    update,
    destroy
  }
}
