import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Headline, Button, withTheme } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob';

import globalStyles from '../styles/global';
import InfoConfirmadosPais from '../components/InfoConfirmadosPais';
import InfoRecuperadosPais from '../components/InfoRecuperadosPais';
import InfoMuertosPais from '../components/InfoMuertosPais';

const Pais = (props) => {

    const [ paises, guardarPaises ] = useState([]);
    const [ pais, guardarPais ] = useState('');

    const { navigation } = props;

    useEffect(() => {
        const obtenerPaises = async () => {
            try {
                const respuesta = await fetch('https://covid19.mathdro.id/api/countries');
                const data = await respuesta.json();
                guardarPaises(data.countries);
                
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPaises();
    },[]);
    
    
    return (
        <ScrollView>
            <View style={[globalStyles.contenedor, {alignItems: 'center'}]}>
                <Picker
                    selectedValue={pais}
                    onValueChange={pais => guardarPais(pais)}
                    style={{color: '#fff', width: 280}}
                    mode="dropdown"
                >
                    <Picker.Item label="-- Seleccione un país --" value="0" />
                    {paises.map(pais => (
                        <Picker.Item
                            key={pais.name}
                            label={pais.name}
                            value={pais.name}
                        />
                    ))}
                </Picker>

                <Headline style={[globalStyles.titulo, {marginBottom: 20}]}>Estadísticas de: {pais !== '0' ? pais : ''} </Headline>

                <View style={{flex: 1}}>
                    <InfoConfirmadosPais 
                        pais={pais}
                    />

                    <InfoRecuperadosPais 
                        pais={pais}
                    />

                    <InfoMuertosPais 
                        pais={pais}
                    />

                    <Button 
                        mode="contained"
                        onPress={() => navigation.navigate('Graficas', {pais})}
                    >
                        Ver gráficas
                    </Button>
                </View>

                <View style={{marginTop: 30}}>
                    <BannerAd
                        unitId="ca-app-pub-8913542532762625/7643122190"
                        size={BannerAdSize.MEDIUM_RECTANGLE}
                    />
                </View>
            </View>



        </ScrollView>
    );
};

export default withTheme(Pais);