import { useEffect, useState } from "react"
import Header from "../components/Header"
import WalletForm from "../components/WalletForm"
import { Expense } from "../types/types"

import edit_icon from "../assets/edit_icon.png"
import delete_icon from "../assets/delete_icon.png"

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
    <section
      className="
        w-screen
        h-screen
        flex
        flex-col
        items-center
        bg-app-background
        bg-cover
        bg-center
      "
    >
      <section className="w-4/5 h-[30.125rem] bg-white rounded-xl z-40">
        <Header />
        <WalletForm
          addExpense={ addExpense }
          updateExpense={ updateExpense }
          editingExpense={editingExpense}
        />
      </section>
      <section
        className="
          flex
          w-11/12
          h-[29rem]
          bg-[#003BE5]
          justify-center
          items-end
          absolute
          z-10
          bottom-40
          rounded-xl
        "
      >
        <table className="table-container border-collapse w-[68.25rem]">
          <thead>
            <tr
              className="
                text-white
                text-center
                border
                border-solid
                border-b-white
                border-t-transparent
                border-l-transparent
                border-r-transparent
              "
            >
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody className="text-center text-[#2FC18C]">
            {expensesData.map((e, index) => (
            <tr
              className={`
                border
                border-solid
                ${index === expensesData.length -1 ? 'border-b-transparent' : 'border-b-[#2FC18C]'}
                border-t-transparent
                border-l-transparent
                border-r-transparent
              `}
              key={ e.id }
            >
              <td>{e.description}</td>
              <td>{e.category}</td>
              <td>{e.payment}</td>
              <td>{Number(e.value).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  className="mr-2"
                  data-testid="edit-btn"
                  onClick={() => startEditing(e) }
                >
                  <img className="size-6" src={edit_icon} alt="edit icon" />
                </button>
                <button
                  data-testid="delete-btn"
                  onClick={() => removeExpense(e.id) }
                >
                  <img className="size-6" src={delete_icon} alt="delete icon" />
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </section>
    </section>
  )
}
