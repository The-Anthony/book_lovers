import React, {createContext, useState} from 'react';

export const IsbnContext = createContext();

export const IsbnProvider = (props) => {

    const [isbn, setIsbn] = useState('');

    return(
        <IsbnContext.Provider value={[isbn, setIsbn]}>
            {props.children}
        </IsbnContext.Provider>
    )

}

