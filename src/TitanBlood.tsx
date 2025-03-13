import "./TitanBlood.css"

interface TitanBloodProps {
  img: string;
  quantidade: number;
}
  
  function TitanBlood({ img, quantidade }: TitanBloodProps) {
    return (
      <>
        <div className="TitanBloodContainer">
          {Array.from({ length: quantidade }).map((_, index) => (
            <div key={index} className="TitanBlood">
              <img key={index} src={img} alt={`Titan Blood index ${index + 1}`}/>
            </div>
          ))}
        </div>
      </>
    );
  }
  
  export default TitanBlood;
  