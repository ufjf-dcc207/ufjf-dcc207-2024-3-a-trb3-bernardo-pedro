import { useState } from 'react';
import ArmasHades from './infernalArms.json';
import './App.css'

function App() {
  const [armaSelecionada, setArmaSelecionada] = useState("Stygian");
  const [imagemArma, setImagemArma] = useState(ArmasHades.Armas[armaSelecionada].img);
  
  // Atualiza a arma selecionada
  function fazMudanca(event) {
    const novaArma = event.target.value;
    setArmaSelecionada(novaArma);
    setImagemArma(ArmasHades.Armas[novaArma].img);
  }

  // Avança para a próxima evolução da arma
  function nextStage():void {
  // Faz o ciclo de update da arma
    switch(imagemArma){
      case ArmasHades.Armas.Stygian.img:
        setImagemArma(ArmasHades.Armas.Stygian.ev1);
        break;
      case ArmasHades.Armas.Stygian.ev1:
        setImagemArma(ArmasHades.Armas.Stygian.ev2)
        break;
      case ArmasHades.Armas.Stygian.ev2:
        setImagemArma(ArmasHades.Armas.Stygian.ev3)
        break;
      case ArmasHades.Armas.Stygian.ev3:
        setImagemArma(ArmasHades.Armas.Stygian.img)
        break;
  }

}
  

  return (
    <>
      <div>Escolha sua arma</div>
      <select name="Arma" id="select" onChange={fazMudanca} value={armaSelecionada}>
        <option value="Stygian">Stygian</option>
        <option value="Varatha">Varatha</option>
        <option value="Aegis">Aegis</option>
        <option value="Coronacht">Coronacht</option>
        <option value="Twin Fists">Twin Fists</option>
        <option value="Exagryph">Exagryph</option>
      </select>
      <div className='imgArma'>
        {imagemArma && <img src={imagemArma} alt={armaSelecionada} />}
      </div>
      <button onClick={nextStage}>Próxima evolução</button>
    </>
  );
}

export default App;
