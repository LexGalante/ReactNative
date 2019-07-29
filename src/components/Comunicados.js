/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    Text,
    ListView,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { getComunicados } from '../actions/ComunicadosActions';

class Comunicados extends Component {
    componentWillMount() {
        this.props.getComunicados();
        this.dataSource = new ListView.DataSource({ rowHasChanged: (x, y) => x !== y });
        this.data = this.dataSource.cloneWithRows({});
    }  

    componentWillReceiveProps(nextProps) {
        this.fillDataSource(nextProps.comunicados);
    }

    fillDataSource(list) {
        this.data = this.dataSource.cloneWithRows(list);
    }

    render() {
        if (this.props.progresso) {        
            return ( 
                <View style={styles.fundo} >  
                    <ActivityIndicator
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        color='#C51162'
                        size='large'
                    />
                </View> 
            );
        }
        if (this.props.erro !== '') {
            return ( 
                <View style={styles.fundoErro} >  
                    <Text style={styles.erro}>{this.props.erro}</Text>
                </View> 
            );
        }
        
        return (
            <View style={styles.fundo} >
                <ListView 
                    enableEmptySections
                    dataSource={this.data}
                    renderRow={(element) => (
                        <View style={styles.linha}>
                            <Text style={styles.data}>{element.data}</Text>
                            <Text style={styles.comunicado}>{element.comunicado}</Text>
                        </View>                          
                    )}                    
                />                    
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: 'white',
        width: null
    },    
    fundoErro: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linha: {
        flex: 1,
        borderColor: '#C51162',
        borderBottomWidth: 1,
        margin: 5,
        padding: 5
    },
    data: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#115E54',
        marginRight: 5
    },
    comunicado: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#C51162'
    },
    erro: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    } 
});

const mapStateToProps = (state) => (
    {
        comunicados: state.ComunicadoReducer.comunicados,
        erro: state.ComunicadoReducer.comunicado_reducer_erro,
        progresso: state.ComunicadoReducer.comunicado_reducer_progresso
    }
);

export default connect(mapStateToProps, { getComunicados })(Comunicados);
