import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import Game from './components/Game';
import Login from './components/Login';
import Signup from './components/Signup';
import Leaderboard from './components/Leaderboard';
import TutorialNavigator from './components/TutorialNavigator';

const RootNavigator = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerTitle: 'Home',
        swipeEnabled: true,
        headerLeft: null
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerTitle: 'Login'
      }
    },
    // Signup: {
    //   screen: Signup,
    //   navigationOptions: {
    //     headerTitle: 'SignUp'
    //   }
    // },
    Instructions: {
      screen: TutorialNavigator,
      navigationOptions: {
        headerTitle: 'Get Ready!'
      }
    },
    Game: {
      screen: Game,
      navigationOptions: {
        header: 'none'
      }
    },
    Leaderboard: {
      screen: Leaderboard,
      navigationOptions: {
        headerTitle: 'Leaderboard'
      }
    }
  },
  {
    navigationOptions: {
      header: 'none'
    }
  }
);

const App = () => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
);

export default App;
