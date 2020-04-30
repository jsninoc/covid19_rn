import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';

import globalStyles from '../styles/global';

const InfoConfirmados = (props) => {

    const [ confirmados, guardarConfirmados ] = useState('')
    useEffect(() => {
        const fecthWorldData = async () => {
            const respuesta = await fetch('https://corona.lmao.ninja/v2/all');
            const data = await respuesta.json();
            guardarConfirmados(data.cases);
        }
    
        fecthWorldData();
    }, [])

    const { colors } = props.theme;

    return (
        <View style={[globalStyles.tarjeta, {borderColor: colors.accent}]}>
            {!confirmados ? (
                <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> -- </Text>
            ) : (
                <>
                    <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> {confirmados.toLocaleString('en')} </Text>
                </>
            )}
            <Text style={globalStyles.textoTarjeta}> Confirmados </Text>
        </View>
    );
};

export default withTheme(InfoConfirmados);