import React from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet, Linking } from 'react-native';
import { Headline, Subheading } from 'react-native-paper'

import globalStyles from '../styles/global';

const Informacion = () => {

    return (
        <View style={[globalStyles.contenedor, {alignItems: 'center'}]}>
            <Headline style={globalStyles.titulo}>Información</Headline>

            <View style={{marginBottom: 20, alignItems: 'center'}}>
                <Subheading style={styles.subtitulo}>Creado por: </Subheading>

                <TouchableWithoutFeedback onPress={() => Linking.openURL('https://www.linkedin.com/in/juan-sebastian-nino-corredor')}>
                    <Text style={styles.texto}>Juan Sebastian Niño Corredor</Text>
                </TouchableWithoutFeedback>
            </View>


            <View style={{alignItems: 'center'}}>
                <Subheading style={styles.subtitulo}>
                    Utilizando las API: 
                </Subheading>

                <TouchableWithoutFeedback onPress={() => Linking.openURL('https://www.github.com/novelcovid/api')}>
                    <Text style={styles.texto}>NovelCOVID/API</Text>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => Linking.openURL('https://www.github.com/mathdroid/covid-19-api')}>
                    <Text style={styles.texto}>COVID-19 Global Data</Text>
                </TouchableWithoutFeedback>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    subtitulo:{
        fontSize: 22
    },
    texto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    }
});

export default Informacion;