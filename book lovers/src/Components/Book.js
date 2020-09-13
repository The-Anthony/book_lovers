import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import style from './style/book.module.css';

import {IsbnContext} from './IsbnContext'

const Book = (props) => {

    const [isbn, setIsbn] = useContext(IsbnContext);

    const newIsbn = () => {
        setIsbn(props.isbn)
    }

    return(
        <div className={style.book}>
            <h1 className={style.title}>
                {props.title.slice(0,24) + '...'} 
            </h1>
            <h3 className={style.author}>di {props.authors}</h3>
            <Link to={'/' + props.isbn}>
                <img src={props.img} alt="Immagine di copertina del libro non disponibile" className={style.image}/>
            </Link>
            <p>Anno di pubblicazione: {props.published.slice(0, 4)}</p>
            <Link to={'/' + props.isbn}>
                <button 
                    className={style.button}
                    onClick={newIsbn}
                    >Scopri di più
                </button>
            </Link>
        </div>
    )
}

export default Book;
