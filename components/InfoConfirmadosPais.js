import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, withTheme } from 'react-native-paper';

import globalStyles from '../styles/global';

const InfoConfirmadosPais = (props) => {

    const [confirmadospais, guardarConfirmadosPais] = useState('');
    const [confirmadoshoy, guardarConfirmadosHoy] = useState('');

    const { pais } = props
    const { colors } = props.theme;

    useEffect(() => {
        const fecthWorldData = async () => {
            if (!pais) {
                guardarConfirmadosPais(null);
                guardarConfirmadosHoy(null);
            }else{
                const respuesta = await fetch(`https://corona.lmao.ninja/v2/countries/${pais}`);
                const data = await respuesta.json();
                guardarConfirmadosPais(data.cases);
                guardarConfirmadosHoy(data.todayCases);
            }
            
        }
    
        fecthWorldData();
    }, [pais]);


    return (
        <View style={{height: 80, marginBottom: 20}}>
            <ScrollView 
                horizontal
                contentContainerStyle={{alignItems: 'center', height: 80}}   
                showsHorizontalScrollIndicator={false}
            >
                <View style={[globalStyles.tarjeta, {borderColor: colors.accent, marginRight: 10}]}>
                    {!confirmadospais ? (
                        <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> -- </Text>
                    ) : (
                        <>
                            <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> {confirmadospais.toLocaleString('en')} </Text>
                        </>
                    )}
                    <Text style={globalStyles.textoTarjeta}> Confirmados </Text>
                </View>

                <View style={[globalStyles.tarjeta, {borderColor: colors.accent}]}>
                    {!confirmadoshoy ? (
                        <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> -- </Text>
                    ) : (
                        <>
                            <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> {confirmadoshoy.toLocaleString('en')} </Text>
                        </>
                    )}
                    <Text style={globalStyles.textoTarjeta}> Confirmados hoy </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default withTheme(InfoConfirmadosPais);