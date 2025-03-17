type EvolucaoButtonsProps = {
    onMostraBase: () => void;
    onFazEvo1: () => void;
    onFazEvo2: () => void;
    onFazEvo3: () => void;
    onCarregaTB: () => void;
    onNextStage: () => void;
    onResetPage: () => void;
  };
  
  function EvolucaoButtons({
    onMostraBase,
    onFazEvo1,
    onFazEvo2,
    onFazEvo3,
    onCarregaTB,
    onNextStage,
    onResetPage,
  }: EvolucaoButtonsProps) {
    return (
      <div className="btnArea">
        <button onClick={onMostraBase}>Base</button>
        <button onClick={onFazEvo1}>Evolução1</button>
        <button onClick={onFazEvo2}>Evolução2</button>
        <button onClick={onFazEvo3}>Evolução3</button>
        <button onClick={onCarregaTB}>Carregar TB</button>
        <button onClick={onNextStage}>Próxima evolução</button>
        <button onClick={onResetPage}>Reset</button>
      </div>
    );
  }
  
  export default EvolucaoButtons;