import React from 'react';
import "../translations/i18next";
import { useTranslation } from 'react-i18next';


//connects with LDAP server to check login details and assign privileges

const Login = () => {
    const { t, i18n } = useTranslation(['login']);

    const selectEng = () => {
        i18n.changeLanguage('en')

    }
    const selectFi = () => {
        i18n.changeLanguage('fi')

    }

    return (
        <div className="Login">
            <h1>{t('loginTitle')}</h1>
            <div><button onClick={selectEng}>EN</button><button onClick={selectFi}>FI</button></div>
            <div>
                <form>
                    <label htmlFor='email'>{t('email')}</label>
                    <input name="email" id="email"></input>
                    <label htmlFor='password'>{t('password')}</label>
                    <input name="password" id="password"></input>
                    <button></button>
                </form>

            </div>




        </div>
    );
};

export default Login;