import React from 'react';
import {Link} from 'react-router-dom';
import Typewriter from 'typewriter-effect';


import style from './style/homepage.module.css'

const Homepage = () => {

    return(
        <div className={style.homepage}>
            <div>
                <h1 className={style.title}> <Typewriter
                options={{
                    strings: ['Book', 'Stories', 'Adventure', 'Knowledge'],
                    autoStart: true,
                    delay: 50,
                    loop: true,
                  }}
                /> Lovers</h1>
                <p className={style.subtitle}>Creato da amanti della lettura, per amanti della lettura</p>
                <h2 className={style.presentation}> Ricerca il libro che desideri dentro al più grande database di sempre!</h2>
            </div>
            <Link to='/search'> 
                <button className={style.button}>CERCA ORA</button>
            </Link>
        </div>
    )
}

export default Homepage;