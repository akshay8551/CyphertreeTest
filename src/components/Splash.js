import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

function Splash({ navigation }) {
    useEffect(() => {
        setTimeout(() => navigation.navigate('Login'), 2000)
    });
    return (
        <View style={styles.mainView}>
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
    textStyle: {
        color: 'orange',
        fontSize: 18,
        fontWeight: 'bold'
    }
})
export default Splash