/* eslint-disable no-unused-vars */
/*eslint no-undef: "error"*/
/* eslint-disable max-len */
import * as Constantes from '../Contantes';
import * as Util from '../Util';

const min = Util.now(Constantes.PATTERN_DATE_TIME);
const max = Util.dateAdd(new Date(min), 30, Constantes.PATTERN_DATE_MATH_DAYS, Constantes.PATTERN_DATE_TIME);

const INITIAL_STATE = {
    escalaMensagem: '',
    escalaDataMin: min,
    escalaDataMax: max,
    escalaMesesPassados: 1,
    escalaMesesFuturo: 3,
    escalaDatas: {},
    escalaProgresso: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Constantes.ESCALA_ADD_ESCALA_DATA:
            const escalaDatas = state.escalaDatas;
            escalaDatas[action.key] = action.payload;
            return {
                ...state,
                escalaDatas
            };
        case Constantes.ESCALA_PROGRESSO_REFRESH:
            return {
                ...state,
                escalaProgresso: true,
                escalaMensagem: action.payload
            };
        case Constantes.ESCALA_PROGRESSO_REFRESH_FIM:
            return {
                ...state,
                escalaProgresso: false,
                escalaMensagem: ''
            };
        case Constantes.ESCALA_PROGRESSO:
            return {
                ...state,
                escalaDatas: {},
                escalaProgresso: true,
                escalaMensagem: 'Buscando registros da escala...',
                escalaDataMin: min,
                escalaDataMax: max
            };
        case Constantes.ESCALA_SUCESSO:
            return {
                ...state,
                escalaProgresso: false,
                escalaMensagem: '',
                escalaDatas: action.payload,
            };
        case Constantes.ESCALA_ERRO:
            return {
                ...state,
                escalaProgresso: false,
                escalaMensagem: action.payload
            };
        default:
            return state;
    }
};
