import { useEffect, useState, useRef, useReducer } from "react";
import ArmasHades from "./infernalArms.json";
import "./App.css";
import TitanBlood from "./TitanBlood.tsx";
import EvolucaoButtons from "./EvolucoesBtns.tsx";
import ArmaDisplay from "./ArmaDisplay.tsx";
import ArmasLista from "./ArmasLista.tsx";

//Adiciona tipo chave para o json
export type ArmaKey = keyof typeof ArmasHades.Armas;

//Adiciona tipo para o progresso da arma
type ProgressoArma = {
  nome: string;
  evoAtual: number;
  qntTB: number;
};

//tipo de ação para reducer
type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT"; payload: number }
  | { type: "SET_TB"; payload: number }
  | { type: "RESET" };

//função para reducer
function qntTBReducer(state: number, action: Action): number {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - action.payload;
    case "SET_TB":
      return (state = action.payload);
    case "RESET":
      return 30;
    default:
      return state;
  }
}

function App() {
  //inicializa reducer qtb
  const [quantidadeTitanBlood, dispatch] = useReducer(
    qntTBReducer,
    parseInt(localStorage.getItem("quantidadeTitanBlood") || "30")
  );
  
  //inicializa o estado com o valor salvo no localStorage, se não há, inicializa com valores iniciais
  const [armaSelecionada, setArmaSelecionada] = useState<ArmaKey>(
    (localStorage.getItem("armaSelecionada") as ArmaKey) || "Stygian"
  );
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

  // salva o progresso quando a arma muda
  useEffect(() => {
    const progressoSalvo = progressoArma.find(
      (arma) => arma.nome === armaSelecionada
    );
    if (progressoSalvo != null) {
      setEtapa(progressoSalvo.evoAtual);
      dispatch({ type: "SET_TB", payload: progressoSalvo.qntTB });
    }
  }, [armaSelecionada]);

  // atualiza o progresso arma e salva no localStorage quando etapa, quantidadeTitanBlood ou armaSelecionada mudam
  useEffect(() => {
    const novoProgressoArma = progressoArma.map((arma) => {
      if (arma.nome === armaSelecionada) {
        return {
          ...arma,
          evoAtual: etapa,
          qntTB: quantidadeTitanBlood,
        };
      } else {
        return arma;
      }
    });

    setProgressoArma(novoProgressoArma);

    // salva no localStorage
    localStorage.setItem("armaSelecionada", armaSelecionada);
    localStorage.setItem(
      "quantidadeTitanBlood",
      quantidadeTitanBlood.toString()
    );
    localStorage.setItem("etapa", etapa.toString());
    localStorage.setItem("progressoArma", JSON.stringify(novoProgressoArma));
  }, [etapa, quantidadeTitanBlood, armaSelecionada]);

  // atualiza interface do usuário quando armaSelecionada ou etapa mudam
  useEffect(() => {
    const arma = ArmasHades.Armas[armaSelecionada];
    const evolucoes = [arma.img, arma.ev1, arma.ev2, arma.ev3];
    setImagemArma(evolucoes[etapa]);
  }, [armaSelecionada, etapa]);

  // Atualiza a arma selecionada
  function atualizarArma() {
    // Verifica se o input não está vazio
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      // Armazena o conteúdo do input em variáveis
      const inputValue = inputRef.current.value.trim();
      const armas = Object.keys(ArmasHades.Armas) as ArmaKey[];
      const armasLowerCase = [
        "stygian",
        "varatha",
        "aegis",
        "coronacht",
        "twin fists",
        "exagryph",
      ];

      const evolucaoMatch = inputValue.match(
        /^(.*?)\s*(evolucao1|evolucao2|evolucao3)$/i
      );

      if (evolucaoMatch) {
        const nomeArma = evolucaoMatch[1].trim().toLowerCase();
        const evolucao = evolucaoMatch[2].toLowerCase();

        // Se o nome da arma existe
        if (nomeArma) {
          for (let i = 0; i < armasLowerCase.length; i++) {
            if (nomeArma === armasLowerCase[i]) {
              setArmaSelecionada(armas[i]);
              // Executa a evolução correspondente
              if (evolucao === "evolucao1") {
                fazEvo1();
              } else if (evolucao === "evolucao2") {
                fazEvo2();
              } else if (evolucao === "evolucao3") {
                fazEvo3();
              }
              break;
            }
          }
        } else {
          // Se o nome da arma não foi especificado, aplica a evolução na arma atual
          if (evolucao === "evolucao1") {
            fazEvo1();
          } else if (evolucao === "evolucao2") {
            fazEvo2();
          } else if (evolucao === "evolucao3") {
            fazEvo3();
          }
        }
      }
      // Caso não haja evoluções e sim, apenas o nome da arma
      else if (armasLowerCase.includes(inputValue.toLowerCase())) {
        const novaArma = inputValue.toLowerCase() as ArmaKey;

        for (let i = 0; i < armasLowerCase.length; i++) {
          if (novaArma === armasLowerCase[i]) {
            setArmaSelecionada(armas[i]);
            break;
          }
        }

        // Verifica se a arma já tem progresso salvo
        const progressoExistente = progressoArma.find(
          (arma) => arma.nome === novaArma
        );
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
        console.log("Erro, Input inválido");
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
      dispatch({ type: "RESET" });
    } else {
      if (indexAtual === 0) {
        if (quantidadeTitanBlood < 5) return;
        dispatch({ type: "DECREMENT", payload: 5 });
        setImagemArma(evolucoes[indexAtual + 1]);
        setEtapa(1);
      } else if (indexAtual === 1) {
        if (quantidadeTitanBlood < 15) return;
        dispatch({ type: "DECREMENT", payload: 15 });
        setImagemArma(evolucoes[indexAtual + 1]);
        setEtapa(2);
      } else if (indexAtual === 2) {
        if (quantidadeTitanBlood < 16) return;
        dispatch({ type: "DECREMENT", payload: 16 });
        setImagemArma(evolucoes[indexAtual + 1]);
        setEtapa(3);
      }
    }
  }

  //Funções para evoluções sob demanda
  function fazEvo1() {
    const arma = ArmasHades.Armas[armaSelecionada];
    if (etapa === 0 && quantidadeTitanBlood >= 5) {
      dispatch({ type: "DECREMENT", payload: 5 });
      setEtapa(1);
      setImagemArma(arma.ev1);
    } else if (etapa > 0) {
      setImagemArma(arma.ev1);
    }
  }

  function fazEvo2() {
    const arma = ArmasHades.Armas[armaSelecionada];
    if (etapa <= 1 && quantidadeTitanBlood >= 15) {
      dispatch({ type: "DECREMENT", payload: 15 });
      setEtapa(2);
      setImagemArma(arma.ev2);
    } else if (etapa > 1) {
      setImagemArma(arma.ev2);
    }
  }

  function fazEvo3() {
    const arma = ArmasHades.Armas[armaSelecionada];
    if (etapa <= 2 && quantidadeTitanBlood >= 16) {
      dispatch({ type: "DECREMENT", payload: 16 });
      setEtapa(3);
      setImagemArma(arma.ev3);
    } else if (etapa > 2) {
      setImagemArma(arma.ev3);
    }
  }

  //Adiciona +1 Titan Blood
  function carregaTB() {
    dispatch({ type: "INCREMENT" });
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
    dispatch({ type: "RESET" });
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

    //console.log(progressoArma);
  }

  function mostraBase() {
    setImagemArma(ArmasHades.Armas[armaSelecionada].img);
  }
  return (
    <>
      <input
        type="text"
        ref={inputRef}
        placeholder="Digite aqui o nome da arma"
      />
      <button onClick={atualizarArma}>Executar</button>
      <ArmaDisplay imagemArma={imagemArma} armaSelecionada={armaSelecionada} />
      <EvolucaoButtons
        onMostraBase={mostraBase}
        onFazEvo1={fazEvo1}
        onFazEvo2={fazEvo2}
        onFazEvo3={fazEvo3}
        onCarregaTB={carregaTB}
        onNextStage={nextStage}
        onResetPage={resetPage}
      />
      <TitanBlood
        img="src/assets/Adicionais/Titan_Blood.webp"
        quantidade={quantidadeTitanBlood}
      />
      <ArmasLista />
    </>
  );
}

export default App;
