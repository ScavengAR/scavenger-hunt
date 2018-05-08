import React from 'react'; // don't need
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import Start from './components/Start';
import Game from './components/Game';

const RootNavigator = StackNavigator({
  Main: { // main versus home
    screen: Home,
    navigationOptions: {
      headerTitle: 'ScavengAR Hunt'
    }
  },
  Start: {
    screen: Start,
    navigationOptions: {
      headerTitle: 'Get Ready!'
    }
  },
  Game: {
    screen: Game,
    navigationOptions: {
      headerTitle: 'Find the Items!'
    }
  }
}); // look into navigation options and there's lots of cool settings to try and play with (initial route)
// look into nested navigators b/c state gets saved and very memory intensive with AR
// Omri:  component will unmount, kills the three.js scene and CLEAN UP post-game?

/*
const bar = StackNavigator({
  Main: { // main versus home
    screen: foo,
    navigationOptions: {
      headerTitle: 'ScavengAR Hunt'
    }
  },
  Start: {
    screen: Start,
    navigationOptions: {
      headerTitle: 'Get Ready!'
    }
  },
  Game: {
    screen: Game,
    navigationOptions: {
      headerTitle: 'Find the Items!'
    }
  }
   */

export default RootNavigator;
