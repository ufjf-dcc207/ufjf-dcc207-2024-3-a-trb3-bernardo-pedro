import { useState } from 'react';
import ArmasHades from './infernalArms.json';
import './App.css'
import TitanBlood from './TitanBlood.tsx';

//Adiciona tipo chave para o json
type ArmaKey = keyof typeof ArmasHades.Armas;

function App() {
  const [armaSelecionada, setArmaSelecionada] = useState<ArmaKey>("Stygian");
  const [imagemArma, setImagemArma] = useState(ArmasHades.Armas[armaSelecionada].img);
  const [quantidadeTitanBlood, setQuantidadeTitanBlood] = useState(10);
  
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
  
  function fazEvo1(){
    if (quantidadeTitanBlood < 5) return;
    setImagemArma(ArmasHades.Armas[armaSelecionada].ev1);
    setQuantidadeTitanBlood(quantidadeTitanBlood - 5);
  }

  function fazEvo2(){
    if (quantidadeTitanBlood < 15) return;
    setImagemArma(ArmasHades.Armas[armaSelecionada].ev2);
    setQuantidadeTitanBlood(quantidadeTitanBlood - 15);
  }
  
  function fazEvo3(){
    if (quantidadeTitanBlood < 16) return;
    setImagemArma(ArmasHades.Armas[armaSelecionada].ev3);
    setQuantidadeTitanBlood(quantidadeTitanBlood - 16);
  }

  function carregaTB() {
    setQuantidadeTitanBlood(quantidadeTitanBlood + 1);
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
      <button onClick={fazEvo1}>Evo1</button>
      <button onClick={fazEvo2}>Evo2</button>
      <button onClick={fazEvo3}>Evo3</button>
      <button onClick={carregaTB}>Carregar TB</button>
      <button onClick={nextStage}>Próxima evolução</button>

      <TitanBlood img='/ufjf-dcc207-2024-3-a-trb2-trb2-bernardo-pedro/src/assets/Adicionais/Titan_Blood.webp' quantidade={quantidadeTitanBlood}></TitanBlood>
    </>
  );
}

export default App;
