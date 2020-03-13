import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, StatusBar, TextInput, Platform,Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accessToken, setaccessToken] = useState('');

    useEffect(() => {

    });
    removeData = async () => {
        await AsyncStorage.removeItem('user_accessToken')
    }
    goNext = () => {
        console.log(username)
        console.log(password)
        if (username == '' || password == '') {
            alert('Please fill username and password')
        } else {
            var apiHeader = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            }
            fetch('http://demo-candi-server.herokuapp.com/api/v1/token/', apiHeader
            ).then((response) => response.json())
                .then(async (responseJson) => {
                    console.log(responseJson)
                    
                    if(responseJson.detail){
                       Alert.alert(responseJson.detail)
                    }else{
                        console.log(responseJson.access)
                        setaccessToken(responseJson.access)
                        await AsyncStorage.setItem('user_accessToken', JSON.stringify(responseJson.access))
                        navigation.navigate('GoogleTrelloLogin02')
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
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
                <View style={styles.googleLoginParentView}>
                    <View style={{ marginVertical: 5 }}>
                        <Text>User Login</Text>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <TextInput
                            style={styles.inputBoxView}
                            onChangeText={text => setUsername(text)}
                            placeholder='Enter your email id'
                            autoCapitalize='none'
                            keyboardType='email-address'
                            value={username}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.inputBoxView}
                            onChangeText={text => setPassword(text)}
                            placeholder='Enter your password'
                            secureTextEntry={true}
                            value={password}
                        />
                    </View>
                    <View style={{ alignItems: 'flex-end', margin: 10 }}>
                        <TouchableOpacity onPress={() => this.goNext()}>
                            <View style={styles.loginBtnView}>
                                <Text style={styles.loginBtnText}>Login</Text>
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
        justifyContent: 'center'
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
        margin: 10
    },
    googleLoginParentView: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '100%'
    },
    inputBoxView: {
        height: 30,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5
    },
    loginBtnView: {
        backgroundColor: '#339CFF',
        height: 40,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    loginBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
})
export default Login