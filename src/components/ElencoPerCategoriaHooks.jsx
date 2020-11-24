import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import SezDettaglio from './SezDettaglio'

//Componente funzionale con uso di Hooks

const JSONURL = 'https://raw.githubusercontent.com/giuse92/Project-work/json/assets/js/dataApp.json';

const ElencoPerCategoriaHooks = (props) => {
    //variabili di stato iniziali con useState()
    const [err, setErr] = useState(null);  
    const [isLoaded, setIsLoaded] = useState(false);
    const [json, setJson] = useState([]);
    const [isDivClicked, setIsDivClicked] = useState(false);
    const [getDiv, setGetDiv] = useState([]);
    const [categoryName, setCategoryName] = useState([]);

    //si attiverà all'onClick di uno dei div dei film
    const handleClick = (event) => {
        setIsDivClicked(true);//isDivClicked = true
        setGetDiv([...event.currentTarget.children]);//getDiv = [<img>, <span>, <p>] del target che genera l'evento
        setCategoryName(event.currentTarget.parentElement.previousElementSibling.textContent)//categoryName = nome categoria con il traversing del DOM
    }

    useEffect(() => {//Hook useEffect e fetch del json
        fetch(JSONURL)
        .then(response => response.json())
        .then(result => {
            setIsLoaded(true);//isLoaded = true
            setJson(result.dettaglio);//json =  [{...}, {...}, {...}] direttamente all'array della chiave dettaglio
        },
        error => {
            setIsLoaded(true);
            setErr(error)//in caso di errore, err = {errore}
        })
    }, [isLoaded, json, err])//imposto l'array delle deps

    if (err) {
        return <p style={{textAlign: 'center'}}>Errore nel caricamento</p>
    } else if (!isLoaded) {
        return <p style={{textAlign: 'center'}}>In caricamento</p>
    } else {
        return (
            <>
            {
                isDivClicked ?
                <SezDettaglio 
                title={getDiv[2].textContent} //passo varie props al componente SezDettaglio che mi andrà a costruire il pop-up del film cliccato
                image={getDiv[0].src}         //quando la vaiabile di state isDivClicked = true
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
                    {json.map((elmt, i) => { //ciclo result.dettaglio [] e mi ritorna 3 file, una x categoria, e il relativo nome
                        return (
                            <div key={`categoria-n-${i}`} className="categoria">
                                <h2 className="nome-categoria">
                                    {elmt.categoria}
                                </h2>
                                <div className="fila-orizz">
                                    {elmt.media.map((obj, index) => {//ciclo di result.dettaglio.media [] e mi ritorna l'html di 10 film per ogni categoria
                                        return (
                                            <div key={`blocco-n-${index}`} className="blocco"
                                                onClick={handleClick /*mi serve per il traversing dei blocchi e modificare isDivClicked*/ }
                                                style={isDivClicked ? { pointerEvents: 'none' } : { pointerEvents: 'auto' } /*quando isDivClcked = true, sui div.blocco vietati eventi mouse*/}>
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