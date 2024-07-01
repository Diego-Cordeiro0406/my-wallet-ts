import { useEffect, useState } from "react"
import Header from "../components/Header"
import WalletForm from "../components/WalletForm"
import { Expense } from "../types/types"

export default function Wallet() {
  const [expensesData, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

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

  const removeExpense = (id: string) => {
    const updatedExpenses = expensesData.filter((expense) => expense.id !== id)
    setExpenses(updatedExpenses)
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  }

  const updateExpense = (updatedExpense: Expense) => {
    const updatedExpenses = expensesData.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    setEditingExpense(null); // Resetar o estado de edição
  };

  // Função para iniciar a edição de uma despesa
  const startEditing = (expense: Expense) => {
    setEditingExpense(expense);
  };

  return (
    <>
      <Header />
      <WalletForm
        addExpense={addExpense}
        updateExpense={updateExpense}
        editingExpense={editingExpense}
      />
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
            <td>{Number(e.value).toFixed(2)}</td>
            <td>Real</td>
            <td>
              <button
                data-testid="delete-btn"
                onClick={() => startEditing(e) }
              >
                Editar
              </button>
              <button
                data-testid="edit-btn"
                onClick={() => removeExpense(e.id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
        </tbody>
        
      </table>
      </section>
    </>
  )
}
