import React from 'react';
import './App.css';
import ElencoPerCategoria from './components/ElencoPerCategoria'

function App() {
  return (
    <>
      <nav>
        <div className="logo"><span role="img" aria-label="emoji cinema" aria-labelledby="&#127909;">&#127909;</span><a href="index.html">Recentz</a><span role="img" aria-label="emoji cinema" aria-labelledby="&#127909;">&#127909;</span></div>
      </nav>
      <section id="introduzione">
        <h1 className="titolo">Benvenuto.</h1>
        <h2 className="sottotitolo">Le migliori recensioni del web suddivise per categoria.</h2>
      </section>
      <ElencoPerCategoria />
      <footer>
        <p>G.I. | 2020 | Recentz: <a href="https://github.com/giuse92/Project-work" target="_blank" rel="noopener noreferrer">Project Work</a></p>
      </footer>
    </>
  );
}

export default App;
