import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import Book from './Book';
import style from './style/searchPage.module.css';


const SearchPage = () => {

    const [book, setBook] = useState([]);
    const [search, setSearch] = useState('');
    const [numResult, setNumber] = useState(8);
    const [order, setOrder] = useState('relevance');
    const [query, setQuery] = useState({
        'keyWord': search,
        'numberResult': numResult,
        'order': order,
    });

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
            'keyWord': search,
            'numberResult': numResult,
            'order': order,
        })
    }

    const getBooks = () => {

        //const api_key = 'AIzaSyDW9-Nr9q6-DMFJZBytdmr0rYjg2hbxLIQ'; 
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query.keyWord}&maxResults=${query.numberResult}&orderBy=${query.order}`;
        
        axios.get(url)
        .then((res) => {
            setBook(res.data.items)
        })
        .catch((err) => {
            history.replace('/error')
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

            <div className={style.bookList}>
                {book.map((item, index) => (
                <Book 
                key={index}
                title={item.volumeInfo.title}
                authors={item.volumeInfo.authors}
                img={item.volumeInfo.imageLinks !== undefined ? item.volumeInfo.imageLinks.smallThumbnail : '' }
                published={item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate : '' }
                isbn={item.volumeInfo.industryIdentifiers !== undefined ? item.volumeInfo.industryIdentifiers[0].identifier : '404'}
                />
            ))}
            </div>
            


        </div>
    )
}

export default SearchPage;