import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, StatusBar, Platform, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { WebView } from 'react-native-webview';

function GoogleTrelloLogin({ navigation }) {
    const [accessGoogleUrl, setAccessGoogleUrl] = useState('');
    const [accessTrelloUrl, setAccessTrelloUrl] = useState('');

    useEffect(() => {
        getGoogleUrl()
        // getTrelloUrl()
        // getTokens()
    });
    
    getGoogleUrl = async() => {
        const value = await AsyncStorage.getItem('user_accessToken')
        var token = value.replace(/"/g, '')
        // console.log('token:','Bearer '+token)
       
        var apiHeader = {
            method: 'GET',
            headers: {
                "Authorization": 'Bearer '+token
            },
        }
        fetch('http://demo-candi-server.herokuapp.com/api/v1/google/auth/get-authorization-url/', apiHeader
        ).then((response) => response.json())
            .then(async(responseJson) => {
                if(responseJson.code === 'token_not_valid'){
                    Alert.alert(responseJson.detail)
                    // console.log(responseJson)
                }else if(responseJson.status == 'success'){
                    // console.log(responseJson.data.url)
                    setAccessGoogleUrl(responseJson.data.url)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    getTrelloUrl = async() => {
        const value = await AsyncStorage.getItem('user_accessToken')
        var token = value.replace(/"/g, '')
        // console.log('token:','Bearer '+token)
       
        var apiHeader = {
            method: 'GET',
            headers: {
                "Authorization": 'Bearer '+token
            },
        }
        fetch('http://demo-candi-server.herokuapp.com/api/v1/trello/auth/get-authorization-url/', apiHeader
        ).then((response) => response.json())
            .then(async(responseJson) => {
                // console.log(responseJson)
                setAccessTrelloUrl(responseJson.data.url)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    getTokens = async() => {
        const value = await AsyncStorage.getItem('user_accessToken')
        var token = value.replace(/"/g, '')
        var apiHeader = {
            method: 'GET',
            headers: {
               "Authorization": 'Bearer '+token
            },
        }
        fetch('http://demo-candi-server.herokuapp.com/api/v1/user/tokens/', apiHeader
        ).then((response) => response.json())
            .then(async(responseJson) => {
               console.log(responseJson.statusCode)
                if(responseJson.detail === null){
                    console.log('details')
                }else if(responseJson.status === 'success'){
                    console.log(responseJson.data.tokens.google_access_token)
                    console.log(responseJson.data.tokens.trello_access_token)
                    navigation.navigate('CreateTrigger', {googleToken: responseJson.data.tokens.google_access_token, trelloToken: responseJson.data.tokens.trello_access_token})
                }
                
            })
            .catch((error) => {
                console.log(error)
            })
    }
    // googleView = () =>{
        // Linking.openURL(accessGoogleUrl)
    //    navigation.navigate('GoogleWebview',{g_url: accessGoogleUrl})
    // }
    return (
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
            <View style={styles.bodyView}>
                <View style={{ width: '100%', marginVertical: 50}}>
                    <View style={{width: '100%'}}>
                        <TouchableOpacity onPress={()=> Linking.openURL(accessGoogleUrl)}>
                        <View style={{ margin: 10, backgroundColor: '#C70039', height: 30, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>Connect With Google</Text>
                        </View> 
                        </TouchableOpacity>   
                    </View> 
                    <View style={{ alignItems: 'center'}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18}}>{'\&'}</Text>
                    </View>    
                    <View style={{width: '100%'}}>
                        <TouchableOpacity onPress={()=> Linking.openURL(accessTrelloUrl)}>
                            <View style={{ margin: 10, backgroundColor: '#339CFF', height: 30, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>Connect With Trello</Text>
                            </View>
                        </TouchableOpacity>   
                    </View>    
                </View>    
            </View>    
        </View>
    )
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    statusBarStyle: {
        height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        marginBottom: 20
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
export default GoogleTrelloLogin