import { useState } from "react"
import { LoginType } from "../types/types"
import { useNavigate } from "react-router-dom";

import logo from '../assets/logoWallet.png'

export default function Login() {
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState<LoginType>({
    email: '',
    password: ''
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = () => {
    const storage = localStorage.getItem('data')
    if (storage) {
      navigate('/wallet')
    } else {
      localStorage.setItem('data',JSON.stringify(loginData))
      navigate('/wallet')
    }
  }
  const valLogin = loginData.email.endsWith('.com') && loginData.password.length > 5
  return (
    <section
      className="
        flex
        items-center
        justify-center
        bg-cover
        bg-center
        bg-login-background
        w-screen
        h-screen
      "
    >
      <form
        onSubmit={ handleLogin }
        className="
          flex
          flex-col
          items-center
          justify-evenly
          bg-white
          w-2/5
          h-[22.25rem]
          rounded-lg
        "
      >
        <img src={logo} alt="logo" />
        <div className="flex flex-col w-4/6">
          <input
            className="
              w-full
              h-10
              text-[#003BE5]
              placeholder:text-[#003BE5]
              focus:outline-none
              focus:border-2
              focus:border-solid
              focus:border-[#003BE5]
              border
              border-solid
              border-[#003BE5]
              rounded-md
              pl-2
            "
            autoComplete="off"
            required
            data-testid="email-input"
            placeholder="E-mail"
            type="text"
            name="email"
            value={loginData.email}
            onChange={ handleInputChange }
          />
          <input
            className="
              w-full
              h-10
              text-[#003BE5]
              placeholder:text-[#003BE5]
              focus:outline-none
              focus:border-2
              focus:border-solid
              focus:border-[#003BE5]
              my-2.5
              border
              border-solid
              border-[#003BE5]
              rounded-md
              pl-2
            "
            required
            data-testid="password-input"
            placeholder="Senha"
            type="password"
            name="password"
            value={loginData.password }
            onChange={ handleInputChange }
          />
          <button
            className="
              w-full
              h-10
              bg-[#003BE5]
              font-bold
              text-white
              disabled:bg-red-600
              hover:bg-[#002aa0]
              rounded-md
              pointer
            "
            disabled={!valLogin}
            type="submit"
          >
            Entrar
          </button>
        </div>
      </form>
    </section>
  )
}
