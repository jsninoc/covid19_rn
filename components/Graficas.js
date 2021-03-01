import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, TouchableHighlight, StyleSheet, ScrollView, Dimensions, Button as ButtonRN } from 'react-native';
import { withTheme, Button, Subheading, Text } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-community/picker';
import { InterstitialAd, AdEventType } from '@react-native-firebase/admob';

import globalStyles from '../styles/global';

const intersitial = InterstitialAd.createForAdRequest("ca-app-pub-8913542532762625/1464441243");

const Graficas = ({ navigation, route, theme }) => {

    const { pais } = route.params;
    const { colors } = theme;
    const [fechas, guardarFechas] = useState([]);
    const [valores, guardarValores] = useState([]);
    const [valoresSinAc, guardarValoresSinAc] = useState([]);
    const [dias, guardarDias] = useState('30');
    const [grafica, guardarGrafica] = useState('acumulados');
    const [ diaoprimido, guardarDiaOprimido ] = useState('');
    const [ casosoprimido, guardarCasosOprimido ] = useState('');

    useEffect(() => {
        const eventListener = intersitial.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
                intersitial.show();
            }
        })

        // Start loading the interstitial straight away
        intersitial.load();


        // Unsubscribe from events on unmount
        return () => {
            eventListener();
        }
    }, []);

    useEffect(() => {
        const fecthWorldData = async () => {
            if (!pais) {
                guardarValores(Object.values({}));
                guardarFechas(Object.keys({}));
            }else{
                const respuesta = await fetch(`https://corona.lmao.ninja/v2/historical/${pais}?lastdays=${dias}`);
                const data = await respuesta.json();
                guardarValores(Object.values(data.timeline.cases));
                guardarFechas(Object.keys(data.timeline.cases));
            }
            
        }

        fecthWorldData();
    }, [pais, dias]);

    useEffect(() => {
        var valoresSin = [];

        const guardarValoresSin = () =>  {
            for (let index = 0; index < valores.length; index++) {
                if(index === 0){
                    valoresSin[index] = valores[index];
                } else {
                    valoresSin[index] = valores[index] - valores[index-1];
                }
                guardarValoresSinAc(valoresSin);
            }
        }

        guardarValoresSin();
    }, [valores]);

    const volverPais = () => {
        navigation.navigate('Pais');
        guardarGrafica('acumulados');
        guardarDiaOprimido('');
    };

    const imprimirDatos = datos => {
        const { index, value } = datos;
        guardarDiaOprimido(fechas[index]);
        guardarCasosOprimido(value);
    }

    return (
        <ScrollView style={globalStyles.contenedor}>
            <View style={{alignItems: 'center'}}>
                <Subheading>Seleccione el rango de días para la gráfica</Subheading>
                <Picker
                    selectedValue={dias}
                    onValueChange={dias => guardarDias(dias)}
                    style={{color: '#fff', width: 280}}
                    mode="dropdown"
                >
                    <Picker.Item label="30 días" value="30" />
                    <Picker.Item label="45 días" value="45" />
                    <Picker.Item label="60 días" value="60" />
                    <Picker.Item label="90 días" value="90" />
                </Picker>
            </View>

            <View style={{justifyContent: 'center', flexDirection:'row'}}>
                <TouchableHighlight 
                    style={styles.toggle}
                    onPress={() => guardarGrafica('acumulados')}
                >
                    <Text>Mostrar casos acumulados</Text>
                </TouchableHighlight>

                <TouchableHighlight 
                    style={styles.toggle}
                    onPress={() => guardarGrafica('diarios')}
                >
                    <Text>Mostrar casos diarios</Text>
                </TouchableHighlight>
            </View>

            <View>
                {fechas.length === 0 ? (
                    <ActivityIndicator />
                ) : grafica === 'acumulados' ? (
                    <LineChart
                        data={{
                        labels: fechas,
                        datasets: [
                            {
                                data: valores
                            }
                        ]
                        }}
                        width={Dimensions.get('window').width - 30} // from react-native
                        height={250}
                        yAxisInterval={5} // optional, defaults to 1
                        xLabelsOffset={23}
                        chartConfig={{
                            backgroundColor: colors.primary,
                            backgroundGradientFrom: colors.primary,
                            backgroundGradientTo: colors.primary,
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "1",
                                strokeWidth: "2",
                                stroke: colors.accent
                            }
                        }}
                        bezier
                        style={{
                            marginTop: 20,
                            borderRadius: 16
                        }}
                        verticalLabelRotation={90}
                        onDataPointClick = { datos => imprimirDatos(datos)}
                    />
                ) : (
                    <LineChart
                        data={{
                        labels: fechas,
                        datasets: [
                            {
                                data: valoresSinAc
                            }
                        ]
                        }}
                        width={Dimensions.get('window').width - 30} // from react-native
                        height={250}
                        yAxisInterval={5} // optional, defaults to 1
                        xLabelsOffset={23}
                        chartConfig={{
                            backgroundColor: colors.primary,
                            backgroundGradientFrom: colors.primary,
                            backgroundGradientTo: colors.primary,
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "1",
                                strokeWidth: "2",
                                stroke: colors.accent
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                        verticalLabelRotation={90}
                        onDataPointClick = { datos => imprimirDatos(datos)}
                    />
                ) }
            </View>

            <View style={{alignItems: 'center'}}>
                <View style={[styles.tarjeta, {borderColor: colors.accent}]}>
                    {diaoprimido === '' ? (
                        <Text style={[globalStyles.textoTarjeta, {textAlign: 'center'}]}>Oprime un círculo de la gráfica para obtener datos del día</Text>
                    ) : (
                        <>
                            <Text style={globalStyles.textoTarjeta}>Día: {diaoprimido} </Text>
                            <Text style={globalStyles.textoTarjeta}>Contagiados: {casosoprimido} </Text>
                        </>
                    )}
                </View>
            </View>

            <Button
                mode="contained"
                onPress={() => volverPais()}
                style={{marginTop: 10}}
            >
                Volver
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    toggle: {
        borderColor: '#09e6e1',
        borderWidth: 1,
        borderRadius: 1,
        borderStyle: 'solid',
        padding: 10,
        marginBottom: 10,
        width: (Dimensions.get('window').width)/ 2.5,
        justifyContent: 'center'
    },
    tarjeta:{
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRadius: 2,
        borderWidth: 1,
        padding: 5,
        width: 250,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default withTheme(Graficas);