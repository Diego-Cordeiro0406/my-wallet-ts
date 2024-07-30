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
        <section className="flex flex-col w-full h-3/5 items-center justify-center">
          <div className="flex items-center justify-center w-[50rem]">
            <label className="font-bold text-[#003BE5] w-3/6">
              Descrição
              <input
                className="
                  w-[18.054rem]
                  h-[1.875rem]
                  border
                  border-solid
                  border-[#003BE5]
                  text-[#003BE5]
                  focus:outline-none
                  focus:border-2
                  focus:border-solid
                  focus:border-[#003BE5]
                  rounded-md
                  ml-1
                  pl-1
                  font-normal
                "
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
              <label className="font-bold text-[#003BE5] w-3/6">
              Categoria da despesa
              <select
                className="
                  w-[9.688rem]
                  h-[1.875rem]
                  border
                  border-solid
                  border-[#003BE5]
                  rounded-md
                  text-[#003BE5]
                  placeholder:text-[#003BE5]
                  focus:outline-none
                  focus:border-2
                  focus:border-solid
                  focus:border-[#003BE5]
                  ml-1
                  font-normal
                "
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
          </div>
          <div className="flex items-center justify-center w-[50rem] mt-2">
            <label className="font-bold text-[#003BE5] w-2/5">
              Valor
              <input
                className="
                  w-[9.875rem]
                  h-[1.875rem]
                  border
                  border-solid
                  border-[#003BE5]
                  rounded-md
                  text-[#003BE5]
                  focus:outline-none
                  focus:border-2
                  focus:border-solid
                  focus:border-[#003BE5]
                  ml-1
                  pl-1
                  font-normal
                  "
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
            <label className="font-bold text-[#003BE5] w-3/5">
              Método de pagamento
              <select
                className="
                  w-[14.25rem]
                  h-[1.875rem]
                  border
                  border-solid
                  border-[#003BE5]
                  rounded-md
                  text-[#003BE5]
                  placeholder:text-[#003BE5]
                  focus:outline-none
                  focus:border-2
                  focus:border-solid
                  focus:border-[#003BE5]
                  ml-1
                  font-normal
                "
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
          </div>
        </section>  
        <div className="flex justify-center items-center w-full h-2/5 bg-white rounded-b-xl">
          <button
            className="
              w-[20.625rem]
              h-10
              rounded
              bg-[#2FC18C]
              font-bold
              text-white
              hover:bg-[#229e70]
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
