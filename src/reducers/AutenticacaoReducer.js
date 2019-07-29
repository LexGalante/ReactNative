/* eslint-disable no-unused-vars */
import { 
    AUTENTICACAO_CIDADES,
    AUTENTICACAO_SET_USUARIO,
    AUTENTICACAO_SET_SENHA,
    AUTENTICACAO_SET_CIDADE,
    AUTENTICACAO_CIDADES_ERROR,
    AUTENTICACAO_CIDADES_LOAD,
    AUTENTICACAO_LOGIN_SUCESSO,
    AUTENTICACAO_LOGIN_ERRO,
    AUTENTICACAO_LOGIN_PROGRESSO,
    AUTENTICACAO_PROGRESSO_VIEW
} from '../Contantes';
 
const INITIAL_STATE = {
    usuario: '',
    senha: '',
    id_cidade: 0,
    cidades: [],
    erro: '',
    progresso: false,
    progressoCidades: false,
    progressoView: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTENTICACAO_PROGRESSO_VIEW:
            return { ...state, progressoView: action.payload };
        case AUTENTICACAO_LOGIN_SUCESSO:
            return { ...state, senha: '', erro: '', progresso: false, progressoCidades: false }; 
        case AUTENTICACAO_LOGIN_ERRO:
            return { ...state, erro: action.payload, progresso: false }; 
        case AUTENTICACAO_LOGIN_PROGRESSO:
            return { ...state, progresso: true };
        case AUTENTICACAO_SET_USUARIO:
            return { ...state, usuario: action.payload };
        case AUTENTICACAO_SET_SENHA:
            return { ...state, senha: action.payload };
        case AUTENTICACAO_SET_CIDADE:            
            return { ...state, id_cidade: action.payload };        
        case AUTENTICACAO_CIDADES:
            return { ...state, id_cidade: 1, cidades: action.payload, progressoCidades: false };
        case AUTENTICACAO_CIDADES_ERROR:
            return { ...state, erro: action.payload };    
        case AUTENTICACAO_CIDADES_LOAD:
            return { ...state, progressoCidades: true };    
        default:
            return state;        
    }
};
