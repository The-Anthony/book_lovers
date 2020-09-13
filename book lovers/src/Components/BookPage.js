import React, {useContext, useState, useEffect} from 'react';
import {IsbnContext} from './IsbnContext';
import axios from 'axios'
import style from './style/bookPage.module.css'
const BookPage = () => {
     
    const [book, setBook] = useState([])
    const [isbn, setIsbn] = useContext(IsbnContext);

    const getInformation = () => {
        
        const url = `https://www.googleapis.com/books/v1/volumes?q=+isbn:${isbn}`;

        axios.get(url) 
        .then ((res) => {
            setBook(res.data.items);
        })
        .catch ((err) => {
            console.log('ERRORE ---> ' + err)
        })

    }

    useEffect(() => {
        if (isbn !== '') {
            getInformation()
        }
    }, [isbn])


 
    return (
        <div className={style.bookPage}>
            {book.map((item, index) => (
            <div key={index} className={style.div}>
                <h1 className={style.title}>{item.volumeInfo.title}</h1>
                <div className={style.rowDiv}>
                   <img 
                   className={style.img}
                    src={item.volumeInfo.imageLinks !== undefined ? item.volumeInfo.imageLinks.thumbnail : '' } 
                    alt="Immagine di copertina del libro non disponibile"
                />
                    <div className={style.marginDiv}>
                        <p> <span className={style.blueSpan}>Isbn:</span> {isbn}</p>
                        <h2><span className={style.blueSpan}>Autore:</span> {item.volumeInfo.authors}</h2>
                    </div> 
                </div>
                <div className={style.rowDiv}>
                    <p className={style.description}> 
                        <span className={style.blueSpan}>Descrizione: </span> 
                        {(item.volumeInfo.description !== undefined && item.volumeInfo.description !== '') ? item.volumeInfo.description : 'Descrizione non disponibile' }
                    </p>
                    <div className={style.informationDiv}>
                        <p><span className={style.blueSpan}>Data di pubblicazione: </span>
                            {item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate.slice(0, 10) : 'Informazione non disponibile' }
                        </p>
                        <p>
                            <span className={style.blueSpan}>Numero di pagine: </span> 
                            {item.volumeInfo.pageCount !== undefined ? item.volumeInfo.pageCount : 'Informazione non disponibile'}
                        </p>
                    </div> 
                </div>
                <div className={style.priceDiv}>
                    <p> <span className={style.blueSpan}>Prezzo: </span> 
                        {item.saleInfo.listPrice !== undefined ? (item.saleInfo.listPrice.amount + '€') : 'Informazione non disponibile'}
                    </p>
                    <a className={style.link} target='_blank'
                    href={item.volumeInfo.infoLink !== undefined ? item.volumeInfo.infoLink : ''}>
                        Acquista qui
                    </a> 
                </div>
                
            </div>
        ))}
        </div>
        
    )
}


export default BookPage;
