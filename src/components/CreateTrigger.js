import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StatusBar, ScrollView, Platform, StyleSheet } from 'react-native';
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';

function CreateTrigger({ navigation }) {
    const [board, setboard] = useState([]);
    const [list, setlist] = useState([]);
    const [boardDialog, setboardDialog] = useState(false);
    const [listDialog, setlistDialog] = useState(false);
    const [selectedBoard, setselectedBoard] = useState('Select Board');
    const [selectedList, setselectedList] = useState('Select List');
    const [selectedBoardID, setselectedBoardID] = useState('');
    const [selectedListID, setselectedListID] = useState('');

    const [spreadsheetData, setSpreadsheetData] = useState([]);
    const [selectedSpreadsheet, setselectedSpreadsheet] = useState('Select Spreadsheet');
    const [spreadsheetDialog, setSpreadsheetDialog] = useState(false);
    const [selectedSpreadsheetID, setselectedSpreadsheetID] = useState('');

    useEffect(() => {
        getBoardData();
        getGoogleSpreadSheet();
    }, [])

    getBoardData = () => {
        let trelloToken = navigation.getParam('trelloToken')
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
        fetch('https://api.trello.com/1/members/me/boards?filter=all&fields=all&lists=none&memberships=none&organization=false&organization_fields=name%2CdisplayName&key=' + key + '&token=' + trelloToken, apiHeader
        ).then((response) => response.json())
            .then((responseJson) => {
                setboard(responseJson)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    setBoard = (name, id) => {
        console.log(name)
        console.log(id)
        setselectedBoard(name);
        setselectedBoardID(id);
        setboardDialog(false);
        let trelloToken = navigation.getParam('trelloToken')
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
        fetch('https://api.trello.com/1/boards/' + id + '/lists?cards=none&card_fields=all&filter=open&fields=all&key=' + key + '&token=' + trelloToken, apiHeader
        ).then((response) => response.json())
            .then((responseJson) => {
                setlist(responseJson)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    setList = (name, id) => {
        setselectedList(name), setselectedListID(id), setlistDialog(false)
    }
    getGoogleSpreadSheet = () => {
        let googleToken = navigation.getParam('googleToken')
        let authToken = 'ya29.Il_BBxqgLHyV97rrohDXuqMJmcqdUbIPQKuftkIKhqEQywNNKGSq-4etpor477UFkr5JLlf6xE3G4XPkoskPatu0s5RYvoa2FQ1MJsRM0GsNpNc-juLqJkgleCIrgqtMAQ'
        var apiHeader = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Connection": "keep-alive",
                "Content-Type": "application/x-www-form-urlencoded",
                "accept-encoding": "gzip,deflate",
                "cache-control": "no-cache,no-cache",
                "Authorization": 'Bearer ' + googleToken
            },
        }
        fetch("https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.spreadsheet'", apiHeader
        ).then((response) => response.json())
            .then((responseJson) => {
                console.log('...',responseJson.files)   
                setSpreadsheetData(responseJson.files)
                
            })
            .catch((error) => {
                console.log(error)
            })
    }
    setSpreadsheets = (name, id) => {
        console.log(id)
        setselectedSpreadsheet(name)
        setselectedSpreadsheetID(id)
        setSpreadsheetDialog(false)
    }
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
                            setSpreadsheetDialog(true)
                        }>
                            <View style={styles.dropdownBox}>
                                <View style={{ width: '90%' }}>
                                    <Text style={styles.selectedText}>{selectedSpreadsheet}</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <Icon name='caret-down' size={20} color='#000' />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Dialog
                        onDismiss={() => {
                            setSpreadsheetDialog(false)
                        }}
                        width={320}

                        visible={spreadsheetDialog}
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
                                    onPress={() => { setSpreadsheetDialog(false) }}
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
                                    (spreadsheetData == undefined)?
                                    <Text>No Data Found...</Text>
                                    :
                                    spreadsheetData.map((data, index) => {
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
                    {/* <View style={styles.boardView}>
                            <Text style={styles.boardText}>Worksheet</Text>
                        </View>
                        <View style={{ height: 30, width: '100%' }}>
                            <TouchableOpacity onPress={() => 
                                setlistDialog(true)
                            }>
                                <View style={styles.dropdownBox}>
                                    <View style={{ width: '90%' }}>
                                        <Text style={styles.selectedText}>{selectedList}</Text>
                                    </View>
                                    <View style={{ width: '10%' }}>
                                        <Icon name='caret-down' size={20} color='#000' />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Dialog
                            onDismiss={() => {
                                setlistDialog(false)
                            }}
                            width={320}

                            visible={listDialog}
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
                                        onPress={() => {setlistDialog(false) }}
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
                                        list.map((data, index) => {
                                            return (
                                                <View style={styles.dropdownList}>
                                                    <TouchableOpacity onPress={()=> this.setList(data.name, data.id)}>    
                                                        <Text>{data.name}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </DialogContent>
                        </Dialog> */}
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
                            setboardDialog(true)
                        }>
                            <View style={styles.dropdownBox}>
                                <View style={{ width: '90%' }}>
                                    <Text style={styles.selectedText}>{selectedBoard}</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <Icon name='caret-down' size={20} color='#000' />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Dialog
                        onDismiss={() => {
                            setboardDialog(false)
                        }}
                        width={320}

                        visible={boardDialog}
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
                                    onPress={() => { setboardDialog(false) }}
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
                                    board.map((data, index) => {
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
                            setlistDialog(true)
                        }>
                            <View style={styles.dropdownBox}>
                                <View style={{ width: '90%' }}>
                                    <Text style={styles.selectedText}>{selectedList}</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <Icon name='caret-down' size={20} color='#000' />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Dialog
                        onDismiss={() => {
                            setlistDialog(false)
                        }}
                        width={320}

                        visible={listDialog}
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
                                    onPress={() => { setlistDialog(false) }}
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
                                    list.map((data, index) => {
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
                <View style={{ backgroundColor: '#339CFF', height: 40, width: 120, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Trigger</Text>
                </View>
            </View>
        </View>
    )
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
export default CreateTrigger