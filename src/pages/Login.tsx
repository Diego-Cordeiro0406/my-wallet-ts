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

  const handleClick = () => {
    const storage = localStorage.getItem('data')
    if (storage) {
      navigate('/wallet')
    } else {
      localStorage.setItem('data',JSON.stringify(loginData))
      navigate('/wallet')
    }
  }

  return (
    <section>
      <form action="">
        <input
          data-testid="email-input"
          type="text"
          name="email"
          value={loginData.email}
          onChange={ handleInputChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={loginData.password }
          onChange={ handleInputChange }
        />
        <button onClick={ handleClick }>Entrar</button>
      </form>
    </section>
  )
}
