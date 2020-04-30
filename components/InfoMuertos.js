import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';

import globalStyles from '../styles/global';

const InfoMuertos = (props) => {

    const [ muertos, guardarMuertos ] = useState('')
    useEffect(() => {
        const fecthWorldData = async () => {
            const respuesta = await fetch('https://corona.lmao.ninja/v2/all');
            const data = await respuesta.json();
            guardarMuertos(data.deaths);
        }
    
        fecthWorldData();
    }, [])

    const { colors } = props.theme;

    return (
        <View style={[globalStyles.tarjeta, {borderColor: colors.accent, marginTop: 20}]}>
            {!muertos ? (
                <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> -- </Text>
            ) : (
                <>
                    <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> {muertos.toLocaleString('en')} </Text>
                </>
            )}
            <Text style={globalStyles.textoTarjeta}> Muertos </Text>
        </View>
    );
};

export default withTheme(InfoMuertos);