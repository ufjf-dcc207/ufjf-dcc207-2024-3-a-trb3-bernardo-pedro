import { useEffect, useState, useRef } from "react";
import ArmasHades from "./infernalArms.json";
import "./App.css";
import TitanBlood from "./TitanBlood.tsx";

//Adiciona tipo chave para o json
type ArmaKey = keyof typeof ArmasHades.Armas;
//Adiciona tipo para o progresso da arma
type ProgressoArma = {
  nome:string;
  evoAtual: number;
  qntTB:number;
}

function App() {
  //inicializa o estado com o valor salvo no localStorage, se não há, inicializa com valores iniciais
  const [armaSelecionada, setArmaSelecionada] = useState<ArmaKey>(
    (localStorage.getItem("armaSelecionada") as ArmaKey) || "Stygian"
  );
  const [quantidadeTitanBlood, setQuantidadeTitanBlood] = useState(
    parseInt(localStorage.getItem("quantidadeTitanBlood") || "30")
  );
  const [etapa, setEtapa] = useState(
    parseInt(localStorage.getItem("etapa") || "0")
  );
  const [imagemArma, setImagemArma] = useState(
    ArmasHades.Armas[armaSelecionada].img
  );
  //inicializa o inputRef
  const inputRef = useRef<HTMLInputElement>(null);
  //inicializa um vetor vazio de progressoArma para guardar o progresso de cada arma
  const [progressoArma, setProgressoArma] = useState<ProgressoArma[]>([]);
  ///TODO adicionar setProgressoArma em tudo

  //quando alguns dos estados abaixo é modificado, salva as alterações destes no localStorage
  useEffect(() => {
    localStorage.setItem("armaSelecionada", armaSelecionada);
    localStorage.setItem(
      "quantidadeTitanBlood",
      quantidadeTitanBlood.toString()
    );
    localStorage.setItem("etapa", etapa.toString());
    localStorage.setItem("armaSelecionada", progressoArma.toString());
  }, [armaSelecionada, quantidadeTitanBlood, etapa, progressoArma]);

  //atualiza interface de usuário para os valores corretos
  useEffect(() => {
    const arma = ArmasHades.Armas[armaSelecionada];
    const evolucoes = [arma.img, arma.ev1, arma.ev2, arma.ev3];
    setImagemArma(evolucoes[etapa]);
  }, [armaSelecionada, etapa, progressoArma]);

  // Atualiza a arma selecionada
  function atualizarArma() {
    if (inputRef.current && inputRef.current.value.trim() !== "")
    {
      const inputValue = inputRef.current.value.trim();
      const armas = Object.keys(ArmasHades.Armas) as ArmaKey[];

      if (armas.includes(inputValue as ArmaKey)) {
        const novaArma = inputRef.current.value as ArmaKey;
        setArmaSelecionada(novaArma);
        setEtapa(0);
        const estadoPA: ProgressoArma = {
          nome: novaArma,
          evoAtual: etapa,
          qntTB: quantidadeTitanBlood,
        };
        setProgressoArma((prevProgresso) => [...prevProgresso, estadoPA]);
        setImagemArma(ArmasHades.Armas[novaArma].img);
      }
      else{
        console.log("BOMBOCLAT");
      }

    }
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
      } else if (indexAtual === 1) {
        if (quantidadeTitanBlood < 15) return;
        setQuantidadeTitanBlood(quantidadeTitanBlood - 15);
        setImagemArma(evolucoes[indexAtual + 1]);
        setEtapa(2);
      } else if (indexAtual === 2) {
        if (quantidadeTitanBlood < 16) return;
        setQuantidadeTitanBlood(quantidadeTitanBlood - 16);
        setImagemArma(evolucoes[indexAtual + 1]);
        setEtapa(3);
      }
    }
  }

  //Funções para evoluções sob demanda
  function fazEvo1() {
    const arma = ArmasHades.Armas[armaSelecionada];
    if (etapa === 0 && quantidadeTitanBlood >= 5) {
      setQuantidadeTitanBlood(quantidadeTitanBlood - 5);
      setEtapa(1);
      setImagemArma(arma.ev1);
    } else if (etapa > 0) {
      setImagemArma(arma.ev1);
    }
  }
  function fazEvo2() {
    const arma = ArmasHades.Armas[armaSelecionada];
    if (etapa <= 1 && quantidadeTitanBlood >= 15) {
      setQuantidadeTitanBlood(quantidadeTitanBlood - 15);
      setEtapa(2);
      setImagemArma(arma.ev2);
    } else if (etapa > 1) {
      setImagemArma(arma.ev2);
    }
  }
  function fazEvo3() {
    const arma = ArmasHades.Armas[armaSelecionada];
    if (etapa <= 2 && quantidadeTitanBlood >= 16) {
      setQuantidadeTitanBlood(quantidadeTitanBlood - 16);
      setEtapa(3);
      setImagemArma(arma.ev3);
    } else if (etapa > 2) {
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

      <input type="text" ref={inputRef} placeholder="Digite aqui o nome da arma" />
      <button onClick={atualizarArma}>Executar</button>

      {/* <select
        name="Arma"
        id="select"
        onChange={atualizarArma}
        value={armaSelecionada}
      >
        <option value="Stygian">Stygian</option>
        <option value="Varatha">Varatha</option>
        <option value="Aegis">Aegis</option>
        <option value="Coronacht">Coronacht</option>
        <option value="Twin Fists">Twin Fists</option>
        <option value="Exagryph">Exagryph</option>
      </select> */}

      <div className="imgArma">
        {imagemArma && <img src={imagemArma} alt={armaSelecionada} />}
      </div>
      <button onClick={fazEvo1}>Evo1</button>
      <button onClick={fazEvo2}>Evo2</button>
      <button onClick={fazEvo3}>Evo3</button>
      <button onClick={carregaTB}>Carregar TB</button>
      <button onClick={nextStage}>Próxima evolução</button>

      <TitanBlood
        img="src/assets/Adicionais/Titan_Blood.webp"
        quantidade={quantidadeTitanBlood}
      ></TitanBlood>
    </>
  );
}

export default App;
