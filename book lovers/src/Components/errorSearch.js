import React from 'react';
import style from './style/errorBook.module.css';
import {Link} from 'react-router-dom';

const errorSearch = () => {
    return(
        <div className={style.containerDiv}>

            <div className={style.errorDiv}>
                <h1 className={style.title}>C'è stato un errore nella ricerca dei libri!</h1>
                <h4>Chiediamo scusa per il disagio</h4>
                <p>Assicurati di aver inserito delle parole chiave corrette o riprova più tardi</p>
                <Link to='/search'>
                    <button className={style.button}>Ritorna alla pagina di ricerca</button>
                </Link>
                
            </div>
            
        </div>
    )
}

export default errorSearch;