import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

const ExitButton = ({ navigation }) => (
  <Icon
    name="cancel"
    raised
    size={25}
    onPress={() => navigation.navigate('Main')} // with navigation possible component wrapper usage here
  />
);

export default ExitButton;
