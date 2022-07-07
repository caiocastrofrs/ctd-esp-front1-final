import "./filtros.css";
import { useEffect, useState } from 'react';
import store from '../../store/index';
import { connect } from 'react-redux';
import { fetchPersonagensStarted, filterPersonagensThunk, fetchPersonagensThunk } from "../../store/actions/personagens.actions";
import { RootState } from '../../types/personagensType';
import { bindActionCreators } from 'redux';

const Filtros = () => {
  const [filterValue, setFilterValue] = useState("");
  
  const handleFilterInput = (e: any) => {
    setFilterValue(e.target.value);
  }

  const limparFiltro = () => {
    setFilterValue("");
    store.dispatch(fetchPersonagensStarted());
    fetchPersonagensThunk()(store.dispatch);
  }
  useEffect(() => {
    store.dispatch(fetchPersonagensStarted());
    filterPersonagensThunk(filterValue)(store.dispatch);

  },[filterValue])

  return (
    <div className="filtros">
      <label htmlFor="nome">Filtrar por nome:</label>
      <input
        type="text"
        placeholder="Rick, Morty, Beth, Alien, ...etc"
        name="nome"
        onChange={handleFilterInput}
        value={filterValue}
      />
      <button className="danger" onClick={limparFiltro}>Limpar filtro</button>
    </div>
  );
};

const MapStateToProps = (state: RootState) => ({
  personagens: state.personagens
})

const MapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ filterPersonagensThunk}, dispatch)
}


export default connect(MapStateToProps, MapDispatchToProps)(Filtros);
