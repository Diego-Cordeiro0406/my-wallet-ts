export type LoginType = {
  email: string,
  password: string
}

export type Expense = {
  id: string
  value: string
  currency: string
  payment: string
  category: string
  description: string
}

export type ExpenseWithoutId = Omit<Expense, 'id'>;