/* eslint-disable react/display-name*/

import React from 'react';
import { TabNavigator } from 'react-navigation';
import TutorialStep from '../TutorialStep';
import { Ionicons } from '@expo/vector-icons';

const TutorialNavigator = TabNavigator(
  {
    TutorialStepOne: {
      screen: () => (
        <TutorialStep
          //passing title & desc props so that we can reuse our TutorialStep component
          title={'Game Overview'}
          desc={`This is a simulated scavenger hunt, but with Augmented Reality!`}
          iconName={'ios-phone-portrait'}
        />
      )
    },
    TutorialStepTwo: {
      screen: () => (
        <TutorialStep
          title={'How to Play'}
          desc={`Bananas will randomly drop all around you. Once you are within reach of one, a "capture" button will appear!`}
          iconName={'ios-basket-outline'}
        />
      )
    },
    TutorialStepThree: {
      screen: () => (
        <TutorialStep
          title={'Mission'}
          desc={`Your task is to capture the bananas as quickly as possible. Get ready to search!`}
          iconName={'ios-alarm-outline'}
        />
      )
    }
  },
  {
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-radio-button-on" size={15} color={tintColor} />
      )
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      showLabel: false,
      style: {
        width: 100,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderTopWidth: 0,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
      }
    },
    //allows swiping between steps and lazy: false forces the slides to load before they are accessed for the first time
    swipeEnabled: true,
    lazy: false
  }
);

export default TutorialNavigator;
