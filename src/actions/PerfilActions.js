import { AsyncStorage, Alert } from 'react-native';
import axios from 'axios';
import { getUrlWithQuery } from '../Http';
import * as Constantes from '../Contantes';
import { Actions } from 'react-native-router-flux';

export const setPerfilCelular = (value) => (
    {
        type: Constantes.PERFIL_SET_CELULAR,
        payload: value
    }
);

export const setPerfilTelefone = (value) => (
    {
        type: Constantes.PERFIL_SET_TELEFONE,
        payload: value
    }
);

export const setPerfilEmail = (value) => (
    {
        type: Constantes.PERFIL_SET_EMAIL,
        payload: value
    }
);

export const setPerfilCep = (value) => (
    {
        type: Constantes.PERFIL_SET_CEP,
        payload: value
    }
);

export const setPerfilEndereco = (value) => (
    {
        type: Constantes.PERFIL_SET_ENDERECO,
        payload: value
    }
);

export const setPerfilNumero = (value) => (
    {
        type: Constantes.PERFIL_SET_NUMERO,
        payload: value
    }
);

export const setPerfilComplemento = (value) => (
    {
        type: Constantes.PERFIL_SET_COMPLEMENTO,
        payload: value
    }
);

export const setPerfilBairro = (value) => (
    {
        type: Constantes.PERFIL_SET_BAIRRO,
        payload: value
    }
);

export const setPerfilCidade = (value) => (
    {
        type: Constantes.PERFIL_SET_CIDADE,
        payload: value
    }
);

export const getPerfil = () => (dispatch) => {
    dispatch({ type: Constantes.PERFIL_PROGRESSO_DADOS });
    AsyncStorage.getItem(Constantes.PREFERENCES_USUARIO_JSON)
        .then((storage) => {
            const json = JSON.parse(storage);
            const query = `cidade=${json.id_cidade}&id_guarda=${json.id_guarda}`;
            const url = getUrlWithQuery(Constantes.ENPOINT_GET_GUARDA, query);
            axios.get(url)
                .then((response) => {
                    const dados = {
                        id: response.data.GUAR_ID_GUARDA,
                        matricula: response.data.GUAR_NRO_MATRICULA,
                        nome: response.data.GUAR_TX_NOME,
                        apelido: response.data.GUAR_APELIDO,
                        nascimento: response.data.GUAR_DT_NASCIMENTO,
                        sexo: response.data.GUAR_SEXO,
                        cpf: response.data.GUAR_CPF,
                        rg: response.data.GUAR_RG,
                        emissor: response.data.GUAR_ORGAO_EMISSOR,
                        cep: response.data.GUAR_CEP,
                        endereco: response.data.GUAR_ENDERECO,
                        numero: response.data.GUAR_NUMERO,
                        complemento: response.data.GUAR_COMPLEMENTO,
                        bairro: response.data.GUAR_BAIRRO,
                        cidade: response.data.GUAR_CIDADE,
                        celular: response.data.GUAR_CELULAR,
                        telefone: response.data.GUAR_FONE,
                        email: response.data.GUAR_EMAIL
                    };
                    dispatch({
                        type: Constantes.PERFIL_DADOS_SUCESSO,
                        payload: dados
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: Constantes.PERFIL_ERRO,
                        payload: `Ocorreu um erro inesperado \n${error.message}`
                    });
                });
        });
};

export const storePerfil = (dados) => (dispatch) => {
    dispatch({ type: Constantes.PERFIL_PROGRESSO_SALVAR });
    AsyncStorage.getItem(Constantes.PREFERENCES_USUARIO_JSON)
        .then((storage) => {
            let json = JSON.parse(storage);
            const query = `cidade=${json.id_cidade}`;
            const url = getUrlWithQuery(Constantes.ENPOINT_SET_GUARDA, query);
            console.log(url);
            axios.post(url, dados)
                .then((response) => {
                    json.telefone = dados.GUAR_FONE;
                    json.celular = dados.GUAR_CELULAR;
                    json.cep = dados.GUAR_CEP;
                    json.logradouro = dados.GUAR_ENDERECO;
                    json.bairro = dados.GUAR_BAIRRO;
                    json.cidade = dados.GUAR_CIDADE;
                    json.email = dados.GUAR_EMAIL;
                    console.log(response);
                    AsyncStorage.setItem(Constantes.PREFERENCES_USUARIO_JSON, JSON.stringify(json))
                        .then(() => {
                            console.log(json);
                            dispatch({ type: Constantes.PERFIL_SALVAR_SUCESSO });
                            Alert.alert(
                                'Sucesso!',
                                'Registro atualizado com sucesso!',
                                [{ text: 'Ok', onPress: () => Actions.pop() }],
                                { cancelable: false }
                            );
                        })
                        .catch((error) => {
                            console.log(error);
                            dispatch({
                                type: Constantes.PERFIL_ERRO,
                                payload: `Ocorreu um erro inesperado \n${error.message}`
                            });
                        })
                })
                .catch((error) => {
                    console.log(error);
                    dispatch({
                        type: Constantes.PERFIL_ERRO,
                        payload: `Ocorreu um erro inesperado \n${error.message}`
                    });
                });
        })
};    
