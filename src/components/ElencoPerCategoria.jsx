import React from 'react';

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
                    {this.state.isDivClicked //quando isDivClicked è true, appare sezione dettaglio
                                            //**inoltre sui div.blocco sono stati annullati gli eventi del pointer
                        ? <section id="dettaglio" >
                            {this.state.getDiv !== undefined && 
                                <h1 style={{
                                    backgroundImage: `linear-gradient(to right, rgba(9, 105, 184, 0.6), rgba(3, 37, 65, 0.6)),
                                    url(${this.state.getDiv[0].src})`, backgroundSize: 'cover', backgroundPosition: 'center center'
                            }}>
                                {this.state.getDiv[2].textContent}
                            </h1>
                            }
                                <button onClick={() => this.setState({
                                //al click del button BACK, isDivClicked viene negato quindi false
                                //section#dettaglio non viene mostrata e **gli eventi pointer ripristinati
                                //getDiv diventa undefined
                                    isDivClicked: !this.state.isDivClicked,
                                    getDiv: undefined
                                })}>
                                BACK
                                </button>
                            </section>
                        : null
                    }
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