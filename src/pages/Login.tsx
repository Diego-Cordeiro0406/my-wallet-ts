import { useState } from "react"
import { LoginType } from "../types/types"
import { useNavigate } from "react-router-dom";

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
    <section >
      <form onSubmit={ handleLogin }>
        <input
          required
          data-testid="email-input"
          placeholder="E-mail"
          type="text"
          name="email"
          value={loginData.email}
          onChange={ handleInputChange }
        />
        {/* <p>Ex . Joaozinho@email.com</p> */}
        <input
          required
          data-testid="password-input"
          placeholder="Senha"
          type="password"
          name="password"
          value={loginData.password }
          onChange={ handleInputChange }
        />
        <button disabled={!valLogin} type="submit">Entrar</button>
      </form>
    </section>
  )
}
