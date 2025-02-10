import { useState } from 'react';
import ArmasHades from './infernalArms.json';
import './App.css';
import TitanBlood from './TitanBlood.tsx';

// Adiciona tipo chave para o JSON
type ArmaKey = keyof typeof ArmasHades.Armas;

function App() {
  const [armaSelecionada, setArmaSelecionada] = useState<ArmaKey>('Stygian');
  const [imagemArma, setImagemArma] = useState<string>(
    new URL(ArmasHades.Armas[armaSelecionada].img, import.meta.url).href
  );
  const [quantidadeTitanBlood, setQuantidadeTitanBlood] = useState(30);
  const [etapa, setEtapa] = useState(0);

  function atualizarArma(event: React.ChangeEvent<HTMLSelectElement>) {
    const novaArma = event.target.value as ArmaKey;
    setArmaSelecionada(novaArma);
    setEtapa(0);
    setImagemArma(new URL(ArmasHades.Armas[novaArma].img, import.meta.url).href);
  }

  function nextStage() {
    const arma = ArmasHades.Armas[armaSelecionada];
    const evolucoes = [arma.img, arma.ev1, arma.ev2, arma.ev3].map(img => new URL(img, import.meta.url).href);
    const indexAtual = evolucoes.indexOf(imagemArma);

    if (indexAtual === -1 || indexAtual === evolucoes.length - 1) {
      setImagemArma(evolucoes[0]);
      setEtapa(0);
      setQuantidadeTitanBlood(30);
    } else {
      const custos = [5, 15, 16];
      if (quantidadeTitanBlood >= custos[indexAtual]) {
        setQuantidadeTitanBlood(quantidadeTitanBlood - custos[indexAtual]);
        setImagemArma(evolucoes[indexAtual + 1]);
        setEtapa(indexAtual + 1);
      }
    }
  }

  function fazEvolucao(etapaDesejada: number, custo: number, evolucao: string) {
    if (etapa < etapaDesejada && quantidadeTitanBlood >= custo) {
      setQuantidadeTitanBlood(quantidadeTitanBlood - custo);
      setEtapa(etapaDesejada);
    }
    setImagemArma(new URL(evolucao, import.meta.url).href);
  }

  return (
    <>
      <div>Escolha sua arma</div>
      <select name='Arma' id='select' onChange={atualizarArma} value={armaSelecionada}>
        {Object.keys(ArmasHades.Armas).map((arma) => (
          <option key={arma} value={arma}>{arma}</option>
        ))}
      </select>
      <div className='imgArma'>
        {imagemArma && <img src={imagemArma} alt={armaSelecionada} />}
      </div>
      <button onClick={() => fazEvolucao(1, 5, ArmasHades.Armas[armaSelecionada].ev1)}>Evo1</button>
      <button onClick={() => fazEvolucao(2, 15, ArmasHades.Armas[armaSelecionada].ev2)}>Evo2</button>
      <button onClick={() => fazEvolucao(3, 16, ArmasHades.Armas[armaSelecionada].ev3)}>Evo3</button>
      <button onClick={() => setQuantidadeTitanBlood(quantidadeTitanBlood + 1)}>Carregar TB</button>
      <button onClick={nextStage}>Próxima evolução</button>

      <TitanBlood img={new URL('/src/assets/Adicionais/Titan_Blood.webp', import.meta.url).href} quantidade={quantidadeTitanBlood} />
    </>
  );
}

export default App;
