// components/ArmasLista.tsx
import ArmasHades from "./infernalArms.json";
import { ArmaKey } from "./App";

function ArmasLista() {
  return (
    <div className="armas-lista">
      <h3>Armas Disponíveis</h3>
      <ul>
        {Object.keys(ArmasHades.Armas).map((arma) => (
          <li key={arma}>{ArmasHades.Armas[arma as ArmaKey].nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default ArmasLista;