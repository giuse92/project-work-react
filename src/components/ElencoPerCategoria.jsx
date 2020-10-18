import React from 'react';

const SezDettaglio = (props) => {

    return (
        <section id="dettaglio">
            <h1 style={{ backgroundImage: `linear-gradient(to right, rgba(9, 105, 184, 0.6), rgba(3, 37, 65, 0.6)), \
            url(${props.image})`, backgroundSize: 'cover', backgroundPosition: 'center center'}}>
               {props.title} 
            </h1>
            <p>{props.description}</p>
            <q style={{fontStyle:"italic", fontWeight: "bold"}}>{props.feedback}</q>
            <button onClick={props.backClick}>
                BACK
            </button>
        </section>
    )
}

class ElencoPerCategoria extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false, 
            json: []
        }
    }

    handleClick = (event) => {
        this.setState({
            isDivClicked: true, //lo state isDivClicked diventa true al momento del click 
                                //su uno dei blocchi dei film e mi permette di gestire
                                //dei condizionali nel render
            getDiv: [...event.currentTarget.children]
        });
    }

    componentDidMount() {//gestisco la promise variando gli state locali (replicato esempio documentazione react)
        fetch('https://raw.githubusercontent.com/giuse92/Project-work/json/assets/js/dataApp.json')
        .then(response => response.json())
        .then(result => {
            this.setState({
                isLoaded: true,
                json: result
            })
        },
        error => {
            this.setState({
                isLoaded:true,
                error
            })
        })
    }

    render() {
        const { error, isLoaded, json} = this.state;
        if (error) {
        return <p>Errore: {error.message}</p>
        } else if (!isLoaded) {
            return <p>In caricamento...</p>
        } else {
            return (
                <>  
                    <section id="elenco-per-categoria">
                        {json.dettaglio.map((elmt, i) => {
                            return (
                                <div key={`categoria-n-${i}`} className="categoria">
                                    <h2 className="nome-categoria">
                                        {elmt.categoria}
                                    </h2>
                                    <div className="fila-orizz">
                                        {elmt.media.map((obj, index) => {
                                            return (
                                                <div key={`blocco-n-${index}`} className="blocco"
                                                    onClick={this.handleClick}
                                                    style={this.state.isDivClicked ? { pointerEvents: 'none' } : { pointerEvents: 'auto' /**/}}>
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
}

export default ElencoPerCategoria;