import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';

import globalStyles from '../styles/global';

const InfoRecuperados = (props) => {

    const [ recuperados, guardarRecuperados ] = useState('')
    useEffect(() => {
        const fecthWorldData = async () => {
            const respuesta = await fetch('https://corona.lmao.ninja/v2/all');
            const data = await respuesta.json();
            guardarRecuperados(data.recovered);
        }
    
        fecthWorldData();
    }, [])

    const { colors } = props.theme;

    return (
        <View style={[globalStyles.tarjeta, {borderColor: colors.accent, marginTop: 20}]}>
            {!recuperados ? (
                <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> -- </Text>
            ) : (
                <>
                    <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> {recuperados.toLocaleString('en')} </Text>
                </>
            )}
            <Text style={globalStyles.textoTarjeta}> Recuperados </Text>
        </View>
    );
};

export default withTheme(InfoRecuperados);