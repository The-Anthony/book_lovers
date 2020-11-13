import React from 'react';

//Stile
import style from './style/pageNotFound.module.css';
// Immagine
import image from './style/img/pageNotFoundImage.svg';

const PageNotFound = () => {
    return(
        <div className={style.pageNFDiv}>
            <div className={style.text}>
            <h1>Cosa stai cercando? Questa pagina <span className={style.emph}>non esiste</span></h1>
            <p>Magari in futuro sarà disponibile, ma purtroppo non oggi.</p>
            </div>
            <button className={style.button}>Torna alla pagina di ricerca</button>
            <img src={image} alt="" className={style.img}/>
        </div>
    )
}

export default PageNotFound;