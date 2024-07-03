import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react"
import { Expense, ExpenseWithoutId } from "../types/types";

type WalletFormProps = {
  addExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense) => void;
  editingExpense: Expense | null;
};

export default function WalletForm({ addExpense, updateExpense, editingExpense  }: WalletFormProps) {
  const [expenseForm, setExpenseForm] = useState<ExpenseWithoutId>({
    value: '',
    payment: 'Dinheiro',
    category: 'Alimentação',
    description: ''
  })

  useEffect(() => {
    if (editingExpense) {
      setExpenseForm({
        description: editingExpense.description,
        category: editingExpense.category,
        payment: editingExpense.payment,
        value: editingExpense.value.toString(),
      })
    }
  }, [editingExpense]);

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setExpenseForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = uuidv4(); // Gera um ID único

    const expense: Expense = {
      id: editingExpense ? editingExpense.id : id,
      description: expenseForm.description,
      category: expenseForm.category,
      payment: expenseForm.payment,
      value: expenseForm.value,
    };
    if (editingExpense) {
      updateExpense(expense)
    } else {
      addExpense(expense);
    }
    setExpenseForm({
      value: '',
      payment: 'Dinheiro',
      category: 'Alimentação',
      description: ''
    });
  };

  return (
    <section className="w-full h-1/2 bg-gray-200/50 rounded-b-xl">
      <form className="h-full" onSubmit={handleSubmit}>
        <div className="w-full h-3/5">
          <label className="font-bold">
            Valor:
            <input
              required
              data-testid="value-input"
              placeholder="ex. 90"
              id="value-input"
              name="value"
              type="number"
              value={expenseForm.value}
              onChange={ handleInputChange }
            />
          </label>
          
          <label className="font-bold">
            Método de pagamento:
            <select
              data-testid="method-input"
              id="payment-input"
              name="payment"
              value={expenseForm.payment}
              onChange={ handleInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
              <option value="Pix">Pix</option>
            </select>
          </label>
          
          <label className="font-bold">
            Categoria:
            <select
              data-testid="tag-input"
              name="category"
              id="categories-select"
              value={expenseForm.category}
              onChange={ handleInputChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          
          <label className="font-bold">
            Descrição:
            <input
              required
              data-testid="description-input"
              placeholder="ex. conta de internet"
              id="description-input"
              name="description"
              type="text"
              value={expenseForm.description}
              onChange={ handleInputChange }
            />
          </label>
        </div>
        
        <div className="flex justify-center items-center w-full h-2/5 bg-white rounded-b-xl">
          <button
            className="
              w-[20.625rem]
              h-10
              rounded
              bg-[#2FC18C]
              font-bold
              text-white
            "
            type="submit"
          >
            {editingExpense ? 'Atualizar Despesa' : 'Adicionar Despesa'}
          </button>
        </div>
      </form>
    </section>
  )
}
