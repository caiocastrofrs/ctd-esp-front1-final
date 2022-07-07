import GradePersonagens from "../componentes/personagens/grade-personagens.componente";
import store from '../store/index';
import { connect } from 'react-redux';
import { RootState } from '../types/personagensType';
import { useEffect, useState } from "react";
import { Personagem } from '../types/personagensType'
/**
 * Esta é a página de favoritos. Aqui você deve ver todos os personagens marcados como favoritos
 *
 * Uso:
 * ``` <PaginaFavoritos /> ```
 *
 * @returns Página de favoritos
 */
const PaginaFavoritos = () => {
  const [favPersonagens, setFavPersonagens] = useState<Personagem[]>();
  const { personagens } = store.getState().personagens;


  useEffect(() => {
    let personagensFiltrados = personagens.filter((personagem: Personagem) => personagem.favorito ?? personagem);
    setFavPersonagens(personagensFiltrados);
  },[]);
  
  return (
    <div className="container">
      <div className="actions">
        <h3>Personagens Favoritos</h3>
        <button className="danger">Test Button</button>
      </div>
      <GradePersonagens personagens={favPersonagens}/>
    </div>
  );
};


const MapStateToProps = (state: RootState) => ({
  personagens: state.personagens
})


export default connect(MapStateToProps)(PaginaFavoritos);
