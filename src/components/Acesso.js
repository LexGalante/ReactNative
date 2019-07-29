/* eslint-disable no-unused-vars */
/*eslint no-undef: "error"*/
/* eslint-disable max-len */
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Button,
    Image,
    TextInput,
    StyleSheet,
    Picker,
    StatusBar,
    ActivityIndicator,
    AsyncStorage,
    TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import FontSize from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import validate from 'validate.js';
import { PREFERENCES_USUARIO_JSON } from '../Contantes';
import {
    setUsuario,
    setSenha,
    setCidade,
    setProgressoView,
    getCidades,
    login
} from '../actions/AutenticacaoActions';

const fundo = require('../img/fundo.jpg');
const logo = require('../img/icone_policia_chapeu.png');

class Acesso extends Component {
    constructor(props) {
        super(props);
        this.state = { usuarioError: '', senhaError: '', cidadeError: '' };
    }

    componentWillMount() {
        this.props.getCidades();
    }

    validate() {
        let isValid = true;
        if (validate.isEmpty(this.props.usuario)) {
            isValid = false;
            this.setState({ usuarioError: '*Informe seu usuário!' });
            setTimeout(() => this.setState({ usuarioError: '' }), 3000);
        }
        if (validate.isEmpty(this.props.senha)) {
            isValid = false;
            this.setState({ senhaError: '*Informe sua senha!' });
            setTimeout(() => this.setState({ senhaError: '' }), 3000);
        }
        if (this.props.id_cidade === undefined) {
            isValid = false;
            this.setState({ cidadeError: '*Selecione a cidade' });
            setTimeout(() => this.setState({ cidadeError: '' }), 3000);
        }

        return isValid;
    }

    login() {
        if (this.validate()) {
            const { id_cidade, usuario, senha } = this.props;
            this.props.login({ id_cidade, usuario, senha });
        }
    }

    renderPicker() {
        if (this.props.progressoCidades) {
            return (
                <ActivityIndicator
                    color='#00BFA5'
                    size='large'
                />
            );
        }

        const pickerItems = this.props.cidades.map((item, key) =>
            <Picker.Item key={key} label={item.nome} value={item.id_cidade} />);

        return (
            <Picker
                style={styles.picker}
                selectedValue={this.props.id_cidade}
                onValueChange={(key) => this.props.setCidade(key)}
            >
                {pickerItems}
            </Picker>
        );
    }

    renderButton() {
        if (this.props.progresso) {
            return (
                <ActivityIndicator
                    color='white'
                    size='large'
                />
            );
        }

        return (
            <TouchableHighlight
                underlayColor='#DCE775'
                style={{
                    backgroundColor: '#00BFA5',
                    borderColor: '#1E88E5',
                    borderRadius: 50,
                    marginTop: 30,
                    marginBottom: 5,
                    elevation: 10
                }}
                onPress={() => { this.login(); }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: FontSize(4),
                        color: 'white',
                        margin: 10
                    }}
                >
                    Acessar
                </Text>
            </TouchableHighlight>
        );
    }

    render() {
        if (this.props.progressoView) {
            AsyncStorage.getItem(PREFERENCES_USUARIO_JSON)
                .then((storage) => {
                    this.props.setProgressoView(false);
                    if (storage !== null) {
                        Actions.principal();
                    }
                });
            return (
                <Image
                    style={styles.fundo}
                    source={fundo}
                >
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={styles.titulo}>Processando ...</Text>
                        <ActivityIndicator
                            color='white'
                            size='large'
                        />

                    </View>

                </Image>
            );
        }

        return (
            <ScrollView style={{ backgroundColor: '#0D47A1' }}>
                <StatusBar color='#0D47A1' />
                <View style={{ flex: 1, margin: 15, justifyContent: 'center' }}>
                    <View>
                        <View style={styles.logo}>
                            <Image
                                source={logo}
                                style={styles.logo}
                            />
                            <Text
                                style={{ fontSize: FontSize(4), color: 'white' }}
                            >CCONET
                                <Text style={{ fontSize: FontSize(3), color: '#DCE775', fontWeight: 'bold' }}> Guarda</Text>
                            </Text>
                        </View>
                        <Text style={styles.inputTextError}>{this.state.usuarioError}</Text>
                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholder='Usuário'
                            placeholderTextColor='#BDBDBD'
                            style={styles.input}
                            value={this.props.usuario}
                            onChangeText={(text) => this.props.setUsuario(text)}
                        />
                        <Text style={styles.inputTextError}>{this.state.senhaError}</Text>
                        <TextInput
                            underlineColorAndroid='transparent'
                            secureTextEntry
                            placeholder='Senha'
                            placeholderTextColor='#BDBDBD'
                            style={styles.input}
                            value={this.props.senha}
                            onChangeText={(text) => this.props.setSenha(text)}
                        />
                        <Text style={styles.inputTextError}>{this.state.cidadeError}</Text>
                        <View style={styles.pickerView}>
                            {this.renderPicker()}
                        </View>
                        <Text style={styles.pickerText}>Informe sua Cidade</Text>
                        {this.renderButton()}
                        <Text style={styles.textoErro}>{this.props.erro}</Text>
                    </View>
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    titulo: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 5
    },
    textoErro: {
        color: '#E53935',
        fontSize: 20,
        margin: 10,
        textAlign: 'center'
    },
    pickerText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center'
    },
    input: {
        fontSize: FontSize(3.5),
        color: '#0D47A1',
        borderWidth: 2,
        borderColor: '#1E88E5',
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
        height: 70,
        marginTop: 3,
        marginBottom: 3,
        textAlign: 'center',
        elevation: 10
    },
    inputTextError: {
        color: '#DCE775',
        fontSize: FontSize(2.5),
        textAlign: 'center'
    },
    pickerView: {
        borderWidth: 2,
        borderColor: '#1E88E5',
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
        height: 70,
        marginTop: 3,
        marginBottom: 3,
        elevation: 10
    },
    picker: {
        color: '#01579B'
    },
    logo: {
        alignItems: 'center',
        marginBottom: 25,
    }
});

const mapStateToProps = state => (
    {
        usuario: state.AutenticacaoReducer.usuario,
        senha: state.AutenticacaoReducer.senha,
        id_cidade: state.AutenticacaoReducer.id_cidade,
        cidades: state.AutenticacaoReducer.cidades,
        progresso: state.AutenticacaoReducer.progresso,
        erro: state.AutenticacaoReducer.erro,
        progressoCidades: state.AutenticacaoReducer.progressoCidades,
        progressoView: state.AutenticacaoReducer.progressoView
    }
);

export default connect(mapStateToProps, {
    setUsuario,
    setSenha,
    setCidade,
    setProgressoView,
    getCidades,
    login
})(Acesso);
