import "./paginacao.css";
import { RootState } from "../../types/personagensType";
import { bindActionCreators } from 'redux';
import store from '../../store/index';
import { connect } from "react-redux";
import { fetchNovaPagina } from '../../store/actions/personagens.actions';
import { useRef } from 'react';

/**
 * Componente que contém os botões para paginar
 *
 * Você deve adicionar as propriedades necessárias para que funcione corretamente
 *
 *
 * @returns Elemento JSX
 */

const Paginacao = () => {
  
  const { paginacao } = store.getState().personagens;

  const nextPageHandler = () => {
    if(!paginacao.next) return;

    fetchNovaPagina(paginacao.next)(store.dispatch)
  }

  const prevPageHandler = () => {
    if(!paginacao.prev) return;

    fetchNovaPagina(paginacao.prev)(store.dispatch)
  }
  return (
    <div className="paginacao">
      <button disabled={!paginacao.prev} onClick={prevPageHandler} className={"primary"}>
        Anterior
      </button>
      <button disabled={!paginacao.next} onClick={nextPageHandler} className={"primary"}>
        Próximo
      </button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  personagens: state.personagens  
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Paginacao);
