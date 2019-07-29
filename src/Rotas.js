/* eslint-disable no-unused-vars */
/*eslint no-undef: "error"*/
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';
import {
    Router,
    Scene,
    Stack,
    Actions
} from 'react-native-router-flux';
import { PREFERENCES_USUARIO_JSON } from './Contantes';
import Acesso from './components/Acesso';
import Principal from './components/Principal';
import Audiencias from './components/Audiencias';
import Comunicados from './components/Comunicados';
import Perfil from './components/Perfil';
import Escala from './components/Escala';
import Agenda from './components/Agenda';
import GerarEscala from './components/GerarEscala';

const logout = require('./img/logout.png');
const logo = require('./img/logo.png');

export default class Rotas extends Component {
    appLogo() {
        return (
            <View style={{ alignItems: 'center', marginTop: 26 }}>
                <Image
                    source={logo}
                    style={{ width: 84, height: 27 }}
                />
            </View>
        );
    }

    render() {
        return (
            <Router>
                <Stack key="root">
                    <Scene
                        initial
                        key='acesso'
                        hideNavBar
                        component={Acesso}
                    />
                    <Scene
                        key='principal'
                        renderTitle={() => (
                            <View>
                                <Image
                                    style={{
                                        width: 200,
                                        height: 100,
                                        resizeMode: Image.resizeMode.contain,
                                    }}
                                    source={logo}
                                />
                            </View>
                        )}
                        renderBackButton={() => (
                            <TouchableHighlight
                                underlayColor='#00BFA5'
                                style={{ borderRadius: 50, marginLeft: 5 }}
                                onPress={() => {
                                    AsyncStorage.removeItem(PREFERENCES_USUARIO_JSON)
                                        .then(() => {
                                            Actions.pop();
                                        });
                                }}
                            >
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        resizeMode: Image.resizeMode.contain,
                                    }}
                                    source={logout}
                                />
                            </TouchableHighlight>
                        )}
                        onLeft={this.logout}
                        navigationBarStyle={{ backgroundColor: '#01579B' }}
                        component={Principal}
                    />
                    <Scene
                        key='escala'
                        title='Escala'
                        titleStyle={styles.title}
                        navigationBarStyle={styles.barraEscala}
                        component={Escala}
                    />
                    <Scene
                        key='agenda'
                        title='Agenda'
                        titleStyle={styles.title}
                        navigationBarStyle={styles.barraEscala}
                        component={Agenda}
                        modal
                    />
                    <Scene
                        key='gerarEscala'
                        title='Gerar Escala'
                        titleStyle={styles.title}
                        navigationBarStyle={styles.barraEscala}
                        component={GerarEscala}
                        modal
                    />
                    <Scene
                        key='audiencias'
                        title='Audiências'
                        titleStyle={styles.title}
                        navigationBarStyle={styles.barraAudiencias}
                        component={Audiencias}
                    />
                    <Scene
                        key='comunicados'
                        title='Comunicados'
                        titleStyle={styles.title}
                        navigationBarStyle={styles.barraComunicados}
                        component={Comunicados}
                    />
                    <Scene
                        key='perfil'
                        title='Perfil'
                        titleStyle={styles.title}
                        navigationBarStyle={styles.barraPerfil}
                        component={Perfil}
                    />
                </Stack>
            </Router>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        textAlign: 'center'
    },
    barraPrincipal: {
        flex: 1,
        backgroundColor: '#01579B',
        padding: 10
    },
    barraEscala: {
        backgroundColor: '#1A237E',
    },
    barraAudiencias: {
        backgroundColor: '#880E4F',
    },
    barraComunicados: {
        backgroundColor: '#C51162',
    },
    barraPerfil: {
        backgroundColor: '#E65100',
    }
});
