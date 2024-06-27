import { useEffect, useState } from "react"
import { Expense } from "../types/types"

export default function Header() {
  const [emailField, setEmailField] = useState<string>('')
  const [total, setTotal] = useState('')
  const emailData = localStorage.getItem('data')
  const expenses = localStorage.getItem('expenses')

  useEffect(() => {
    if(emailData && expenses) {
      const parseData = JSON.parse(emailData)
      setEmailField(parseData.email)
      const parsedExpenses = JSON.parse(expenses)
      const totalExpenses = parsedExpenses.reduce((accumulator: number, currentValue: Expense) => {
        return accumulator + Number(currentValue.value);
      }, 0);
      setTotal(totalExpenses)
    }
  }, [emailData, expenses])
  return (
    <section>
      <main>
        <section>
          <div>
            <label htmlFor="email-field">Email</label>
            <p id="email-field" data-testid="email-field">{emailField}</p>
          </div>
          <div>
            <p data-testid="total-field">{`Total de despesas: R$ ${total}`}</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </section>
      </main>
    </section>
  )
}
