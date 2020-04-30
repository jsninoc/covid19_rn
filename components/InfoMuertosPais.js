import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, withTheme } from 'react-native-paper';

import globalStyles from '../styles/global';

const InfoMuertosPais = (props) => {

    const [muertospais, guardarMuertosPais] = useState('');
    const [muertoshoy, guardarMuertosHoy] = useState('');

    const { pais } = props
    const { colors } = props.theme;

    useEffect(() => {
        const fecthWorldData = async () => {
            if (!pais) {
                guardarMuertosPais(null);
                guardarMuertosHoy(null);
            }else{
                const respuesta = await fetch(`https://corona.lmao.ninja/v2/countries/${pais}`);
                const data = await respuesta.json();
                guardarMuertosPais(data.deaths);
                guardarMuertosHoy(data.todayDeaths);
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
                    {!muertospais ? (
                        <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> -- </Text>
                    ) : (
                        <>
                            <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> {muertospais.toLocaleString('en')} </Text>
                        </>
                    )}
                    <Text style={globalStyles.textoTarjeta}> Muertos </Text>
                </View>

                <View style={[globalStyles.tarjeta, {borderColor: colors.accent}]}>
                    {!muertoshoy ? (
                        <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> -- </Text>
                    ) : (
                        <>
                            <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> {muertoshoy.toLocaleString('en')} </Text>
                        </>
                    )}
                    <Text style={globalStyles.textoTarjeta}> Muertos hoy </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default withTheme(InfoMuertosPais);