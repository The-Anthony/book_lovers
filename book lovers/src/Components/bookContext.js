import React, {createContext, useState} from 'react';

export const BookContext = createContext();

export const BookProvider = (props) => {

    const [bookData, setBookData] = useState([]);

    return(
        <BookContext.Provider value={[bookData, setBookData]}>
            {props.children}
        </BookContext.Provider>
    )

}