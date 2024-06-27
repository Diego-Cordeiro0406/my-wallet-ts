import Header from "../components/Header"
import WalletForm from "../components/WalletForm"

export default function Wallet() {
  return (
    <>
      <Header />
      <WalletForm />
      <section>
      <table className="table-container">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        {/* {expenses.map((e) => (
          <tr key={ e.id }>
            <td>{e.description}</td>
            <td>{e.tag}</td>
            <td>{e.method}</td>
            <td>{this.numberConverter(e.value)}</td>
            <td>{e.exchangeRates[e.currency].name.split('/')[0]}</td>
            <td>{this.numberConverter(e.exchangeRates[e.currency].ask)}</td>
            <td>
              {this.numberConverter(e.value * e.exchangeRates[e.currency].ask)}
            </td>
            <td>Real</td>
            <td>
              <button>Editar</button>
              <button>Excluir</button>
            </td>
          </tr>
        ))} */}
      </table>
      </section>
    </>
  )
}
