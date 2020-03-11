import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StatusBar, ScrollView, Platform, StyleSheet } from 'react-native';
// import Dialog, { DialogTitle, DialogContent, DialogButton, SlideAnimation, ScaleAnimation, } from 'react-native-popup-dialog';
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';

class Test extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            listData: [],
            boardDialog: false,
            selectedBoard: 'Select Board',
            selectedBoardID: '',
            ListDialog: false,
            selectedList: 'Select List',
            selectedListID: '',
        }
    }
    componentDidMount() {
        this.getBoardData()
    }
    getBoardData = () => {
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
        fetch('https://api.trello.com/1/members/' + name + '/boards?filter=all&fields=all&lists=none&memberships=none&organization=false&organization_fields=name%2CdisplayName&key=' + key + '&token=' + token, apiHeader
        ).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    setBoard = (name, id) => {
        console.log(id)
        this.setState({ selectedBoard: name, selectedBoardID: id, boardDialog: false })
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
        fetch('https://api.trello.com/1/boards/' + id + '/lists?cards=none&card_fields=all&filter=open&fields=all&key=' + key + '&token=' + token, apiHeader
        ).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ listData: responseJson })
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
                    <View style={{ borderWidth: 0.5, borderColor: '#ccc', padding: 5, paddingBottom: 10, borderRadius: 5 }}>
                        <View style={styles.customCardView}>
                            <Text style={styles.customCardText}>Customize Card</Text>
                        </View>
                        <View style={styles.boardView}>
                            <Text style={styles.boardText}>Board</Text>
                        </View>
                        <View style={{ height: 30, width: '100%' }}>
                            <TouchableOpacity onPress={() => this.setState({
                                boardDialog: true,
                            })}>
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
                                this.setState({ boardDialog: false });
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
                                        onPress={() => { this.setState({ boardDialog: false }) }}
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
                                        this.state.data.map((data, index) => {
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
                            <TouchableOpacity onPress={() => this.setState({
                                ListDialog: true,
                            })}>
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
                                this.setState({ ListDialog: false });
                            }}
                            width={320}

                            visible={this.state.ListDialog}
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
                                        onPress={() => { this.setState({ ListDialog: false }) }}
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
                                        this.state.listData.map((data, index) => {
                                            return (
                                                <View style={styles.dropdownList}>
                                                    <TouchableOpacity onPress={() => this.setState({ selectedList: data.name, selectedListID: data.id, ListDialog: false })}>
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
export default Test