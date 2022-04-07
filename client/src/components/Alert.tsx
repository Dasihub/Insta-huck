import React from 'react';
import'./alert.css'

const Alert: React.FC<{setAlert: (pre: boolean) => void}> = ({setAlert}) => {

    return (
        <>
            <div className="fon"></div>
            <div className="alert">
                <h3>Неверный пароль</h3>
                <p>Введен неверный пароль. Попробуйте ещё раз.</p>
                <br/>
                <div
                    style={{color: '#0095f6', fontWeight: '600', paddingTop: '20px', cursor: 'pointer'}}
                    onClick={setAlert.bind(null, false)}
                >Повторить</div>
            </div>
        </>
    );
}

export default Alert;