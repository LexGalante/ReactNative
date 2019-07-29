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
import { getAudiencias } from '../actions/AudienciasActions';

class Audiencias extends Component {
    componentWillMount() {
        this.props.getAudiencias();
        this.dataSource = new ListView.DataSource({ rowHasChanged: (x, y) => x !== y });
        this.data = this.dataSource.cloneWithRows({});
    }  

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.audiencias);
        this.fillDataSource(nextProps.audiencias);
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
                        color='#880E4F'
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
                            <Text style={styles.assunto}>Assunto: {element.assunto}</Text>
                            <Text style={styles.local}>Local: {element.local}</Text>
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
        borderColor: '#880E4F',
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
    assunto: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#880E4F'
    },
    local: {
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#115E54',
        marginTop: 5
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
        audiencias: state.AudienciasReducer.audiencias,
        erro: state.AudienciasReducer.audiencia_reducer_erro,
        progresso: state.AudienciasReducer.audiencia_reducer_progresso
    }
);

export default connect(mapStateToProps, { getAudiencias })(Audiencias);
