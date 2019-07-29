/* eslint-disable no-unused-vars */
/*eslint no-undef: "error"*/
/* eslint-disable max-len */
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import lodash from 'lodash';
import { Actions } from 'react-native-router-flux';
import { getUrlWithQuery } from '../Http';
import * as Constantes from '../Contantes';

export const set = (key, value) => (
    {
        type: key,
        payload: value
    }
);

export const getTipos = () => (dispatch) => {
    dispatch({
        type: Constantes.ESCALA_GERAR_PROGRESSO_TIPOS,
        payload: true
    });
    AsyncStorage.getItem(Constantes.PREFERENCES_USUARIO_JSON)
        .then((storage) => {
            const json = JSON.parse(storage);
            const query = `cidade=${json.id_cidade}`;
            const url = getUrlWithQuery(Constantes.ENPOINT_GET_TIPOS, query);
            axios.get(url)
                .then((response) => {
                    const tipos = lodash.map(response.data, (val, id) => ({ ...val }));
                    dispatch({
                        type: Constantes.ESCALA_GERAR_TIPOS_SUCESSO,
                        payload: tipos
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: Constantes.ESCALA_GERAR_TIPOS_ERRO,
                        payload: `Ocorreu um erro inesperado!\n${error.message}`
                    });
                });
        });
};

export const getHorarios = () => (dispatch) => {
    dispatch({
        type: Constantes.ESCALA_GERAR_PROGRESSO_HORARIOS,
        payload: true
    });
    AsyncStorage.getItem(Constantes.PREFERENCES_USUARIO_JSON)
        .then((storage) => {
            const json = JSON.parse(storage);
            const query = `cidade=${json.id_cidade}`;
            const url = getUrlWithQuery(Constantes.ENPOINT_GET_HORARIO, query);
            axios.get(url)
                .then((response) => {
                    const horarios = lodash.map(response.data, (val, id) => ({ ...val }));
                    dispatch({
                        type: Constantes.ESCALA_GERAR_HORARIOS_SUCESSO,
                        payload: horarios
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: Constantes.ESCALA_GERAR_HORARIOS_ERRO,
                        payload: `Ocorreu um erro inesperado!\n${error.message}`
                    });
                });
        });
};

export const gerarEscala = (params) => (dispatch) => {
    dispatch({
        type: Constantes.ESCALA_GERAR_PROGRESSO,
        payload: true
    });
    AsyncStorage.getItem(Constantes.PREFERENCES_USUARIO_JSON)
        .then((storage) => {
            const json = JSON.parse(storage);
            const query = `cidade=${json.id_cidade}&id_guarda=${json.id_guarda}`;
            const url = getUrlWithQuery(Constantes.ENPOINT_BUILD_ESCALAS, query);
            axios.post(url, params)
                .then((response) => {
                    if (response.status) {
                        const datasGeradas = lodash.map(response.data.escalas, (val, id) => ({ ...val }));
                        AsyncStorage.getItem(Constantes.PREFERENCES_ESCALA_DATAS_MANUAL)
                            .then((readerStorage) => {
                                let datas = {};
                                if (readerStorage !== null) {
                                    datas = JSON.parse(readerStorage);
                                }
                                lodash.forEach(datasGeradas, (value, key) => {
                                    datas[value.data] = {
                                        data: value.data,
                                        local: value.local,
                                        observacao: value.observacao,
                                        inicio: value.inicio,
                                        fim: value.fim
                                    };
                                });
                                AsyncStorage.setItem(Constantes.PREFERENCES_ESCALA_DATAS_MANUAL, JSON.stringify(datas))
                                    .then(() => {
                                        setTimeout(() => {
                                            dispatch({ type: Constantes.ESCALA_GERAR_SUCESSO });
                                            Actions.pop();
                                        }, 500);
                                    })
                                    .catch((error) => {
                                        dispatch({
                                            type: Constantes.ESCALA_GERAR_ERRO,
                                            payload: `Ocorreu um erro inesperado!\n${response.message}`
                                        });
                                    });
                            })
                            .catch((error) => {
                                dispatch({
                                    type: Constantes.ESCALA_GERAR_ERRO,
                                    payload: `Ocorreu um erro inesperado!\n${response.message}`
                                });
                            });
                    } else {
                        dispatch({
                            type: Constantes.ESCALA_GERAR_ERRO,
                            payload: `Ocorreu um erro inesperado!\n${response.message}`
                        });
                    }
                })
                .catch((error) => {
                    dispatch({
                        type: Constantes.ESCALA_GERAR_ERRO,
                        payload: `Ocorreu um erro inesperado!\n${error.message}`
                    });
                });
        });
};

