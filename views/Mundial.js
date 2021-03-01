import React from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob';

import globalStyles from '../styles/global';
import InfoConfirmados from '../components/InfoConfirmados';
import InfoRecuperados from '../components/InfoRecuperados';
import InfoMuertos from '../components/InfoMuertos';

const Mundial = () => {

    return (
        <View style={[globalStyles.contenedor, {alignItems: 'center'}]}>
            <Headline style={globalStyles.titulo}>Estadísticas mundiales</Headline>

            <View style={{justifyContent: 'space-evenly', flex: 1}}>
                <InfoConfirmados />

                <InfoRecuperados />

                <InfoMuertos />
            </View>

            <BannerAd
                unitId="ca-app-pub-8913542532762625/8765697833"
                size={BannerAdSize.SMART_BANNER}
            />

        </View>
    );
};

export default Mundial;