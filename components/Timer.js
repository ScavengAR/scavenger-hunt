import React from 'react';
import { Text, View } from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { incrementTime, resetTime } from '../store';
import { convertToTime } from '../utils';

class Timer extends React.Component {
  componentDidMount() {
    this.props.resetTime();
    this.timeIncrement();
  }

  componentDidUpdate() {
    if (this.props.isGameOver) {
      clearInterval(this.intervalId);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timeIncrement = () => {
    this.intervalId = setInterval(
      () => this.props.incrementTime(this.props.time),
      1000
    );
  };

  render() {
    const { time } = this.props;
    return (
      <View>
        <Badge
          containerStyle={{
            backgroundColor: 'white'
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="timer" />
            <Text>{convertToTime(time)}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="food-apple" type="material-community" />
            <Text>
              {this.props.capturedItems} / {this.props.itemsNum}
            </Text>
          </View>
        </Badge>
      </View>
    );
  }
}

const mapState = state => {
  return { time: state.time };
};

const mapDispatch = dispatch => {
  return {
    incrementTime(t) {
      dispatch(incrementTime(t + 1));
    },
    resetTime() {
      dispatch(resetTime());
    }
  };
};

export default connect(mapState, mapDispatch)(Timer);
