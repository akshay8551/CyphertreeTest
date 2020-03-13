import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';

function Splash({ navigation }) {
    useEffect(() => {
        setTimeout(() => navigation.navigate('Login'), 2000)
    });
    return (
        <View style={styles.mainView}>
            <View style={styles.statusBarStyle}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor="#D35400"
                    translucent={false}
                    networkActivityIndicatorVisible={true}
                />
            </View>
            <View>
                <Image
                    source={require('../assets/images/image.png')}
                    style={{ width: 150, height: 150, marginBottom: 15 }}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Test')}>
                <Text style={styles.textStyle}>CYPHERTREE</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBarStyle: {
        height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        marginBottom: 20
    },
    textStyle: {
        color: '#D35400',
        fontSize: 20,
        fontWeight: 'bold'
    }
})
export default Splash