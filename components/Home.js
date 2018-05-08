import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation'; // dead code
import { Text, Button } from 'react-native-elements';
import Start from './Start';

// import { AsyncStorage } from 'react-native'; (NOT SECURE)
// Realm.js gives you secure async storage natively on the device.

// AsyncStorage.get(...) based on promises!
// AsyncStorage.set(...) based on promises! => see documentation (set user: HasVisited to true or false)

// const Home = ({ navigation }) => ( // dead code
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };

    this.toggleVisible = this.toggleVisible.bind(this);
  }

  toggleVisible() {
    this.setState({ isVisible: !this.state.isVisible }); // use navigation possibly for UI?  Use async storage to detect first time user?
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={require('../assets/globe.jpg')}
          resizeMode="cover"
        />
        <Text h2 style={styles.text}>
          Welcome to ScavengAR Hunt!
        </Text>
        <Text h4 style={styles.text}>
          An Augmented Reality Scavenger Hunt
        </Text>
        <Button
          // onPress={() => navigation.navigate('Start')} // remove comments
          onPress={() => this.setState({ isVisible: true })}
          raised
          rounded
          title="PLAY"
          backgroundColor="#AD00B2"
        />
        <Start
          visible={this.state.isVisible}
          // navigation={this.props.navigation} // remove comments
          toggleVisible={this.toggleVisible}
        />
      </View>
    );
  }
}

// global stylesheet that all components import from to replicate typical CSS-ish flow and reuse
// look into rn-elements or native base

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  text: {
    color: 'white',
    textAlign: 'center',
    padding: 10
  },
  backgroundImage: {
    height: '100%',
    position: 'absolute'
  }
});
