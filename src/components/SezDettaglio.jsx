import React, { Fragment } from 'react';

//Componente funzionale con uso di Hooks

const SezDettaglio = (props) => {
    const objForCategory = props.myJson.filter(obj => obj.categoria === props.movieCategory);
    const movieForTitle = objForCategory[0].media.filter(obj => obj.titolo === props.title);

    return (
        <section id="dettaglio">
            <h1 style={{
                backgroundImage: `linear-gradient(to right, rgba(9, 105, 184, 0.6), rgba(3, 37, 65, 0.6)), \
            url(${props.image})`, backgroundSize: 'cover', backgroundPosition: 'center center'
            }}>
                {props.title}
            </h1>
            {/*props.myJson
            .filter(obj => obj.categoria === props.movieCategory)
            .map(obj => obj.media 
            .filter(movie => movie.titolo === props.title)
            .map((movie, idx) =>*/
            <Fragment /* key={`fragment-n-${idx}`} */>
            <p>{movieForTitle[0].descrizione}</p>
            <blockquote>
                {movieForTitle[0].recensione}
            </blockquote>
            </Fragment>/*))*/
            }
            <button onClick={props.backClick}>
                BACK
            </button>
        </section>
    )
}

export default SezDettaglio;