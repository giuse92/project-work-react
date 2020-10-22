import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import SezDettaglio from './SezDettaglio'

const JSONURL = 'https://raw.githubusercontent.com/giuse92/Project-work/json/assets/js/dataApp.json';

const ElencoPerCategoriaHooks = (props) => {
    const [err, setErr] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [json, setJson] = useState([]);
    const [isDivClicked, setIsDivClicked] = useState(false);
    const [getDiv, setGetDiv] = useState([]);
    const [categoryName, setCategoryName] = useState([]);

    const handleClick = (event) => {
        setIsDivClicked(true);
        setGetDiv([...event.currentTarget.children]);
        setCategoryName(event.currentTarget.parentElement.previousElementSibling.textContent)
    }

    useEffect(() => {
        fetch(JSONURL)
        .then(response => response.json())
        .then(result => {
            setIsLoaded(true);
            setJson(result.dettaglio);
        },
        error => {
            setIsLoaded(true);
            setErr(error)
        })
    })

    if (err) {
        return <p>Errore nel caricamento: {err.type}</p>
    } else if (!isLoaded) {
        return <p>In caricamento</p>
    } else {
        return (
            <>
            {
                isDivClicked ?
                <SezDettaglio 
                title={getDiv[2].textContent}
                image={getDiv[0].src}
                backClick={() => {
                    setIsDivClicked(!isDivClicked);
                    setGetDiv([]);
                    setCategoryName([])
                }}
                myJson={json}
                movieCategory={categoryName}
                />
                : null
            }
                <section id="elenco-per-categoria">
                    {json.map((elmt, i) => {
                        return (
                            <div key={`categoria-n-${i}`} className="categoria">
                                <h2 className="nome-categoria">
                                    {elmt.categoria}
                                </h2>
                                <div className="fila-orizz">
                                    {elmt.media.map((obj, index) => {
                                        return (
                                            <div key={`blocco-n-${index}`} className="blocco"
                                                onClick={handleClick}
                                                style={isDivClicked ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}>
                                                <img src={obj.percorsoImg} alt={obj.titolo} />
                                                <span className="stelle">{'⭐'.repeat(obj.stelle)}</span>
                                                <p className="titolo-blocco">{obj.titolo}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </section>
            </>
        )
    }
}

export default ElencoPerCategoriaHooks;