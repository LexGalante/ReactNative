/* eslint-disable no-unused-vars */
/*eslint no-undef: "error"*/
/* eslint-disable max-len */
import moment from 'moment';
import * as Constantes from '../Contantes';

const INITIAL_STATE = {
    escalaGerarInicial: '',
    escalaGerarFinal: '',
    escalaGerarSabado: false,
    escalaGerarDomingo: false,
    escalaGerarTipo: 0,
    escalaGerarHorario: 0,
    escalaGerarLocal: '',
    escalaGerarObservacao: '',
    escalaGerarHorarios: [],
    escalaGerarTipos: [],
    escalaGerarErro: '',
    escalaGerarProgresso: false,
    escalaGerarProgressoHorarios: false,
    escalaGerarProgressoTipos: false,
    escalaGerarDataMinima: moment().format('DD/MM/YYYY'),
    escalaGerarDataMaxima: moment().add(90, 'days').format('DD/MM/YYYY'),
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Constantes.ESCALA_GERAR_PROGRESSO: return { ...state, escalaGerarProgresso: action.payload };
        case Constantes.ESCALA_GERAR_PROGRESSO_HORARIOS: return { ...state, escalaGerarProgressoHorarios: action.payload };
        case Constantes.ESCALA_GERAR_PROGRESSO_TIPOS: return { ...state, escalaGerarProgressoTipos: action.payload };
        case Constantes.ESCALA_GERAR_ERRO: return { ...state, escalaGerarErro: action.payload };
        case Constantes.ESCALA_GERAR_SET_INICIAL: return { ...state, escalaGerarInicial: action.payload };
        case Constantes.ESCALA_GERAR_SET_FINAL: return { ...state, escalaGerarFinal: action.payload };
        case Constantes.ESCALA_GERAR_SET_SABADO: return { ...state, escalaGerarSabado: action.payload };
        case Constantes.ESCALA_GERAR_SET_DOMINGO: return { ...state, escalaGerarDomingo: action.payload };
        case Constantes.ESCALA_GERAR_SET_TIPO: return { ...state, escalaGerarTipo: action.payload };
        case Constantes.ESCALA_GERAR_SET_HORARIO: return { ...state, escalaGerarHorario: action.payload };
        case Constantes.ESCALA_GERAR_SET_LOCAL: return { ...state, escalaGerarLocal: action.payload };
        case Constantes.ESCALA_GERAR_SET_OBSERVACAO: return { ...state, escalaGerarObservacao: action.payload };
        case Constantes.ESCALA_GERAR_TIPOS_SUCESSO: return { ...state, escalaGerarTipos: action.payload, escalaGerarTipo: 1, escalaGerarProgressoTipos: false };
        case Constantes.ESCALA_GERAR_HORARIOS_SUCESSO: return { ...state, escalaGerarHorarios: action.payload, escalaGerarHorario: 1, escalaGerarProgressoHorarios: false };
        case Constantes.ESCALA_GERAR_HORARIOS_ERRO: return { ...state, escalaGerarProgressoHorarios: false, escalaGerarErro: action.payload };
        case Constantes.ESCALA_GERAR_TIPOS_ERRO:
            return {
                ...state,
                escalaGerarProgresso: false,
                escalaGerarProgressoHorarios: false,
                escalaGerarProgressoTipos: false,
                escalaGerarErro: action.payload
            };
        case Constantes.ESCALA_GERAR_SUCESSO: return {
            escalaGerarInicial: '',
            escalaGerarFinal: '',
            escalaGerarSabado: false,
            escalaGerarDomingo: false,
            escalaGerarTipo: 0,
            escalaGerarHorario: 0,
            escalaGerarLocal: '',
            escalaGerarObservacao: '',
            escalaGerarHorarios: [],
            escalaGerarTipos: [],
            escalaGerarErro: '',
            escalaGerarProgresso: false,
            escalaGerarProgressoHorarios: false,
            escalaGerarProgressoTipos: false,
            escalaGerarDataMinima: moment().format('DD/MM/YYYY'),
            escalaGerarDataMaxima: moment().add(90, 'days').format('DD/MM/YYYY'),
        };
        default:
            return state;
    }
};
