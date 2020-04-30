import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Pais from './Pais';
import Graficas from '../components/Graficas';

const Stack = createStackNavigator();

const PaisStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Pais"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold'
                },
                headerShown: false
            }}
        >
            <Stack.Screen 
                name="Pais"
                component={Pais}
                options={{
                    title: 'Estadísticas por país'
                }}
            />

            <Stack.Screen 
                name="Graficas"
                component={Graficas}
            />
        </Stack.Navigator>
    );
};

export default PaisStack;