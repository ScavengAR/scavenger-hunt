import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import Game from './components/Game';
import Login from './components/Login';
import Signup from './components/Signup';
import GameOptionPage from './components/GameOptionPage';
import Leaderboard from './components/Leaderboard';
import CustomGameList from './components/CustomGameList';
import TutorialNavigator from './components/Navigators/TutorialNavigator';
import CustomTutorialNavigator from './components/Navigators/CustomTutorialNavigator';
import { isSignedIn } from './auth';

const RootNavigator = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        swipeEnabled: true,
        headerLeft: null
      }
    },
    Login: {
      screen: Login
    },
    Signup: {
      screen: Signup,
      swipeEnabled: true
    },
    Instructions: {
      screen: TutorialNavigator
    },
    Game: {
      screen: Game
    },
    Leaderboard: {
      screen: Leaderboard
    },
    GameOptionPage: {
      screen: GameOptionPage
    },
    CustomGameList: {
      screen: CustomGameList
    },
    CustomInstructions: {
      screen: CustomTutorialNavigator
    }
  },
  {
    navigationOptions: {
      header: 'none'
    }
  }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
