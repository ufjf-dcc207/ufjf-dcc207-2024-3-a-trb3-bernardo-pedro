import { useState } from 'react';
import ArmasHades from './infernalArms.json';
import './App.css'

function App() {
  const [armaSelecionada, setArmaSelecionada] = useState("Stygian");
  const [imagemArma, setImagem] = useState(ArmasHades.Armas[armaSelecionada].img);
  
  function fazMudanca(event) {
    const novaArma = event.target.value;
    setArmaSelecionada(novaArma);
    setImagem(ArmasHades.Armas[novaArma].img);
  }

  return (
    <>
      <div>Escolha sua arma</div>
      <select name="Arma" id="select" onChange={fazMudanca} value={armaSelecionada}>
        <option value="Stygian">Stygian</option>
        <option value="Varatha">Varatha</option>
      </select>
      <div className='imgArma'>
        {imagemArma && <img src={imagemArma} alt={armaSelecionada} />}
      </div>
    </>
  );
}

export default App;
