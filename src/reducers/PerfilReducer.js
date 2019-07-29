/* eslint-disable no-unused-vars */
import * as Constantes from '../Contantes';

const INITIAL_STATE = {
    perfilId: '',
    perfilNome: '',
    perfilApelido: '',
    perfilMatricula: '',
    perfilCelular: '',
    perfilTelefone: '',
    perfilEmail: '',
    perfilCep: '',
    perfilEndereco: '',
    perfilNumero: '',
    perfilComplemento: '',
    perfilBairro: '',
    perfilCidade: '',
    progressoPerfilSalvar: false,
    progressoPerfilDados: false,
    perfilErro: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Constantes.PERFIL_SET_CELULAR:
            return {
                ...state,
                perfilCelular: action.payload
            };
        case Constantes.PERFIL_SET_TELEFONE:
            return {
                ...state,
                perfilTelefone: action.payload
            };
        case Constantes.PERFIL_SET_EMAIL:
            return {
                ...state,
                perfilEmail: action.payload
            };
        case Constantes.PERFIL_SET_CEP:
            return {
                ...state,
                perfilCep: action.payload
            };
        case Constantes.PERFIL_SET_ENDERECO:
            return {
                ...state,
                perfilEndereco: action.payload
            };
        case Constantes.PERFIL_SET_NUMERO:
            return {
                ...state,
                perfilNumero: action.payload
            };
        case Constantes.PERFIL_SET_COMPLEMENTO:
            return {
                ...state,
                perfilComplemento: action.payload
            };
        case Constantes.PERFIL_SET_BAIRRO:
            return {
                ...state,
                perfilBairro: action.payload
            };
        case Constantes.PERFIL_SET_CIDADE:
            return {
                ...state,
                perfilCidade: action.payload
            };
        case Constantes.PERFIL_PROGRESSO_DADOS:
            return {
                ...state,
                progressoPerfilDados: true
            };
        case Constantes.PERFIL_PROGRESSO_SALVAR:
            return {
                ...state,
                progressoPerfilSalvar: true
            };
        case Constantes.PERFIL_ERRO:
            return {
                ...state,
                progressoPerfilSalvar: false,
                perfilErro: action.payload
            };
        case Constantes.PERFIL_SALVAR_SUCESSO:
            return INITIAL_STATE;
        case Constantes.PERFIL_DADOS_SUCESSO:
            return {
                ...state,
                perfilId: action.payload.id,
                perfilNome: action.payload.nome,
                perfilApelido: action.payload.apelido,
                perfilMatricula: action.payload.matricula,
                perfilCelular: action.payload.celular,
                perfilTelefone: action.payload.telefone,
                perfilEmail: action.payload.email,
                perfilCep: action.payload.cep,
                perfilEndereco: action.payload.endereco,
                perfilNumero: action.payload.numero,
                perfilComplemento: action.payload.complemento,
                perfilBairro: action.payload.bairro,
                perfilCidade: action.payload.cidade,
                progressoPerfilDados: false
            };
        default:
            return state;
    }
};
