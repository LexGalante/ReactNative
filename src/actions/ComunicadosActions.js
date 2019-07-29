/* eslint-disable no-unused-vars */
/*eslint camelcase: ["error", {properties: "never"}]*/
/*eslint camelcase: ["error", {ignoreDestructuring: true}]*/
/*eslint camelcase: "ignore"*/
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { getUrlWithQuery } from '../Http';
import {
    PREFERENCES_USUARIO_JSON,
    ENPOINT_GET_COMUNICADOS,
    COMUNICADOS_LISTA,
    COMUNICADOS_LISTA_PROGRESSO,
    COMUNICADOS_LISTA_ERRO 
} from '../Contantes';

export const getComunicados = () => (dispatch) => {
    dispatch({ type: COMUNICADOS_LISTA_PROGRESSO });
    AsyncStorage.getItem(PREFERENCES_USUARIO_JSON)
        .then((storage) => {
            const json = JSON.parse(storage);
            const query = `cidade=${json.id_cidade}&id_guarda=${json.id_guarda}`;
            const url = getUrlWithQuery(ENPOINT_GET_COMUNICADOS, query);
            axios.get(url)
                .then((response) => {
                    dispatch({ 
                        type: COMUNICADOS_LISTA,
                        payload: response.data
                    }); 
                })
                .catch((error) => {
                    dispatch({ 
                        type: COMUNICADOS_LISTA_ERRO,
                        payload: `Ocorreu um erro inesperado \n${error.message}`
                    });
                });
        });
}