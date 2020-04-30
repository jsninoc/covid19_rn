import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Mundial from './views/Mundial';
import PaisStack from './views/PaisStack';
import Informacion from './views/Informacion';

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary: '#393b4a',
    accent: '#09e6e1',
    background: '#393b4a',
    text: '#ffffff'
  }
};

const App = () => {

  return (
    <>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <Tab.Navigator
              initialRouteName="Mundial"
              screenOptions={({route}) => ({

                tabBarIcon: ({ focused, color, size }) => {
                  if (route.name === 'Mundial') {
                    return <AntDesign name='earth' size={size} color={color} />;
                  } else if (route.name === 'PaisStack') {
                    return <FontAwesome name='map-marker' size={size} color={color} />;
                  } else if (route.name === 'Informacion') {
                    return <FontAwesome name='info' size={size} color={color} />;
                  }
                }
              
              })}
              tabBarOptions= {{
                style: {
                  backgroundColor: theme.colors.primary
                },
                activeTintColor: '#fff',
                activeBackgroundColor: 'rgba(0, 230, 255, .4)'
              }}
            >
              <Tab.Screen 
                name="Mundial"
                component={Mundial}
                options={{
                  title: "Mundial"
                }}
              />

              <Tab.Screen 
                name="PaisStack"
                component={PaisStack}
                options={{
                  title: "País"
                }}
              />

              <Tab.Screen 
                name="Informacion"
                component={Informacion}
                options={{
                  title: "Información"
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
          
        </PaperProvider>
    </>
  );
};

export default App;
