/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ActivityIndicator,
    Button
} from 'react-native';
import { connect } from 'react-redux';
import {
    getPerfil,
    storePerfil,
    setPerfilCelular,
    setPerfilTelefone,
    setPerfilEmail,
    setPerfilCep,
    setPerfilEndereco,
    setPerfilNumero,
    setPerfilComplemento,
    setPerfilBairro,
    setPerfilCidade
} from '../actions/PerfilActions';

class Perfil extends Component {
    componentWillMount() {
        this.props.getPerfil();
    }

    store() {
        const perfil = {
            GUAR_ID_GUARDA: this.props.perfilId,
            GUAR_CEP: this.props.perfilCep,
            GUAR_ENDERECO: this.props.perfilEndereco,
            GUAR_NUMERO: this.props.perfilNumero,
            GUAR_COMPLEMENTO: this.props.perfilComplemento,
            GUAR_BAIRRO: this.props.perfilBairro,
            GUAR_CIDADE: this.props.perfilCidade,
            GUAR_CELULAR: this.props.perfilCelular,
            GUAR_FONE: this.props.perfilTelefone,
            GUAR_EMAIL: this.props.perfilEmail,
        };
        this.props.storePerfil(perfil);
    }

    renderButton() {
        if (this.props.progressoPerfilSalvar) {
            return (
                <ActivityIndicator
                    color='#E65100'
                    size='large'
                />
            );
        }

        return (
            <Button
                title='Salvar'
                color='#00BFA5'
                onPress={() => { this.store(); }}
            />
        );
    }

    render() {
        if (this.props.progressoPerfilDados) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        color='#E65100'
                        size='large'
                    />
                </View>
            );
        }

        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, paddingTop: 15 }}>
                    <TextInput
                        placeholder='Nome'
                        placeholderTextColor='#9E9E9E'
                        style={styles.inputDisabled}
                        value={this.props.perfilNome}
                        editable={false}
                    />
                    <TextInput
                        placeholder='Apelido'
                        placeholderTextColor='#9E9E9E'
                        style={styles.inputDisabled}
                        value={this.props.perfilApelido}
                        editable={false}
                    />
                    <TextInput
                        placeholder='Celular'
                        placeholderTextColor='#9E9E9E'
                        style={styles.input}
                        value={this.props.perfilCelular}
                        onChangeText={(text) => this.props.setPerfilCelular(text)}
                    />
                    <TextInput
                        placeholder='Telefone'
                        placeholderTextColor='#9E9E9E'
                        style={styles.input}
                        value={this.props.perfilTelefone}
                        onChangeText={(text) => this.props.setPerfilTelefone(text)}
                    />
                    <TextInput
                        keyboardType='email-address'
                        placeholder='E-mail'
                        placeholderTextColor='#9E9E9E'
                        style={styles.input}
                        value={this.props.perfilEmail}
                        onChangeText={(text) => this.props.setPerfilEmail(text)}
                    />
                    <TextInput
                        keyboardType='numeric'
                        placeholder='Cep'
                        placeholderTextColor='#9E9E9E'
                        style={styles.input}
                        value={this.props.perfilCep}
                        onChangeText={(text) => this.props.setPerfilCep(text)}
                    />
                    <TextInput
                        placeholder='Endereço'
                        placeholderTextColor='#9E9E9E'
                        style={styles.input}
                        value={this.props.perfilEndereco}
                        onChangeText={(text) => this.props.setPerfilEndereco(text)}
                    />
                    <TextInput
                        placeholder='Nº'
                        placeholderTextColor='#9E9E9E'
                        style={styles.input}
                        value={this.props.perfilNumero}
                        onChangeText={(text) => this.props.setPerfilNumero(text)}
                    />
                    <TextInput
                        placeholder='Complemento'
                        placeholderTextColor='#9E9E9E'
                        style={styles.input}
                        value={this.props.perfilComplemento}
                        onChangeText={(text) => this.props.setPerfilComplemento(text)}
                    />
                    <TextInput
                        placeholder='Bairro'
                        placeholderTextColor='#9E9E9E'
                        style={styles.input}
                        value={this.props.perfilBairro}
                        onChangeText={(text) => this.props.setPerfilBairro(text)}
                    />
                    <TextInput
                        placeholder='Cidade'
                        placeholderTextColor='#9E9E9E'
                        style={styles.input}
                        value={this.props.perfilCidade}
                        onChangeText={(text) => this.props.setPerfilCidade(text)}
                    />
                    <View style={styles.button}>
                        {this.renderButton()}
                        <Text style={styles.textoErro}>{this.props.perfilErro}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        fontSize: 15,
        color: '#E65100',
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        height: 70,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 3,
        marginBottom: 3
    },
    inputDisabled: {
        fontSize: 15,
        color: '#E65100',
        borderWidth: 1,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        padding: 10,
        height: 70,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 3,
        marginBottom: 3
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10
    },
    textoErro: {
        marginTop: 5,
        marginBottom: 20,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red'
    }
});

const mapStateToProps = (state) => (
    {
        perfilId: state.PerfilReducer.perfilId,
        perfilNome: state.PerfilReducer.perfilNome,
        perfilApelido: state.PerfilReducer.perfilApelido,
        perfilMatricula: state.PerfilReducer.perfilMatricula,
        perfilCelular: state.PerfilReducer.perfilCelular,
        perfilTelefone: state.PerfilReducer.perfilTelefone,
        perfilEmail: state.PerfilReducer.perfilEmail,
        perfilCep: state.PerfilReducer.perfilCep,
        perfilEndereco: state.PerfilReducer.perfilEndereco,
        perfilNumero: state.PerfilReducer.perfilNumero,
        perfilComplemento: state.PerfilReducer.perfilComplemento,
        perfilBairro: state.PerfilReducer.perfilBairro,
        perfilCidade: state.PerfilReducer.perfilCidade,
        progressoPerfilSalvar: state.PerfilReducer.progressoPerfilSalvar,
        progressoPerfilDados: state.PerfilReducer.progressoPerfilDados,
        perfilErro: state.PerfilReducer.perfilErro
    }
);

export default connect(mapStateToProps, {
    getPerfil,
    storePerfil,
    setPerfilCelular,
    setPerfilTelefone,
    setPerfilEmail,
    setPerfilCep,
    setPerfilEndereco,
    setPerfilNumero,
    setPerfilComplemento,
    setPerfilBairro,
    setPerfilCidade
})(Perfil);
