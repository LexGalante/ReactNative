/* eslint-disable no-unused-vars */
/*eslint no-undef: "error"*/
/* eslint-disable max-len */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Alert,
    AsyncStorage,
    TouchableHighlight,
    Image
} from 'react-native';
import {
    CalendarList,
    LocaleConfig,
    Arrow
} from 'react-native-calendars';
import { Actions } from 'react-native-router-flux';
import FontSize from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import lodash from 'lodash';
import {
    getEscala,
    progressoRefresh,
    progressoRefreshFinish,
    addEscalaData
} from '../actions/EscalaActions';
import * as Util from '../Util';
import * as Constantes from '../Contantes';

const iconBtnAdd = require('../img/icone_add_32.png');

class Escala extends Component {
    constructor(props) {
        super(props);
        this.data = {};
    }

    componentWillMount() {
        this.props.getEscala();
        LocaleConfig.locales.br = {
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
                'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.',
                'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            dayNames: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira',
                'Quinta-Feira', 'Sexta-Feira', 'Sabádo'],
            dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']
        };
        LocaleConfig.defaultLocale = 'br';
    }

    componentWillReceiveProps(nextProps) {
        this.data = this.prepareDates(nextProps.escalaDatas);
    }

    onClickDate(element) {
        const dataEscala = this.props.escalaDatas[element.dateString];
        if (dataEscala !== undefined && dataEscala !== null) {
            const titulo = `Data: ${Util.dateFormat(element.dateString, Constantes.PATTERN_DATE_TIME_BR)}`;
            let texto = '';
            if (dataEscala.local !== '' && dataEscala.local !== null && dataEscala.local !== undefined) {
                texto += `Local: ${dataEscala.local}`;
            }
            if (dataEscala.inicio !== '' && dataEscala.inicio !== null && dataEscala.inicio !== undefined) {
                texto += `\nInicio: ${dataEscala.inicio}`;
            }
            if (dataEscala.fim !== '' && dataEscala.fim !== null && dataEscala.fim !== undefined) {
                texto += `\nFim: ${dataEscala.fim}`;
            }
            if (dataEscala.observacao !== '' && dataEscala.observacao !== null && dataEscala.observacao !== undefined) {
                texto += `\nObservação: ${dataEscala.observacao}`;
            }
            let buttons = [];
            if (lodash.has(dataEscala, 'id')) {
                buttons = [{ text: 'OK' }];
            } else {
                buttons = [
                    {
                        text: 'Excluir',
                        style: 'cancel',
                        onPress: () => {
                            this.props.progressoRefresh('Excluindo ...');
                            AsyncStorage.getItem(Constantes.PREFERENCES_ESCALA_DATAS_MANUAL)
                                .then((storage) => {
                                    const datas = JSON.parse(storage);
                                    lodash.forEach(datas, (value, key) => {
                                        if (key === dataEscala.data) {
                                            delete datas[key];
                                            AsyncStorage.removeItem(Constantes.PREFERENCES_ESCALA_DATAS_MANUAL)
                                                .then(() => {
                                                    AsyncStorage.setItem(Constantes.PREFERENCES_ESCALA_DATAS_MANUAL, JSON.stringify(datas))
                                                        .then(() => {
                                                            this.props.progressoRefreshFinish();
                                                            Actions.pop();
                                                        });
                                                });
                                        }
                                    });
                                });
                        }
                    },
                    { text: 'OK', style: 'ok' },
                ];
            }

            Alert.alert(
                titulo,
                texto,
                buttons,
                { cancelable: false }
            );
        } else {
            Actions.agenda({
                title: Util.dateFormat(element.dateString, Constantes.PATTERN_DATE_TIME_BR),
                element,
            });
        }
    }

    prepareDates(dates) {
        const datas = {};
        lodash.forEach(dates, (value) => {
            if (value.id === undefined) {
                datas[value.data] = {
                    customStyles: {
                        container: { backgroundColor: '#E65100', elevation: 3 },
                        text: { color: 'white', fontWeight: 'bold' },
                    },
                };
            } else {
                datas[value.data] = {
                    customStyles: {
                        container: { backgroundColor: '#00897B', elevation: 3 },
                        text: { color: 'white', fontWeight: 'bold' },
                    },
                };
            }
        });

        return datas;
    }

    renderProgress() {
        if (this.props.escalaProgresso) {
            return (
                <ActivityIndicator
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    color='#00897B'
                    size='small'
                />
            );
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <CalendarList
                    pastScrollRange={this.props.escalaMesesPassados}//Meses passados que serão renderizados
                    futureScrollRange={this.props.escalaMesesFuturo}//Meses futuros que serão renderizados
                    scrollEnabled//Habilita scroll
                    horizontal//Habilita visualização em horizontal
                    style={styles.container}//Estilo do container do calendário
                    theme={theme}//Estilo da api
                    monthFormat={'MMMM/yyyy'}//Formato da visualização do mês no cabeçalho do calendario
                    current={this.props.escalaDataMin}
                    minDate={this.props.escalaDataMin}//Data minima
                    maxDate={this.props.escalaDataMax}//Data maxima
                    firstDay={1}//Bobagem
                    renderArrow={(direction) => (<Arrow />)}//Barras para troca do mês
                    hideArrows={false}
                    hideExtraDays={false}
                    onDayPress={(element) => this.onClickDate(element)}//Evento chamado ao clicar sobre uma data
                    onDayLongPress={(element) => this.onClickDate(element)}//Engo sobre a data
                    markingType={'custom'}
                    markedDates={this.data}//Marcas do calendário
                />
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>{this.props.escalaMensagem}</Text>
                    {this.renderProgress()}
                </View>
                <View style={styles.containerLegend}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View
                            style={{
                                width: 15,
                                height: 15,
                                backgroundColor: '#00897B',
                                borderRadius: 50,
                                elevation: 10,
                                margin: 5
                            }}
                        />
                        <Text style={{ color: 'gray', fontSize: FontSize(1.5) }}>Dias escalados</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View
                            style={{
                                width: 15,
                                height: 15,
                                backgroundColor: '#1A237E',
                                borderRadius: 50,
                                elevation: 10,
                                margin: 5
                            }}
                        />
                        <Text style={{ color: 'gray', fontSize: FontSize(1.5) }}>Dias úteis</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View
                            style={{
                                width: 15,
                                height: 15,
                                backgroundColor: '#E65100',
                                borderRadius: 50,
                                elevation: 10,
                                margin: 5
                            }}
                        />
                        <Text style={{ color: 'gray', fontSize: FontSize(1.5) }}>Escala Manual</Text>
                    </View>
                    <TouchableHighlight
                        underlayColor='white'
                        style={styles.button}
                        onPress={() => {
                            Actions.pop();
                            Actions.gerarEscala();
                        }}
                    >
                        <Image source={iconBtnAdd} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const theme = {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: 'red',
    selectedDayBackgroundColor: '#00897B',
    selectedDayTextColor: 'white',
    todayTextColor: 'red',
    dayTextColor: '#1A237E',
    textDisabledColor: 'gray',
    dotColor: '#1A237E',
    selectedDotColor: '#ffffff',
    arrowColor: '#1A237E',
    monthTextColor: '#1A237E',
    textMonthFontWeight: 'bold',
    textDayFontSize: 16,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 12
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginBottom: 20,
    },
    containerTitle: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    containerLegend: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 35,
        marginBottom: 10,
    },
    title: {
        color: '#00897B',
        fontSize: FontSize(2.5),
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button: {
        alignItems: 'center',
        marginRight: 5,
        marginLeft: 5,
        borderRadius: 50,
        elevation: 1
    }
});

const mapStateToProps = (state) => (
    {
        escalaMensagem: state.EscalaReducer.escalaMensagem,
        escalaDataMin: state.EscalaReducer.escalaDataMin,
        escalaDataMax: state.EscalaReducer.escalaDataMax,
        escalaMesesPassados: state.EscalaReducer.escalaMesesPassados,
        escalaMesesFuturo: state.EscalaReducer.escalaMesesFuturo,
        escalaDatas: state.EscalaReducer.escalaDatas,
        escalaProgresso: state.EscalaReducer.escalaProgresso
    }
);

export default connect(mapStateToProps, {
    getEscala,
    progressoRefresh,
    progressoRefreshFinish,
    addEscalaData
})(Escala);
