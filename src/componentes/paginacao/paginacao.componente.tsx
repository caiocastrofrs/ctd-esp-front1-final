import "./paginacao.css";
import { RootState } from "../../types/personagensType";
import { bindActionCreators } from 'redux';
import store from '../../store/index';
import { connect } from "react-redux";
import { fetchNovaPaginaThunk } from '../../store/actions/personagens.actions';

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

    fetchNovaPaginaThunk(paginacao.next)(store.dispatch)
  }

  const prevPageHandler = () => {
    if(!paginacao.prev) return;

    fetchNovaPaginaThunk(paginacao.prev)(store.dispatch)
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
  return bindActionCreators({fetchNovaPaginaThunk}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Paginacao);
