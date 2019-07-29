/* eslint-disable no-unused-vars */
/*eslint camelcase: ["error", {properties: "never"}]*/
/*eslint camelcase: ["error", {ignoreDestructuring: true}]*/
/*eslint camelcase: "ignore"*/
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import lodash from 'lodash';
import {
    PREFERENCES_USUARIO_JSON,    
    ENPOINT_GET_CIDADES,
    ENPOINT_LOGIN,
    AUTENTICACAO_SET_USUARIO,
    AUTENTICACAO_SET_SENHA,
    AUTENTICACAO_SET_CIDADE,
    AUTENTICACAO_CIDADES,
    AUTENTICACAO_CIDADES_ERROR,
    AUTENTICACAO_CIDADES_LOAD,
    AUTENTICACAO_LOGIN_SUCESSO,
    AUTENTICACAO_LOGIN_ERRO,
    AUTENTICACAO_LOGIN_PROGRESSO,
    AUTENTICACAO_PROGRESSO_VIEW
} from '../Contantes';
import { getUrl, getUrlWithQuery } from '../Http';

export const setUsuario = (value) => (
    {
        type: AUTENTICACAO_SET_USUARIO,
        payload: value
    }
);

export const setSenha = (value) => (
    {
        type: AUTENTICACAO_SET_SENHA,
        payload: value
    }
);

export const setCidade = (value) => (
    {
        type: AUTENTICACAO_SET_CIDADE,
        payload: value
    }
);

export const setProgressoView = (value) => (
    {
        type: AUTENTICACAO_PROGRESSO_VIEW,
        payload: value
    }
);

export const getCidades = () => (dispatch) => {
    dispatch({ type: AUTENTICACAO_CIDADES_LOAD });
    axios.get(getUrl(ENPOINT_GET_CIDADES))
        .then((response) => {
            const cidades = lodash.map(response.data, (val, id) => ({ ...val }));
            dispatch({
                type: AUTENTICACAO_CIDADES,
                payload: cidades
            });
        })
        .catch((error) => {
            dispatch({
                type: AUTENTICACAO_CIDADES_ERROR,
                payload: `Erro inesperado ao listar cidades:\n ${error.message}`
            });
        });
};

export const login = ({ id_cidade, usuario, senha }) => (dispatch) => {
    dispatch({ type: AUTENTICACAO_LOGIN_PROGRESSO });
    if(id_cidade === 0 || usuario === '' || senha === '') {
        dispatch({
            type: AUTENTICACAO_LOGIN_ERRO,
            payload: 'Informe usuário senha e cidade!'
        });
    }
    axios.post(getUrlWithQuery(ENPOINT_LOGIN, `cidade=${id_cidade}`), { id_cidade, usuario, senha })
        .then((response) => {    
            const json = {
                usuario,
                senha,
                id_cidade,
                id_guarda: response.data.GUAR_ID_GUARDA,
                matricula: response.data.GUAR_NRO_MATRICULA,
                nome: response.data.GUAR_TX_NOME,
                sexo: response.data.GUAR_SEXO,
                telefone: response.data.GUAR_FONE,
                celular: response.data.GUAR_CELULAR,
                cep: response.data.GUAR_CEP,
                logradouro: response.data.GUAR_ENDERECO,
                bairro: response.data.GUAR_BAIRRO,
                cidade: response.data.GUAR_CIDADE,
                email: response.data.GUAR_EMAIL                
            };
            AsyncStorage.setItem(PREFERENCES_USUARIO_JSON, JSON.stringify(json))
                .then(() => {
                    dispatch({
                        type: AUTENTICACAO_LOGIN_SUCESSO,
                        payload: response.data
                    });
                    Actions.principal();
                })
                .catch((error) => {
                    dispatch({
                        type: AUTENTICACAO_LOGIN_ERRO,
                        payload: `Ocorreu um erro inesperado \n${error.message}`
                    });
                });
        })
        .catch((error) => {
            dispatch({ 
                type: AUTENTICACAO_LOGIN_ERRO,
                payload: `Ocorreu um erro inesperado \n${error.message}`
            });
        });
};
