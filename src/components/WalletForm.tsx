import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react"
import { Expense, ExpenseWithoutId } from "../types/types";

export default function WalletForm() {
  const [currencies, setCurrencies] = useState<string[]>([])
  const [expenseForm, setExpenseForm] = useState<ExpenseWithoutId>({
    value: '',
    currency: 'USD',
    payment: 'Dinheiro',
    category: 'Alimentação',
    description: ''
  })
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  
  useEffect(() => {
    const fetchCurrencies = async() => {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all')
      const jsonData = await response.json()
      const formatedData = Object.keys(jsonData).filter((e) => e !== 'USDT')
      setCurrencies(formatedData)
    }
    fetchCurrencies()
  }, [])

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
    const expenseToAdd = { ...expenseForm, id };
    const newExpenses = [...expenses, expenseToAdd];
    setExpenses(newExpenses);
    localStorage.setItem('expenses', JSON.stringify(newExpenses));
    setExpenseForm({
      value: '',
      currency: 'USD',
      payment: 'Dinheiro',
      category: 'Alimentação',
      description: ''
    });
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>
          Valor:
          <input
            data-testid="value-input"
            id="value-input"
            name="value"
            type="number"
            value={expenseForm.value}
            onChange={ handleInputChange }
          />
        </label>
        
        <label>
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            id="currencies-select"
            value={expenseForm.currency}
            onChange={ handleInputChange }
          >
            {
              currencies.map((currencie) => (
                <option key={currencie} value={currencie}>{currencie}</option>
              ))
            }
        </select>
      </label>
        
        <label>
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
        
        <label>
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
        
        <label>
          Descrição:
          <input
            data-testid="description-input"
            id="description-input"
            name="description"
            type="text"
            value={expenseForm.description}
            onChange={ handleInputChange }
          />
        </label>
        
        <button type="submit">Adicionar despesa</button>
      </form>
    </section>
  )
}
