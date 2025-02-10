import { useState } from 'react';
import ArmasHades from './infernalArms.json';
import './App.css'

type ArmaKey = keyof typeof ArmasHades.Armas;

function App() {
  const [armaSelecionada, setArmaSelecionada] = useState<ArmaKey>("Stygian");
  const [imagemArma, setImagemArma] = useState(ArmasHades.Armas[armaSelecionada].img);
  
  // Atualiza a arma selecionada
  function fazMudanca(event: React.ChangeEvent<HTMLSelectElement>) {
    const novaArma = event.target.value as ArmaKey;;
    setArmaSelecionada(novaArma);
    setImagemArma(ArmasHades.Armas[novaArma].img);
  }

  // Avança para a próxima evolução da arma
  function nextStage() {
    const arma = ArmasHades.Armas[armaSelecionada];

    if (!arma) return;

    const evolucoes = [arma.img, arma.ev1, arma.ev2, arma.ev3];
    const indexAtual = evolucoes.indexOf(imagemArma);

    // Avança no ciclo ou volta para o início
    if (indexAtual === -1 || indexAtual === evolucoes.length - 1) {
      setImagemArma(arma.img);
    } else {
      setImagemArma(evolucoes[indexAtual + 1]);
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
