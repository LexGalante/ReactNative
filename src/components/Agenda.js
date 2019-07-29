/* eslint-disable no-unused-vars */
/*eslint no-undef: "error"*/
/* eslint-disable max-len */
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Button,
    Text,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import 'moment/locale/pt-br';
import * as Util from '../Util';
import * as Constantes from '../Contantes';

export default class Agenda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            local: '',
            inicio: '',
            fim: '',
            observacao: '',
            min: `${Util.now(Constantes.PATTERN_DATE_TIME)} 00:00`,
            max: `${Util.now(Constantes.PATTERN_DATE_TIME)} 24:00`,
            progresso: false,
            erro: ''
        };
    }

    componentWillMount() {

    }

    store() {
        const { local, inicio, fim, observacao } = this.state;
        this.setState({ progresso: true });
        AsyncStorage.getItem(Constantes.PREFERENCES_ESCALA_DATAS_MANUAL)
            .then((storage) => {
                let json = {};
                if (storage !== null) {
                    json = JSON.parse(storage);
                }
                json[this.props.element.dateString] = { data: this.props.element.dateString, local, inicio, fim, observacao };
                AsyncStorage.setItem(Constantes.PREFERENCES_ESCALA_DATAS_MANUAL, JSON.stringify(json))
                    .then(() => {
                        setTimeout(() => {
                            this.setState({ progresso: false });
                            Actions.pop();
                        }, 700);
                    })
                    .catch((error) => {
                        this.setState({ erro: error.message, progresso: false });
                    });
            })
            .catch((error) => {
                console.log(error);
                this.setState({ erro: error.message, progresso: false });
            });
    }

    renderButton() {
        if (this.state.progresso) {
            return (
                <ActivityIndicator
                    color='#1A237E'
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
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <DatePicker
                        is24Hour
                        style={styles.datePicker}
                        date={this.state.inicio}
                        mode="time"
                        placeholder="Início"
                        format="HH:mm"
                        minDate={this.state.min}
                        maxDate={this.state.max}
                        confirmBtnText="Confirmar"
                        cancelBtnText="Cancelar"
                        customStyles={{
                            dateIcon: {
                                position: 'relative',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            placeholderText: {
                                fontSize: 15,
                                color: '#9E9E9E'
                            }
                        }}
                        onDateChange={(inicio) => { this.setState({ inicio }); }}
                    />
                    <DatePicker
                        is24Hour
                        style={styles.datePicker}
                        date={this.state.fim}
                        mode="time"
                        placeholder="Termino"
                        format="HH:mm"
                        minDate={this.state.min}
                        maxDate={this.state.max}
                        confirmBtnText="Confirmar"
                        cancelBtnText="Cancelar"
                        customStyles={{
                            dateIcon: {
                                position: 'relative',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            placeholderText: {
                                fontSize: 15,
                                color: '#9E9E9E'
                            }
                        }}
                        onDateChange={(fim) => { this.setState({ fim }); }}
                    />
                </View>
                <TextInput
                    placeholder='Local'
                    placeholderTextColor='#9E9E9E'
                    style={styles.input}
                    value={this.state.local}
                    onChangeText={(text) => this.setState({ local: text })}
                />
                <TextInput
                    numberOfLines={3}
                    placeholder='Observações'
                    placeholderTextColor='#9E9E9E'
                    style={styles.input}
                    value={this.state.observacao}
                    onChangeText={(text) => this.setState({ observacao: text })}
                />
                <View style={styles.button}>
                    {this.renderButton()}
                    <Text style={styles.error}>{this.state.erro}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    datePicker: {
        flex: 1,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5,
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 3,
        marginBottom: 3
    },
    input: {
        fontSize: 15,
        color: '#1A237E',
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
    button: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10
    },
    error: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center'
    }
});
