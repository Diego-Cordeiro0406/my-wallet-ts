import { useEffect, useState } from "react"
import { Expense } from "../types/types"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate()
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
    if (!emailData) navigate('/login')
  }, [emailData, expenses, navigate])
  return (
    <section>
      <main>
        <section>
          <div>
            <label>
              Email
              <p id="email-field" data-testid="email-field">{emailField}</p>
            </label>
          </div>

          <div>
            <p data-testid="total-field">{`Total de despesas: R$ ${expenses ? total : 0}`}</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </section>
      </main>
    </section>
  )
}
