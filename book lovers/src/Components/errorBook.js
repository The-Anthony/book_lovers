import React from 'react';
import style from './style/errorBook.module.css';
import {Link} from 'react-router-dom';

const errorBook = () => {
    return(
        <div className={style.containerDiv}>

            <div className={style.errorDiv}>
                <h1 className={style.title}>Non riusciamo ad accedere alle informazioni del libro da te selezionato</h1>
                <h4>Chiediamo scusa per il problema</h4>
                <p>Riprova più tardi o seleziona un altro libro</p>
                <Link to='/search'>
                    <button className={style.button}>Ritorna alla pagina di ricerca</button>
                </Link>
                
            </div>
            
        </div>
    )
}

export default errorBook;