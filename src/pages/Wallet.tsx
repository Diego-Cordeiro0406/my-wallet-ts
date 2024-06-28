import { useEffect, useState } from "react"
import Header from "../components/Header"
import WalletForm from "../components/WalletForm"
import { Expense } from "../types/types"

export default function Wallet() {
  const [expensesData, setExpenses] = useState<Expense[]>([])
  useEffect(() => {
    const expenses = localStorage.getItem('expenses')
    if (expenses) {
      const parsed = JSON.parse(expenses)
      setExpenses(parsed)
    }
  }, [])

  const addExpense = (newExpense: Expense) => {
    const updatedExpenses = [...expensesData, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  return (
    <>
      <Header />
      <WalletForm addExpense={addExpense} />
      <section>
      <table className="table-container">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expensesData.map((e) => (
          <tr key={ e.id }>
            <td>{e.description}</td>
            <td>{e.category}</td>
            <td>{e.payment}</td>
            <td>{Number(e.value)}</td>
            <td>Real</td>
            <td>
              <button>Editar</button>
              <button>Excluir</button>
            </td>
          </tr>
        ))}
        </tbody>
        
      </table>
      </section>
    </>
  )
}
