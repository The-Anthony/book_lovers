import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import Book from './Book';
import style from './style/searchPage.module.css';

//Immagine di caricamento
import loading from './style/img/loading.gif';

//Context dove vengono imagazzinati i libri
import { BookContext } from './bookContext';


const SearchPage = () => {

    const [book, setBook] = useContext(BookContext); //Dove andranno i dati dei libri
    const [search, setSearch] = useState(''); //Valore dell'input di ricerca
    const [numResult, setNumber] = useState(8); //Numero di risultati visualizzati
    const [order, setOrder] = useState('relevance'); //Ordine di visualizzazione
    const [query, setQuery] = useState({
        'keyWord': search,
        'numberResult': numResult,
        'order': order,
    }); // Elementi da unire all'url per richiedre i dati all'API

    const [loadingContent, setLoading] = useState('');

    const history = useHistory();

    const updateSearch = (event) => { //Consente la modifica del valore dell'input
        setSearch(event.target.value)
    }

    const updateNum = (event) => { //Consente la modifica del valore dell'input
        setNumber(event.target.value)
    }

    const updateOrder = (event) => { //Consente la modifica del valore dell'input
        setOrder(event.target.value)
    }

    const getSearch = (event) => {
        event.preventDefault();
        setQuery({
            'keyWord': search.trim(),
            'numberResult': numResult,
            'order': order,
        })
    }

    const getBooks = () => {

        setLoading(<div className={style.loadingActive}><img alt='loading gif' src={loading} className={style.loading}/></div>)

        const url = `https://www.googleapis.com/books/v1/volumes?q=${query.keyWord}&maxResults=${query.numberResult}&orderBy=${query.order}`;
        
        axios.get(url)
        .then((res) => {
            setBook(res.data.items);
            setLoading('');
        })
        .catch((err) => {
            history.replace('/error');
            setLoading('');
        })
        
    }

    useEffect(() => {

        if (query.keyWord !== '' || query.numberResult !== 8 || query.order !== 'relevance') {
            getBooks()
        }

    }, [query])

    return(
        <div className={style.page}>

            <h1 className={style.header}>Book lovers</h1>


            <form className={style.form} onSubmit={getSearch}>
                <div className={style.divForm1}>
                    <input 
                        type="text" 
                        name='keyWords' 
                        value={search} 
                        onChange={updateSearch}
                        className={style.textInput}/>

                    <button type="submit" className={style.button}>Cerca</button>  
                </div>
                
                <div className={style.divForm2}>
                    <label className={style.label}>Risultati per pagina:
                        <input 
                            type="number" 
                            name='numResult' 
                            value={numResult} 
                            onChange={updateNum}
                            className={style.numberInput}
                            max='40'
                            min='1'/>
                    </label>
                     
                    <label className={style.label}>
                        Ordina per:
                        <select 
                            name='order' 
                            value={order} 
                            onChange={updateOrder}
                            className={style.orderInput}>
                            <option className={style.option} value="relevance">Rilevanza</option>
                            <option className={style.option} value="newest">Novità</option>
                        </select>
                    </label>
                    
                </div>    
                
            </form>

            <div className={style.loadingDiv}>
                {loadingContent}
            </div>

            <div className={style.bookList}>
                {book !== undefined ? book.map((item, index) => (
                <Book 
                key={index}
                title={item.volumeInfo.title}
                authors={item.volumeInfo.authors}
                img={item.volumeInfo.imageLinks !== undefined ? item.volumeInfo.imageLinks.smallThumbnail : '' }
                published={item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate : '' }
                isbn={item.volumeInfo.industryIdentifiers !== undefined ? item.volumeInfo.industryIdentifiers[0].identifier : '404'}
                />
            )) : history.push('/error')}
            </div>
            


        </div>
    )
}

export default SearchPage;