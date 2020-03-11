import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StatusBar, ScrollView, Platform, StyleSheet, Alert } from 'react-native';
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

class CreateTrigger02 extends React.Component {
    constructor(){
        super()
        this.state={
           board: [],
           list :[],
            boardDialog: false,
            listDialog: false,
            selectedBoard: 'Select Board',
            selectedList: 'Select List',
            selectedBoardID: '',
            selectedListID: '',

            spreadsheetData: [],
            selectedSpreadsheet: 'Select Spreadsheet',
            spreadsheetDialog: false,
            selectedSpreadsheetID: '',

            trig_trelloToken: '',
            trig_googleToken: '',
            refreshToken: '',
        }
        
    }
    componentDidMount(){
        this.getGoogleSpreadSheet();
        this.getBoardData();
    }
    getBoardData = () => {
        let trelloToken = this.props.navigation.getParam('trelloToken')
        var t_token = trelloToken.replace(/"/g, '')
        let token = '373053e436d6468baf0b6816e5b359671ef6f59d0ebdeaa638e4d5ae6016edf2'
        let key = 'eaf7e8cc1470430f9abac34936ee8111'
        let name = 'shahbajsayyad'
        var apiHeader = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Connection": "keep-alive",
                "Content-Type": "application/x-www-form-urlencoded",
                "accept-encoding": "gzip,deflate",
                "cache-control": "no-cache,no-cache"
            },
        }
        fetch('https://api.trello.com/1/members/me/boards?filter=all&fields=all&lists=none&memberships=none&organization=false&organization_fields=name%2CdisplayName&key=' + key + '&token=' + t_token, apiHeader
        ).then((response) => response.json())
            .then((responseJson) => {
                this.setState({board: responseJson})
            })
            .catch((error) => {
                console.log(error)
            })
    }
    setBoard = (name, id) => {
        let trelloToken = this.props.navigation.getParam('trelloToken')
        var t_token = trelloToken.replace(/"/g, '')
        console.log(name)
        console.log(id)
        this.setState({selectedBoard: name});
        this.setState({selectedBoardID: id});
        this.setState({boardDialog: false});
        let token = '373053e436d6468baf0b6816e5b359671ef6f59d0ebdeaa638e4d5ae6016edf2'
        let key = 'eaf7e8cc1470430f9abac34936ee8111'
        var apiHeader = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Connection": "keep-alive",
                "Content-Type": "application/x-www-form-urlencoded",
                "accept-encoding": "gzip,deflate",
                "cache-control": "no-cache,no-cache"
            },
        }
        fetch('https://api.trello.com/1/boards/' + id + '/lists?cards=none&card_fields=all&filter=open&fields=all&key=' + key + '&token=' + t_token, apiHeader
        ).then((response) => response.json())
            .then((responseJson) => {
                this.setState({list: responseJson})
            })
            .catch((error) => {
                console.log(error)
            })
    }
    setList = (name, id) => {
        this.setState({ selectedList: name})
        this.setState({selectedListID: id}) 
        this.setState({listDialog: false})
    }
    getGoogleSpreadSheet = () => {
        
        let googleToken = this.props.navigation.getParam('googleToken')
        var  g_token = googleToken.replace(/"/g, '')
        
        // let authToken = 'ya29.a0Adw1xeVAOuyYSz-i0jeFHo2_48LN0nBXlzrGp13ZM55x841rcHglPHAPoVDAjXpp8MLLhZ9isLYdC-ax_bnqDeYdQKvKKGxeHbR4wuOFh3WEHn9pTExEFAubvuFIu_a8i62ro3sKTpdQJEfbp3FMNw5xB484SKDwBlk'
        var apiHeader = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Connection": "keep-alive",
                "Content-Type": "application/x-www-form-urlencoded",
                "accept-encoding": "gzip,deflate",
                "cache-control": "no-cache,no-cache",
                "Authorization": 'Bearer ' + g_token
            },
        }
        fetch("https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.spreadsheet'", apiHeader
        ).then((response) => response.json())
            .then((responseJson) => {
                console.log('...',responseJson) 
                // if(responseJson.error.code == '401'){

                // }else{
                    this.setState({spreadsheetData: responseJson.files})
                // }
                
            })
            .catch((error) => {
                console.log(error)
            })
    }
    // refreshToken = async() => {
    //     let userToken = await AsyncStorage.getItem('user_accessToken')
    //     var apiHeader = {
    //         method: 'GET',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Connection": "keep-alive",
    //             "Content-Type": "application/x-www-form-urlencoded",
    //             "accept-encoding": "gzip,deflate",
    //             "cache-control": "no-cache,no-cache",
    //             "Authorization": 'Bearer ' + userToken
    //         },
    //     }
    //     fetch("http://demo-candi-server.herokuapp.com/api/v1/token/", apiHeader
    //     ).then((response) => response.json())
    //         .then((responseJson) => {
    //             console.log('...',responseJson) 
    //             this.setState({refreshToken : responseJson.data.google_access_token})
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }
    setSpreadsheets = (name, id) => {
        console.log(id)
        this.setState({selectedSpreadsheet: name})
        this.setState({selectedSpreadsheetID: id})
        this.setState({spreadsheetDialog: false})
    }
    createTrigger = async() => {
        console.log(this.state.selectedSpreadsheetID)
        console.log(this.state.selectedListID)
        let userToken = await AsyncStorage.getItem('user_accessToken')
        var token = userToken.replace(/"/g, '')
        console.log(token)
            var apiHeader = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + token
                },
                body: JSON.stringify({
                    list_id: this.state.selectedListID,
                    spreadsheet_key	: this.state.selectedSpreadsheetID,
                  }),
            }
            fetch("http://demo-candi-server.herokuapp.com/api/v1/create-trigger/", apiHeader
            ).then((response) => response.json())
                .then((responseJson) => {
                    console.log('trig',responseJson) 
                    Alert.alert(responseJson.status)
                    
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
                backgroundColor="#ff4081"
                translucent={false}
                networkActivityIndicatorVisible={true}
            />
        </View>
        <View style={styles.bodyView}>
            {/*  start google*/}
            <View style={{ borderWidth: 0.5, borderColor: '#ccc', padding: 5, paddingBottom: 10, borderRadius: 5, marginVertical: 10 }}>
                <View style={styles.customCardView}>
                    <Text style={styles.customCardText}>Customize Response</Text>
                </View>
                <View style={styles.boardView}>
                    <Text style={styles.boardText}>Spreadsheet</Text>
                </View>
                <View style={{ height: 30, width: '100%' }}>
                    <TouchableOpacity onPress={() =>
                        this.setState({spreadsheetDialog: true})
                    }>
                        <View style={styles.dropdownBox}>
                            <View style={{ width: '90%' }}>
                                <Text style={styles.selectedText}>{this.state.selectedSpreadsheet}</Text>
                            </View>
                            <View style={{ width: '10%' }}>
                                <Icon name='caret-down' size={20} color='#000' />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Dialog
                    onDismiss={() => {
                        this.setState({spreadsheetDialog: false})
                    }}
                    width={320}

                    visible={this.state.spreadsheetDialog}
                    rounded
                    dialogTitle={
                        <DialogTitle
                            title="Select Your Spreadsheet"
                            style={{
                                backgroundColor: '#F7F7F8',
                            }}
                            hasTitleBar={false}
                            align="center"
                        />
                    }
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="CANCEL"
                                onPress={() => { this.setState({spreadsheetDialog: false}) }}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent
                        style={{
                            backgroundColor: '#F7F7F8',
                            // height: 360
                        }}
                    >
                        <ScrollView style={{ margin: 10, }}>
                            {
                                (this.state.spreadsheetData === null)?
                                <Text>No Data Found...</Text>
                                :
                                this.state.spreadsheetData.map((data, index) => {
                                    return (
                                        <View style={styles.dropdownList}>
                                            <TouchableOpacity onPress={() => this.setSpreadsheets(data.name, data.id)}>
                                                <Text>{data.name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </DialogContent>
                </Dialog>
                {/* end board dialog */}
                
                {/* End List Dialog */}
            </View>
            {/* start trello */}
            <View style={{ borderWidth: 0.5, borderColor: '#ccc', padding: 5, paddingBottom: 10, borderRadius: 5 }}>
                <View style={styles.customCardView}>
                    <Text style={styles.customCardText}>Customize Card</Text>
                </View>
                <View style={styles.boardView}>
                    <Text style={styles.boardText}>Board</Text>
                </View>
                <View style={{ height: 30, width: '100%' }}>
                    <TouchableOpacity onPress={() =>
                        this.setState({boardDialog: true})
                    }>
                        <View style={styles.dropdownBox}>
                            <View style={{ width: '90%' }}>
                                <Text style={styles.selectedText}>{this.state.selectedBoard}</Text>
                            </View>
                            <View style={{ width: '10%' }}>
                                <Icon name='caret-down' size={20} color='#000' />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Dialog
                    onDismiss={() => {
                        this.setState({boardDialog: false})
                    }}
                    width={320}

                    visible={this.state.boardDialog}
                    rounded
                    dialogTitle={
                        <DialogTitle
                            title="Select Trello Board"
                            style={{
                                backgroundColor: '#F7F7F8',
                            }}
                            hasTitleBar={false}
                            align="center"
                        />
                    }
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="CANCEL"
                                onPress={() => { this.setState({boardDialog: false}) }}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent
                        style={{
                            backgroundColor: '#F7F7F8',
                            // height: 360
                        }}
                    >
                        <ScrollView style={{ margin: 10, }}>
                            {
                                this.state.board.map((data, index) => {
                                    return (
                                        <View style={styles.dropdownList}>
                                            <TouchableOpacity onPress={() => this.setBoard(data.name, data.id)}>
                                                <Text>{data.name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </DialogContent>
                </Dialog>
                {/* end board dialog */}
                <View style={styles.boardView}>
                    <Text style={styles.boardText}>List</Text>
                </View>
                <View style={{ height: 30, width: '100%' }}>
                    <TouchableOpacity onPress={() =>
                        this.setState({listDialog: true})
                    }>
                        <View style={styles.dropdownBox}>
                            <View style={{ width: '90%' }}>
                                <Text style={styles.selectedText}>{this.state.selectedList}</Text>
                            </View>
                            <View style={{ width: '10%' }}>
                                <Icon name='caret-down' size={20} color='#000' />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Dialog
                    onDismiss={() => {
                        this.setState({listDialog: false})
                    }}
                    width={320}

                    visible={this.state.listDialog}
                    rounded
                    dialogTitle={
                        <DialogTitle
                            title="Select Trello Board List"
                            style={{
                                backgroundColor: '#F7F7F8',
                            }}
                            hasTitleBar={false}
                            align="center"
                        />
                    }
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="CANCEL"
                                onPress={() => { this.setState({listDialog: false}) }}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent
                        style={{
                            backgroundColor: '#F7F7F8',
                            // height: 360
                        }}
                    >
                        <ScrollView style={{ margin: 10, }}>
                            {
                                this.state.list.map((data, index) => {
                                    return (
                                        <View style={styles.dropdownList}>
                                            {/* <TouchableOpacity onPress={() => }> */}
                                            <TouchableOpacity onPress={() => this.setList(data.name, data.id)}>
                                                <Text>{data.name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </DialogContent>
                </Dialog>
                {/* End List Dialog */}
            </View>
        </View>
        {/* End Body */}
        <View style={{ alignItems: 'flex-end', margin: 10 }}>
            <TouchableOpacity onPress={()=> this.createTrigger()}>
                <View style={{ backgroundColor: '#339CFF', height: 40, width: 120, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Trigger</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
      )
    }
  }
  const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    statusBarStyle: {
        height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        marginBottom: 20
    },
    bodyView: {
        margin: 10
    },
    customCardView: {
        marginVertical: 10
    },
    customCardText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    boardView: {
        marginVertical: 10
    },
    boardText: {
        fontWeight: 'normal',
        fontSize: 16
    },
    dropdownBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.4,
        borderColor: '#ccc',
        padding: 5
    },
    selectedText: {
        fontSize: 14,
        fontWeight: 'normal'
    },
    dropdownList: {
        borderWidth: 0.3,
        borderRadius: 5,
        borderBottomColor: '#ccc',
        marginVertical: 1,
        padding: 5
    },
});
  export default CreateTrigger02