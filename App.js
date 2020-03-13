import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import Splash from './src/components/Splash'
import CreateTrigger02 from './src/components/CreateTrigger02'
import Login from './src/components/Login'
import Test from './src/components/Test'
import GoogleTrelloLogin from './src/components/GoogleTrelloLogin'
import GoogleTrelloLogin02 from './src/components/GoogleTrelloLogin02'
import GoogleWebview from './src/components/GoogleWebview'

function App() {
  return (
    <AppContainer />
  )
}
const AppStackNavigator = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      headerShown: false,
    },
  },
  Test: {
    screen: Test,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  CreateTrigger02: {
    screen: CreateTrigger02,
    navigationOptions: {
      headerShown: false,
    },

  },
  GoogleTrelloLogin: {
    screen: GoogleTrelloLogin,
    navigationOptions: {
      headerShown: false,
    },
  },
  GoogleTrelloLogin02: {
    screen: GoogleTrelloLogin02,
    navigationOptions: {
      headerShown: false,
    },
  },
  GoogleWebview: {
    screen: GoogleWebview,
    navigationOptions: {
      headerShown: false,
    },
  }
});
const AppContainer = createAppContainer(AppStackNavigator);
export default App;