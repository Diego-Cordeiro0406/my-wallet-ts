import { useEffect, useState } from "react"

export default function WalletForm() {
  const [currencies, setCurrencies] = useState<string[]>([])
  
  useEffect(() => {
    const fetchCurrencies = async() => {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all')
      const jsonData = await response.json()
      const formatedData = Object.keys(jsonData).filter((e) => e !== 'USDT')
      setCurrencies(formatedData)
    }
    fetchCurrencies()
  }, [])
  return (
    <section>
      <form>
        <label htmlFor="value-input">Valor:</label>
        <input id="value-input" name="value" type="text" />
        <label htmlFor="currencies-input">Moeda:</label>
        <select name="currencies" id="currencies-select">
          {
            currencies.map((currencie) => (
              <option value={currencie}>{currencie}</option>
            ))
          }
        </select>
        <label htmlFor="payment-input">Método de pagamento:</label>
        <input id="payment-input" name="payment" type="text" />
        <label htmlFor="category-input">Categoria:</label>
        <select name="categories" id="categories-select">
          <option selected value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <label htmlFor="description-input">Descrição:</label>
        <input id="description-input" name="description" type="text" />
        <button>Adicionar despesa</button>
      </form>
    </section>
  )
}
