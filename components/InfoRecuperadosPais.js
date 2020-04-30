import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, withTheme } from 'react-native-paper';

import globalStyles from '../styles/global';

const InfoRecuperadosPais = (props) => {

    const [recuperadospais, guardarRecuperadosPais] = useState('');
    const [recuperadoshoy, guardarRecuperadosHoy] = useState('');

    const { pais } = props
    const { colors } = props.theme;

    useEffect(() => {
        const fecthWorldData = async () => {
            if (!pais) {
                guardarRecuperadosPais(null);
                guardarRecuperadosHoy(null);
            }else{
                const respuesta = await fetch(`https://corona.lmao.ninja/v2/countries/${pais}`);
                const data = await respuesta.json();
                const respuesta2 = await fetch(`https://corona.lmao.ninja/v2/countries/${pais}?yesterday=true`);
                const data2 = await respuesta2.json();
                let rechoy = data.recovered - data2.recovered;
                guardarRecuperadosPais(data.recovered);
                guardarRecuperadosHoy(rechoy);
            }
            
        }
    
        fecthWorldData();
    }, [pais]);


    return (
        <View style={{height: 80, marginBottom: 20}}>
            <ScrollView 
                horizontal
                contentContainerStyle={{alignItems: 'center'}}   
                showsHorizontalScrollIndicator={false}
            >
                <View style={[globalStyles.tarjeta, {borderColor: colors.accent, marginRight: 10}]}>
                    {!recuperadospais ? (
                        <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> -- </Text>
                    ) : (
                        <>
                            <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> {recuperadospais.toLocaleString('en')} </Text>
                        </>
                    )}
                    <Text style={globalStyles.textoTarjeta}> Recuperados </Text>
                </View>

                <View style={[globalStyles.tarjeta, {borderColor: colors.accent, marginRight: 10}]}>
                    {!recuperadoshoy ? (
                        <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> -- </Text>
                    ) : (
                        <>
                            <Text style={[globalStyles.numeroTarjeta, {color: colors.accent}]}> {recuperadoshoy.toLocaleString('en')} </Text>
                        </>
                    )}
                    <Text style={globalStyles.textoTarjeta}> Recuperados hoy </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default withTheme(InfoRecuperadosPais);