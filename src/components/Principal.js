import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    ScrollView,
    StatusBar
} from 'react-native';
import FontSize from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';

const menuEscalas = require('../img/menu_escala.png');
const menuAudiencias = require('../img/menu_audiencia.png');
const menuComunicados = require('../img/menu_comunicado.png');
const menuPerfil = require('../img/icone_policia_cap.png');
const fundo = require('../img/fundo.jpg');
const logo = require('../img/logo.png');

class Principal extends Component {
    render() {
        return (
            <View style={styles.principal}>
                <StatusBar hidden />
                <Image
                    style={styles.fundo}
                    source={fundo}
                >
                    <View style={styles.line}>
                        <TouchableHighlight
                            underlayColor='#00897B'
                            style={styles.botaoEscala}
                            onPress={() => Actions.escala()}
                        >
                            <View style={styles.botao}>
                                <Image source={menuEscalas} />
                                <Text style={styles.textoBotao}>Escala</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor='#00897B'
                            style={styles.botaoAudiencias}
                            onPress={() => Actions.audiencias()}
                        >
                            <View style={styles.botao}>
                                <Image source={menuAudiencias} />
                                <Text style={styles.textoBotao}>Audiências</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.line}>
                        <TouchableHighlight
                            underlayColor='#00897B'
                            style={styles.botaoComunicados}
                            onPress={() => Actions.comunicados()}
                        >
                            <View style={styles.botao}>
                                <Image source={menuComunicados} />
                                <Text style={styles.textoBotao}>Comunicados</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor='#00897B'
                            style={styles.botaoOutros}
                            onPress={() => Actions.perfil()}
                        >
                            <View style={styles.botao}>
                                <Image source={menuPerfil} />
                                <Text style={styles.textoBotao}>Perfil</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fundo: {
        flex: 1,
        width: null,
    },
    principal: {
        flex: 1,
        backgroundColor: '#E1F5FE'
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    lineLogo: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30
    },
    botao: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    botaoEscala: {
        flex: 1,
        elevation: 15,
        backgroundColor: '#1A237E',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#00897B',
        borderRadius: 25,
        margin: 25,
        padding: 10
    },
    botaoAudiencias: {
        flex: 1,
        elevation: 15,
        backgroundColor: '#880E4F',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#00897B',
        borderRadius: 25,
        margin: 25,
        padding: 10
    },
    botaoComunicados: {
        flex: 1,
        elevation: 15,
        backgroundColor: '#C51162',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#00897B',
        borderRadius: 25,
        margin: 25,
        padding: 10
    },
    botaoOutros: {
        flex: 1,
        elevation: 15,
        backgroundColor: '#E65100',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#00897B',
        borderRadius: 25,
        margin: 25,
        padding: 10
    },
    textoBotao: {
        color: 'white',
        fontSize: FontSize(2.5),
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 25
    }
});

const mapStateToProps = (state) => (
    {

    }
);

export default connect(mapStateToProps, {})(Principal);
