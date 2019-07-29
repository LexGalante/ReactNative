/* eslint-disable no-unused-vars */
import { 
    COMUNICADOS_LISTA_PROGRESSO,
    COMUNICADOS_LISTA_ERRO,
    COMUNICADOS_LISTA
} from '../Contantes';


const INITIAL_STATE = {
    comunicados: null,
    comunicado_reducer_erro: '',
    comunicado_reducer_progresso: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMUNICADOS_LISTA:
            return { 
                ...state,
                comunicados: action.payload,
                comunicado_reducer_progresso: false
            };
        case COMUNICADOS_LISTA_PROGRESSO:
            return { 
                ...state,
                comunicado_reducer_progresso: true
            };  
        case COMUNICADOS_LISTA_ERRO:
            return { 
                ...state,
                comunicado_reducer_erro: action.payload,
                comunicado_reducer_progresso: false
            };  
        default:
            return state;
    }
};    
