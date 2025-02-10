import { useState } from 'react';
import ArmasHades from './infernalArms.json';
import './App.css'
import TitanBlood from './TitanBlood.tsx';

//Adiciona tipo chave para o json
type ArmaKey = keyof typeof ArmasHades.Armas;

function App() {
  //estado para nome da arma
  const [armaSelecionada, setArmaSelecionada] = useState<ArmaKey>("Stygian");
  //estado para imagem da arma
  const [imagemArma, setImagemArma] = useState(ArmasHades.Armas[armaSelecionada].img);
  //estado para quantidade de sangue
  const [quantidadeTitanBlood, setQuantidadeTitanBlood] = useState(30);
  //estado para controle das evoluções
  const [etapa, setEtapa] = useState(0);
  
  // Atualiza a arma selecionada
  function atualizarArma(event: React.ChangeEvent<HTMLSelectElement>) {
    const novaArma = event.target.value as ArmaKey;;
    setArmaSelecionada(novaArma);
    setEtapa(0);
    setImagemArma(ArmasHades.Armas[novaArma].img);
  }

  // Avança para a próxima evolução da arma
  function nextStage() {
    const arma = ArmasHades.Armas[armaSelecionada];
    const evolucoes = [arma.img, arma.ev1, arma.ev2, arma.ev3];
    const indexAtual = evolucoes.indexOf(imagemArma);

    if (indexAtual === -1 || indexAtual === evolucoes.length - 1) {
      setImagemArma(arma.img);
      setEtapa(0);
      setQuantidadeTitanBlood(30);
    } else {
      if (indexAtual === 0) {
        if (quantidadeTitanBlood < 5) return;
        setQuantidadeTitanBlood(quantidadeTitanBlood - 5);
        setImagemArma(evolucoes[indexAtual + 1]);
        setEtapa(1);
      }
      else if (indexAtual === 1) {
        if (quantidadeTitanBlood < 15) return;
        setQuantidadeTitanBlood(quantidadeTitanBlood - 15);
        setImagemArma(evolucoes[indexAtual + 1]);
        setEtapa(2);
      }
      else if (indexAtual === 2) {
        if (quantidadeTitanBlood < 16) return;
        setQuantidadeTitanBlood(quantidadeTitanBlood - 16);
        setImagemArma(evolucoes[indexAtual + 1]);
        setEtapa(3);
      }
    }
  }
  
  //Funções para evoluções sob demanda
  function fazEvo1() {
    const arma = ArmasHades.Armas[armaSelecionada]
    if (etapa === 0 && quantidadeTitanBlood >= 5 ) {
      setQuantidadeTitanBlood(quantidadeTitanBlood - 5);
      setEtapa(1);
      setImagemArma(arma.ev1);

    }else if(etapa>0){
      setImagemArma(arma.ev1);
    }
  }
  function fazEvo2() {
    const arma = ArmasHades.Armas[armaSelecionada]
    if (etapa <= 1 && quantidadeTitanBlood >= 15 ) {
      setQuantidadeTitanBlood(quantidadeTitanBlood - 15);
      setEtapa(2);
      setImagemArma(arma.ev2);
    }
    else if(etapa>1){
      setImagemArma(arma.ev2);
    }
  }
  function fazEvo3() {
    const arma = ArmasHades.Armas[armaSelecionada]
    if(etapa <= 2 && quantidadeTitanBlood >= 16 ){

      setQuantidadeTitanBlood(quantidadeTitanBlood - 16);
      setEtapa(3);
      setImagemArma(arma.ev3);
    }else if(etapa>2){
      setImagemArma(arma.ev3);
    }

  }

  //Adiciona +1 Titan Blood
  function carregaTB() {
    setQuantidadeTitanBlood(quantidadeTitanBlood + 1);
  }

  return (
    <>
      <div>Escolha sua arma</div>
      <select name="Arma" id="select" onChange={atualizarArma} value={armaSelecionada}>
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
