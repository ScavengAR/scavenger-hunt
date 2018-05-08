import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'; // dead code
import { Badge, Icon } from 'react-native-elements';

// there is a module for this react-native-timer (user yours!)

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
    this.timeIncrement = this.timeIncrement.bind(this); // can be arrow functions
    this.convertToTime = this.convertToTime.bind(this); // "class arrow syntax"
  }

  timeIncrement() { // i.e. timeIncrement = () => { something };
    let currentTime = this.state.time;
    setTimeout(() => { // can totally just use setInterval to break the mutually recursive relationship.
      currentTime++;
      this.setState({ time: currentTime }); // this.setState((prevState) => do something);
    }, 1000);
  }

  convertToTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return `${minutes}:${seconds}`;
  }

  render() {
    this.timeIncrement();
    return (
      <View>
        <Badge
          containerStyle={{
            backgroundColor: 'white',
            flexDirection: 'row'
          }}
        >
          <Icon name="timer" />
          <Text> {this.convertToTime(this.state.time)}</Text>
        </Badge>
      </View>
    );
  }
}
