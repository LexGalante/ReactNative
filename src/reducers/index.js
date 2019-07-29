import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import ComunicadoReducer from './ComunicadoReducer';
import AudienciasReducer from './AudienciasReducer';
import PerfilReducer from './PerfilReducer';
import EscalaReducer from './EscalaReducer';
import GerarEscalaReducer from './GerarEscalaReducer';

export default combineReducers({
    AutenticacaoReducer,
    ComunicadoReducer,
    AudienciasReducer,
    PerfilReducer,
    EscalaReducer,
    GerarEscalaReducer
});
