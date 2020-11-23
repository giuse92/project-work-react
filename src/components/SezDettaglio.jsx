import React, { Fragment } from 'react';

const SezDettaglio = (props) => {

    return (
        <section id="dettaglio">
            <h1 style={{
                backgroundImage: `linear-gradient(to right, rgba(9, 105, 184, 0.6), rgba(3, 37, 65, 0.6)), \
            url(${props.image})`, backgroundSize: 'cover', backgroundPosition: 'center center'
            }}>
                {props.title}
            </h1>
            {props.myJson
            .filter(obj => obj.categoria === props.movieCategory)
            .map(obj => obj.media
            .filter(movie => movie.titolo === props.title)
            .map((movie, idx) => 
            <Fragment key={`fragment-n-${idx}`}>
            <p>{movie.descrizione}</p>
            <blockquote>
                {movie.recensione}
            </blockquote>
            </Fragment>))}
            <button onClick={props.backClick}>
                BACK
            </button>
        </section>
    )
}

export default SezDettaglio;