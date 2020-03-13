import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, StatusBar, Platform, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { WebView } from 'react-native-webview';


class GoogleTrelloLogin02 extends React.Component {
    constructor() {
        super();
        this.state = {
            accessGoogleUrl: '',
            accessTrelloUrl: '',
            googleAccessToken: '',
            trelloAccessToken: '',
            googleStatus: null,
            trelloStatus: null,
        }

    }
    componentDidMount() {
        this.getGoogleUrl()
        this.getTrelloUrl()
        this.getTokens()
        setInterval(() => this.checkToken(), 1000)
    }
    checkToken = async () => {

        if (this.state.googleAccessToken === '' || this.state.trelloAccessToken == '') {
            this.setState({ googleStatus: null, trelloStatus: null })
        } else if (this.state.googleAccessToken !== null || this.state.trelloAccessToken !== null) {
            this.setState({ googleStatus: 'googleToken', trelloStatus: 'trelloToken' })
            this.props.navigation.navigate('CreateTrigger02', { googleToken: this.state.googleAccessToken, trelloToken: this.state.trelloAccessToken })
        }

    }
    getGoogleUrl = async () => {
        const value = await AsyncStorage.getItem('user_accessToken')
        var token = value.replace(/"/g, '')
        var apiHeader = {
            method: 'GET',
            headers: {
                "Authorization": 'Bearer ' + token
            },
        }
        fetch('http://demo-candi-server.herokuapp.com/api/v1/google/auth/get-authorization-url/', apiHeader
        ).then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.code === 'token_not_valid') {
                    Alert.alert(responseJson.detail)
                    // console.log(responseJson)
                } else if (responseJson.status == 'success') {
                    // console.log(responseJson.data.url)
                    this.setState({ accessGoogleUrl: responseJson.data.url })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    getTrelloUrl = async () => {
        const value = await AsyncStorage.getItem('user_accessToken')
        var token = value.replace(/"/g, '')
        // console.log('token:','Bearer '+token)

        var apiHeader = {
            method: 'GET',
            headers: {
                "Authorization": 'Bearer ' + token
            },
        }
        fetch('http://demo-candi-server.herokuapp.com/api/v1/trello/auth/get-authorization-url/', apiHeader
        ).then((response) => response.json())
            .then(async (responseJson) => {
                // console.log(responseJson)
                this.setState({ accessTrelloUrl: responseJson.data.url })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    getTokens = async () => {
        const value = await AsyncStorage.getItem('user_accessToken')
        var token = value.replace(/"/g, '')
        var apiHeader = {
            method: 'GET',
            headers: {
                "Authorization": 'Bearer ' + token
            },
        }
        fetch('http://demo-candi-server.herokuapp.com/api/v1/user/tokens/', apiHeader
        ).then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson)
                if (responseJson.status == 'success' || responseJson.data.tokens.trello_access_token != null || responseJson.data.tokens.google_access_token != null) {
                    console.log('google: ', responseJson.data.tokens.google_access_token)
                    console.log('trello: ', responseJson.data.tokens.trello_access_token)

                    setInterval(async () =>
                        this.setState({ googleAccessToken: responseJson.data.tokens.google_access_token, trelloAccessToken: responseJson.data.tokens.trello_access_token })
                        , 2000)

                }

            })
            .catch((error) => {
                console.log(error)
            })
    }
    render() {
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
                <View style={styles.bodyView}>
                    <View style={{ width: '100%', marginVertical: 50 }}>
                        <View style={{ width: '100%' }}>
                            <TouchableOpacity onPress={() => Linking.openURL(this.state.accessGoogleUrl)}>
                                <View style={{ margin: 10, backgroundColor: '#C70039', height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Connect With Google</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{'\&'}</Text>
                        </View>
                        <View style={{ width: '100%' }}>
                            <TouchableOpacity onPress={() => Linking.openURL(this.state.accessTrelloUrl)}>
                                <View style={{ margin: 10, backgroundColor: '#339CFF', height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Connect With Trello</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                {(this.state.googleStatus === null || this.state.trelloStatus === null) ?
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: 'red', height: 45, width: '100%', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>Google access token {'\&'} Trello access token not allowed null</Text>
                        </View>
                    </View>
                    :
                    null
                }
            </View>
        )
    }
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
export default GoogleTrelloLogin02;