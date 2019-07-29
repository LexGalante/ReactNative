/* eslint-disable no-unused-vars */
/*eslint no-undef: "error"*/
/* eslint-disable max-len */
// eslint-disable-line global-require
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    TextInput,
    Button,
    Text,
    ActivityIndicator,
    Picker,
    Image,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import lodash from 'lodash';
import validate from 'validate.js';
import {
    set,
    getTipos,
    getHorarios,
    gerarEscala
} from '../actions/GerarEscalaActions';
import * as Constantes from '../Contantes';

class GerarEscala extends Component {
    componentWillMount() {
        this.props.getTipos();
        this.props.getHorarios();
    }

    validate() {
        let isValid = true;
        let errorMessage = '';
        if (validate.isEmpty(this.props.escalaGerarInicial)) {
            isValid = false;
            errorMessage += '*Informe a data de inicio';
        }
        if (validate.isEmpty(this.props.escalaGerarFinal)) {
            isValid = false;
            errorMessage += '\n*Informe a data final';
        }
        if (this.props.escalaGerarTipo === 0) {
            isValid = false;
            errorMessage += '\n*Selecione o tipo de escala';
        }
        if (this.props.escalaGerarHorario === 0) {
            isValid = false;
            errorMessage += '\n*Selecione o horarío';
        }
        if (validate.isEmpty(this.props.escalaGerarLocal)) {
            isValid = false;
            errorMessage += '\n*Informe o local que irá trabalhar';
        }

        if (!isValid) {
            this.props.set(Constantes.ESCALA_GERAR_ERRO, errorMessage);
        }

        return isValid;
    }

    gerarEscala() {
        if (this.validate()) {
            const json = {
                inicial: moment(this.props.escalaGerarInicial, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                final: moment(this.props.escalaGerarFinal, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                sabado: this.props.escalaGerarSabado,
                domingo: this.props.escalaGerarDomingo,
                tipo: this.props.escalaGerarTipo,
                horario: this.props.escalaGerarHorario,
                local: this.props.escalaGerarLocal,
                observacao: this.props.escalaGerarObservacao,
            };
            this.props.gerarEscala(json);
        }
    }

    renderPickerTipos() {
        if (this.props.escalaGerarProgressoTipos) {
            return (
                <ActivityIndicator
                    color='#1A237E'
                    size='large'
                />
            );
        }

        const pickerItems = this.props.escalaGerarTipos.map((item, key) =>
            <Picker.Item key={key} label={item.tipo} value={item.id} />);

        return (
            <Picker
                style={styles.picker}
                selectedValue={this.props.escalaGerarTipo}
                onValueChange={(value) => {
                    this.props.set(Constantes.ESCALA_GERAR_SET_TIPO, value);
                }}
            >
                {pickerItems}
            </Picker>
        );
    }

    renderPickerHorarios() {
        if (this.props.escalaGerarProgressoHorarios) {
            return (
                <ActivityIndicator
                    color='#1A237E'
                    size='large'
                />
            );
        }

        const pickerItems = this.props.escalaGerarHorarios.map((item, key) =>
            <Picker.Item key={key} label={item.horario} value={item.id} />);

        return (
            <Picker
                style={styles.picker}
                selectedValue={this.props.escalaGerarHorario}
                onValueChange={(value) => this.props.set(Constantes.ESCALA_GERAR_SET_HORARIO, value)}
            >
                {pickerItems}
            </Picker>
        );
    }

    renderButton() {
        if (this.props.escalaGerarProgresso) {
            return (
                <ActivityIndicator
                    color='#1A237E'
                    size='large'
                />
            );
        }

        return (
            <Button
                title='Gerar'
                color='#00BFA5'
                onPress={() => this.gerarEscala()}
            />
        );
    }

    renderCheckBoxSabado() {
        if (this.props.escalaGerarSabado) {
            return (
                <TouchableHighlight
                    style={styles.containerCheckbox}
                    underlayColor='white'
                    onPress={() => this.props.set(Constantes.ESCALA_GERAR_SET_SABADO, !this.props.escalaGerarSabado)}
                >
                    <View style={{ flexDirection: 'row', padding: 5 }}>
                        <Image source={require('../img/icone_check.png')} style={styles.iconCheckbox} />
                        <Text style={styles.textCheckbox}>Folga Sab?</Text>
                    </View>
                </TouchableHighlight>
            );
        }

        return (
            <TouchableHighlight
                style={styles.containerCheckbox}
                underlayColor='white'
                onPress={() => this.props.set(Constantes.ESCALA_GERAR_SET_SABADO, !this.props.escalaGerarSabado)}
            >
                <View style={{ flexDirection: 'row', padding: 5 }}>
                    <Image source={require('../img/icone_uncheck.png')} style={styles.iconCheckbox} />
                    <Text style={styles.textCheckbox}>Folga Sab?</Text>
                </View>
            </TouchableHighlight>
        );
    }

    renderCheckBoxDomingo() {
        if (this.props.escalaGerarDomingo) {
            return (
                <TouchableHighlight
                    style={styles.containerCheckbox}
                    underlayColor='white'
                    onPress={() => this.props.set(Constantes.ESCALA_GERAR_SET_DOMINGO, !this.props.escalaGerarDomingo)}
                >
                    <View style={{ flexDirection: 'row', padding: 5 }}>
                        <Image source={require('../img/icone_check.png')} style={styles.iconCheckbox} />
                        <Text style={styles.textCheckbox}>Folga Dom?</Text>
                    </View>
                </TouchableHighlight>
            );
        }

        return (
            <TouchableHighlight
                style={styles.containerCheckbox}
                underlayColor='white'
                onPress={() => this.props.set(Constantes.ESCALA_GERAR_SET_DOMINGO, !this.props.escalaGerarDomingo)}
            >
                <View style={{ flexDirection: 'row', padding: 5 }}>
                    <Image source={require('../img/icone_uncheck.png')} style={styles.iconCheckbox} />
                    <Text style={styles.textCheckbox}>Folga Dom?</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, paddingBottom: 20 }}>
                <Text style={{ color: '#9E9E9E', textAlign: 'center', fontSize: 12 }}>Périodo</Text>
                <View style={{ flexDirection: 'row' }}>
                    <DatePicker
                        style={styles.datePicker}
                        date={this.props.escalaGerarInicial}
                        mode="date"
                        placeholder="Início"
                        format="DD/MM/YYYY"
                        minDate={this.props.escalaGerarDataMinima}
                        maxDate={this.props.escalaGerarDataMaxima}
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
                        onDateChange={(value) => { this.props.set(Constantes.ESCALA_GERAR_SET_INICIAL, value); }}
                    />
                    <DatePicker
                        style={styles.datePicker}
                        date={this.props.escalaGerarFinal}
                        mode="date"
                        placeholder="Termino"
                        format="DD/MM/YYYY"
                        minDate={this.props.escalaGerarInicial}
                        maxDate={this.props.escalaGerarDataMaxima}
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
                        onDateChange={(value) => { this.props.set(Constantes.ESCALA_GERAR_SET_FINAL, value); }}
                    />
                </View>
                <Text style={{ color: '#9E9E9E', textAlign: 'center', fontSize: 12 }}>Tipo</Text>
                <View style={styles.pickerView}>
                    {this.renderPickerTipos()}
                </View>
                <Text style={{ color: '#9E9E9E', textAlign: 'center', fontSize: 12 }}>Horário</Text>
                <View style={styles.pickerView}>
                    {this.renderPickerHorarios()}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {this.renderCheckBoxSabado()}
                    {this.renderCheckBoxDomingo()}
                </View>
                <TextInput
                    placeholder='Local'
                    placeholderTextColor='#9E9E9E'
                    style={styles.input}
                    value={this.props.escalaGerarLocal}
                    onChangeText={(value) => this.props.set(Constantes.ESCALA_GERAR_SET_LOCAL, value)}
                />
                <TextInput
                    placeholder='Observações'
                    placeholderTextColor='#9E9E9E'
                    style={styles.input}
                    value={this.props.escalaGerarObservacao}
                    onChangeText={(value) => this.props.set(Constantes.ESCALA_GERAR_SET_OBSERVACAO, value)}
                />
                <View style={styles.button}>
                    {this.renderButton()}
                    <Text style={styles.error}>{this.props.escalaGerarErro}</Text>
                </View>
            </ScrollView>
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
        fontSize: 12,
        textAlign: 'center',
        marginTop: 10
    },
    picker: {
        color: '#1A237E',
    },
    pickerView: {
        flex: 1,
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
    iconCheckbox: {
        width: 20,
        height: 20,
        resizeMode: Image.resizeMode.contain
    },
    textCheckbox: {
        marginLeft: 5,
        textAlign: 'center'
    },
    containerCheckbox: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5,
    }
});

const mapStateToProps = (state) => (
    {
        escalaGerarInicial: state.GerarEscalaReducer.escalaGerarInicial,
        escalaGerarFinal: state.GerarEscalaReducer.escalaGerarFinal,
        escalaGerarSabado: state.GerarEscalaReducer.escalaGerarSabado,
        escalaGerarDomingo: state.GerarEscalaReducer.escalaGerarDomingo,
        escalaGerarTipo: state.GerarEscalaReducer.escalaGerarTipo,
        escalaGerarHorario: state.GerarEscalaReducer.escalaGerarHorario,
        escalaGerarLocal: state.GerarEscalaReducer.escalaGerarLocal,
        escalaGerarObservacao: state.GerarEscalaReducer.escalaGerarObservacao,
        escalaGerarHorarios: state.GerarEscalaReducer.escalaGerarHorarios,
        escalaGerarTipos: state.GerarEscalaReducer.escalaGerarTipos,
        escalaGerarErro: state.GerarEscalaReducer.escalaGerarErro,
        escalaGerarProgresso: state.GerarEscalaReducer.escalaGerarProgresso,
        escalaGerarProgressoHorarios: state.GerarEscalaReducer.escalaGerarProgressoHorarios,
        escalaGerarProgressoTipos: state.GerarEscalaReducer.escalaGerarProgressoTipos,
        escalaGerarDataMinima: state.GerarEscalaReducer.escalaGerarDataMinima,
        escalaGerarDataMaxima: state.GerarEscalaReducer.escalaGerarDataMaxima
    }
);

export default connect(mapStateToProps, {
    set,
    getTipos,
    getHorarios,
    gerarEscala
})(GerarEscala);
