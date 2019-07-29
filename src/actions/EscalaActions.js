import { AsyncStorage } from 'react-native';
import axios from 'axios';
import lodash from 'lodash';
import { getUrlWithQuery } from '../Http';
import * as Constantes from '../Contantes';

export const progressoRefresh = (value) => (
    {
        type: Constantes.ESCALA_PROGRESSO_REFRESH,
        payload: value
    }
);

export const progressoRefreshFinish = () => (
    {
        type: Constantes.ESCALA_PROGRESSO_REFRESH_FIM,
    }
);

export const addEscalaData = (value, key) => (
    {
        type: Constantes.ESCALA_ADD_ESCALA_DATA,
        payload: value,
        key
    }
);

export const getEscala = () => (dispatch) => {
    dispatch({ type: Constantes.ESCALA_PROGRESSO });
    const escalaData = {};
    AsyncStorage.getItem(Constantes.PREFERENCES_ESCALA_DATAS_MANUAL)
        .then((storageDatas) => {
            const datasLocal = JSON.parse(storageDatas);
            lodash.forEach(datasLocal, (value, key) => {
                escalaData[key] = value;
            });
            AsyncStorage.getItem(Constantes.PREFERENCES_USUARIO_JSON)
                .then((storage) => {
                    const json = JSON.parse(storage);
                    const query = `cidade=${json.id_cidade}&id_guarda=${json.id_guarda}`;
                    const url = getUrlWithQuery(Constantes.ENPOINT_GET_ESCALAS, query);
                    axios.get(url)
                        .then((response) => {
                            lodash.forEach(response.data, (value) => {
                                escalaData[value.data] = value;
                            });
                            dispatch({
                                type: Constantes.ESCALA_SUCESSO,
                                payload: escalaData
                            });
                        })
                        .catch((error) => {
                            dispatch({
                                type: Constantes.ESCALA_ERRO,
                                payload: `Ocorreu um erro inesperado \n${error.message}`
                            });
                        });
                });
        });
};
