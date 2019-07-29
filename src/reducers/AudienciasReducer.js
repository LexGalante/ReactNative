/* eslint-disable no-unused-vars */
import { 
    AUDIENCIAS_LISTA_PROGRESSO,
    AUDIENCIAS_LISTA_ERRO,
    AUDIENCIAS_LISTA
} from '../Contantes';


const INITIAL_STATE = {
    audiencias: null,
    audiencia_reducer_erro: '',
    audiencia_reducer_progresso: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUDIENCIAS_LISTA:
            return { 
                ...state,
                audiencias: action.payload,
                audiencia_reducer_progresso: false
            };
        case AUDIENCIAS_LISTA_PROGRESSO:
            return { 
                ...state,
                audiencia_reducer_progresso: true
            };  
        case AUDIENCIAS_LISTA_ERRO:
            return { 
                ...state,
                audiencia_reducer_erro: action.payload,
                audiencia_reducer_progresso: false
            };  
        default:
            return state;
    }
};    
