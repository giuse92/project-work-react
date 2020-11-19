import React from 'react';
import SezDettaglio from './SezDettaglio'

class ElencoPerCategoria extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false, 
            json: [],
            isDivClicked: false,
            getDiv: [],
            categoryName: ''
        }
    }

    handleClick = (event) => {
        this.setState({
            isDivClicked: true, //lo state isDivClicked diventa true al momento del click 
                                //su uno dei blocchi dei film e mi permette di gestire
                                //dei condizionali nel render
            getDiv: [...event.currentTarget.children],
            categoryName: event.currentTarget.parentElement.previousElementSibling.textContent
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
                    {this.state.isDivClicked ? 
                    <SezDettaglio 
                        title={this.state.getDiv[2].textContent}
                        image={this.state.getDiv[0].src}
                        backClick={() => this.setState({
                            isDivClicked: !this.state.isDivClicked,
                            getDiv: [],
                            categoryName: []
                        })}
                        myJson={json.dettaglio}
                        movieCategory={this.state.categoryName}
                    />
                    : null}
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