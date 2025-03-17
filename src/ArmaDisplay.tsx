type ArmaDisplayProps = {
    imagemArma: string;
    armaSelecionada: string;
  };
  
  function ArmaDisplay({ imagemArma, armaSelecionada }: ArmaDisplayProps) {
    return (
      <div>
        <div>{armaSelecionada}</div>
        <div className="imgArma">
          {imagemArma && <img src={imagemArma} alt={armaSelecionada} />}
        </div>
      </div>
    );
  }
  
  export default ArmaDisplay;