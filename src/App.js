/* eslint-disable no-unused-vars */
/*eslint no-undef: "error"*/
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import lodash from 'lodash';
import moment from 'moment';
import Rotas from './Rotas';
import * as Constantes from './Contantes';
import reducers from './reducers';

export default class App extends Component {
    componentWillMount() {
        //Rotinas
        AsyncStorage.getItem(Constantes.PREFERENCES_ESCALA_DATAS_MANUAL)
            .then((datasStorage) => {
                const datas = JSON.parse(datasStorage);
                if (datas !== null && datas !== undefined) {
                    const today = moment();
                    let updates = 0;
                    lodash.forEach(datas, (value, key) => {
                        if (today.isAfter(key)) {
                            delete datas[key];
                            updates++;
                        }
                    });
                    if (updates > 0) {
                        AsyncStorage.setItem(Constantes.PREFERENCES_ESCALA_DATAS_MANUAL, JSON.stringify(datas));
                    }
                }
            });
    }

    render() {
        return (
            <Provider
                store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}
            >
                <Rotas />
            </Provider>
        );
    }
}
