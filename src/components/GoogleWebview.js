import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { WebView } from 'react-native-webview';

function GoogleWebview({ navigation }) {
    const [accessGoogleUrl, setAccessGoogleUrl] = useState('');

    useEffect(() => {
       let url = navigation.getParam('g_url')
       console.log(url)
       setAccessGoogleUrl(url)
    });
    return(
        <View style={styles.mainView}>
        <View style={styles.statusBarStyle}>
           <StatusBar
               barStyle="dark-content"
               hidden={false}
               backgroundColor="#ff4081"
               translucent={false}
               networkActivityIndicatorVisible={true}
           />
       </View>
        <WebView
            // userAgent={DeviceInfo.getUserAgent() + " - MYAPPNAME - android "}  
            source={{uri: accessGoogleUrl}}
            style={{marginTop: 20}}
        />
    </View>
    )
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    statusBarStyle: {
        height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        marginBottom: 0
    },
    textStyle: {
        color: 'orange',
        fontSize: 18,
        fontWeight: 'bold'
    },
    bodyView: {
        margin: 10,
       
    },
})
export default GoogleWebview