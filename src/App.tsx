import { useEffect, useState, useRef, useReducer } from "react";
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

type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT'; payload: number }
  | { type: 'SET_TB'; payload:number}
  | { type: 'RESET' };

function qntTBReducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - action.payload;
    case 'SET_TB':
      return state = action.payload;
    case 'RESET':
      return 30;
    default:
      return state;
  }
}

function App() {
  //inicializa o estado com o valor salvo no localStorage, se não há, inicializa com valores iniciais
  const [armaSelecionada, setArmaSelecionada] = useState<ArmaKey>(
    (localStorage.getItem("armaSelecionada") as ArmaKey) || "Stygian"
  );
  const [quantidadeTitanBlood, dispatch] = useReducer(qntTBReducer, parseInt(localStorage.getItem("quantidadeTitanBlood") || "30"));
  const [etapa, setEtapa] = useState(
    parseInt(localStorage.getItem("etapa") || "0")
  );
  const [imagemArma, setImagemArma] = useState(
    ArmasHades.Armas[armaSelecionada].img
  );
  //inicializa o inputRef
  const inputRef = useRef<HTMLInputElement>(null);

  //inicializa o progressoArma com o valor salvo no localStorage, se não há, inicializa com array vazio
  const [progressoArma, setProgressoArma] = useState<ProgressoArma[]>(() => {
    const savedProgresso = localStorage.getItem("progressoArma");
    return savedProgresso ? JSON.parse(savedProgresso) : [];
  });


  //acha a arma salva e carrega ela, a etapa e a quantidade de Titan Blood salvas no localStorage
  useEffect(() => {
    const progressoSalvo = progressoArma.find((arma) => arma.nome === armaSelecionada);
    if (progressoSalvo != null) {
      setEtapa(progressoSalvo.evoAtual);
      dispatch({ type: 'SET_TB', payload: progressoSalvo.qntTB }); 
    }
  }, [armaSelecionada]);

  //atualiza o progresso da arma quando a etapa ou a quantidade de Titan Blood é alterada em uma arma
  useEffect(() => {
    const novoProgressoArma = [...progressoArma];
  
    for (let i = 0; i < novoProgressoArma.length; i++) {
      if (novoProgressoArma[i].nome === armaSelecionada) {

        novoProgressoArma[i] = {
          ...novoProgressoArma[i], 
          evoAtual: etapa,
          qntTB: quantidadeTitanBlood, 
        };
        break;
      }
    }
    setProgressoArma(novoProgressoArma);
  }, [etapa, quantidadeTitanBlood, armaSelecionada]);

  //quando alguns dos estados abaixo é modificado, salva as alterações destes no localStorage
  useEffect(() => {
    localStorage.setItem("armaSelecionada", armaSelecionada);
    localStorage.setItem(
      "quantidadeTitanBlood",
      quantidadeTitanBlood.toString()
    );
    localStorage.setItem("etapa", etapa.toString());
    localStorage.setItem("progressoArma", JSON.stringify(progressoArma));
  }, [armaSelecionada, quantidadeTitanBlood, etapa, progressoArma]);

  //atualiza interface de usuário para os valores corretos
  useEffect(() => {
    const arma = ArmasHades.Armas[armaSelecionada];
    const evolucoes = [arma.img, arma.ev1, arma.ev2, arma.ev3];
    setImagemArma(evolucoes[etapa]);
  }, [armaSelecionada, etapa]);

  // Atualiza a arma selecionada
  function atualizarArma() {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      const inputValue = inputRef.current.value.trim();
      const armas = Object.keys(ArmasHades.Armas) as ArmaKey[];
  
      if (armas.includes(inputValue as ArmaKey)) {
        const novaArma = inputRef.current.value as ArmaKey;
        setArmaSelecionada(novaArma);
  
        // Verifica se a arma já tem progresso salvo
        const progressoExistente = progressoArma.find((arma) => arma.nome === novaArma);
        if (!progressoExistente) {
          const estadoPA: ProgressoArma = {
            nome: novaArma,
            evoAtual: 0,
            qntTB: quantidadeTitanBlood,
          };
          setProgressoArma((prevProgresso) => [...prevProgresso, estadoPA]);
        }
  
        setImagemArma(ArmasHades.Armas[novaArma].img);
      } else {
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
      dispatch({ type: 'RESET' });
    } else {
      if (indexAtual === 0) {
        if (quantidadeTitanBlood < 5) return;
        dispatch({ type: 'DECREMENT', payload: 5 });
        setImagemArma(evolucoes[indexAtual + 1]);
        setEtapa(1);
      } else if (indexAtual === 1) {
        if (quantidadeTitanBlood < 15) return;
        dispatch({ type: 'DECREMENT', payload: 15 });
        setImagemArma(evolucoes[indexAtual + 1]);
        setEtapa(2);
      } else if (indexAtual === 2) {
        if (quantidadeTitanBlood < 16) return;
        dispatch({ type: 'DECREMENT', payload: 16 });
        setImagemArma(evolucoes[indexAtual + 1]);
        setEtapa(3);
      }
    }
  }

  //Funções para evoluções sob demanda
  function fazEvo1() {
    const arma = ArmasHades.Armas[armaSelecionada];
    if (etapa === 0 && quantidadeTitanBlood >= 5) {
      dispatch({ type: 'DECREMENT', payload: 5 });
      setEtapa(1);
      setImagemArma(arma.ev1);
    } else if (etapa > 0) {
      setImagemArma(arma.ev1);
    }
  }
  
  function fazEvo2() {
    const arma = ArmasHades.Armas[armaSelecionada];
    if (etapa <= 1 && quantidadeTitanBlood >= 15) {
      dispatch({ type: 'DECREMENT', payload: 15 });
      setEtapa(2);
      setImagemArma(arma.ev2);
    } else if (etapa > 1) {
      setImagemArma(arma.ev2);
    }
  }
  
  function fazEvo3() {
    const arma = ArmasHades.Armas[armaSelecionada];
    if (etapa <= 2 && quantidadeTitanBlood >= 16) {
      dispatch({ type: 'DECREMENT', payload: 16 });
      setEtapa(3);
      setImagemArma(arma.ev3);
    } else if (etapa > 2) {
      setImagemArma(arma.ev3);
    }
  }

  //Adiciona +1 Titan Blood
  function carregaTB() {
    dispatch({ type: 'INCREMENT' });
  }

  //volta estados ao inicio e exclui de localStorage
  function resetPage() {
    const QNTtb = 30;
    const EVO = 0;
    const IMG = ArmasHades.Armas[armaSelecionada].img;
  
    const novoProgressoArma = progressoArma.map((arma) => ({
      ...arma,
      evoAtual: EVO,
      qntTB: QNTtb,
    }));
  
    setArmaSelecionada("Stygian");
    dispatch({ type: 'RESET' });
    setEtapa(EVO);
    setImagemArma(IMG);
  
    setProgressoArma(novoProgressoArma);
  
    localStorage.removeItem("armaSelecionada");
    localStorage.removeItem("quantidadeTitanBlood");
    localStorage.removeItem("etapa");
    localStorage.removeItem("progressoArma");
  
    localStorage.setItem("armaSelecionada", armaSelecionada);
    localStorage.setItem("quantidadeTitanBlood", QNTtb.toString());
    localStorage.setItem("etapa", EVO.toString());
    localStorage.setItem("progressoArma", JSON.stringify(novoProgressoArma));
  }

  function mostraBase(){
    setImagemArma(ArmasHades.Armas[armaSelecionada].img);
  }
  return (
    <>
      <div>Escolha sua arma</div>

      <input type="text" ref={inputRef} placeholder="Digite aqui o nome da arma" />
      <button onClick={atualizarArma}>Executar</button>

      <div className="imgArma">
        {imagemArma && <img src={imagemArma} alt={armaSelecionada} />}
      </div>
      <div className="btnArea">
        <button onClick={mostraBase}>Base</button>
        <button onClick={fazEvo1}>Evo1</button>
        <button onClick={fazEvo2}>Evo2</button>
        <button onClick={fazEvo3}>Evo3</button>
        <button onClick={carregaTB}>Carregar TB</button>
        <button onClick={nextStage}>Próxima evolução</button>
        <button onClick={resetPage}>Reset</button>
      </div>
      <TitanBlood
        img="src/assets/Adicionais/Titan_Blood.webp"
        quantidade={quantidadeTitanBlood}
      ></TitanBlood>
    </>
  );
}

export default App;
