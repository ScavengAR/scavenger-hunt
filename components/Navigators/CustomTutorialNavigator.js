/* eslint-disable react/display-name*/
import React from 'react';
import { TabNavigator } from 'react-navigation';
import TutorialStep from '../TutorialStep';
import { Ionicons } from '@expo/vector-icons';

const CustomTutorialNavigator = TabNavigator(
  {
    CustomTutorialStepOne: {
      screen: () => (
        <TutorialStep
          //passing title & desc props so that we can reuse our TutorialStep component
          title={'Pin Location'}
          desc={`The first step is to pin your current location as the starting point.`}
          iconName={'ios-pin'}
        />
      )
    },
    CustomTutorialStepTwo: {
      screen: () => (
        <TutorialStep
          title={'Give Instructions'}
          desc={`Enter details of where to face to get started. Example: Stand ~1 foot away from the center of the mailbox.`}
          iconName={'ios-create-outline'}
        />
      )
    },
    CustomTutorialStepThree: {
      screen: () => (
        <TutorialStep
          title={'Drop Bananas'}
          desc={`As you walk around, hit the "Drop" button to leave bananas in your path!`}
          img={require('../../assets/banana-128.png')}
        />
      )
    },
    CustomTutorialStepFour: {
      screen: () => (
        <TutorialStep
          title={'Save Map'}
          desc={`Once you're all set, hit "Save." Now others can participate in your banana hunt as well!`}
          iconName={'ios-share-outline'}
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

export default CustomTutorialNavigator;
