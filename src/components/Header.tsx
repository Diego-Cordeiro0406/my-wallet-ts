import { useEffect, useState } from "react"
import { Expense } from "../types/types"
import { useNavigate } from "react-router-dom"

import logo from '../assets/logo_wallet.png'
import profile from '../assets/profile.png'
import coin from '../assets/coin.png'

export default function Header() {
  const navigate = useNavigate()
  const [emailField, setEmailField] = useState<string>('')
  const [total, setTotal] = useState('')
  const emailData = localStorage.getItem('data')
  const expenses = localStorage.getItem('expenses')
  console.log(typeof(emailData))

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
    <section className="flex items-center justify-evenly w-full bg-white h-1/2">
        <div className="flex items-center h-[3.75rem]">
           <img src={logo} alt="logo" />
        </div>
          <div className="flex h-[3.75rem] items-center">
            <img className="size-7" src={coin} alt="coin-icon" />
            <p className="mx-1 font-bold text-[#003BE5]" data-testid="total-field">Total de despesas:</p>
            <p className="text-[#003BE5] mr-1">{`${expenses ? Number(total).toFixed(2) : 0}`}</p>
            <p className="text-[#003BE5]" data-testid="header-currency-field">BRL</p>
          </div>
          <div className="flex h-[3.75rem] items-center">
            <img className="size-7" src={profile} alt="profile-icon" />
            <p
              className="font-bold ml-1 text-[#2FC18C]"
              id="email-field"
              data-testid="email-field"
            >
              {emailField}
            </p>
          </div>
    </section>
  )
}
