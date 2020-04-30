import { StyleSheet } from 'react-native';

const globalStlyes = StyleSheet.create({
    contenedor:{
        flex: 1,
        marginTop: 20,
        marginHorizontal: '2.5%'
    },
    titulo: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 30,
        fontSize: 30
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
    },
    numeroTarjeta:{
        fontSize: 26,
        fontWeight: 'bold'
    },
    textoTarjeta:{
        fontSize: 18
    }
});

export default globalStlyes;