import React from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';
import { Font } from 'expo';
import { Text } from 'react-native-elements';
import { FontAwesome, EvilIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { logout } from '../store/auth';
import Toolbar from './Toolbar';

class Home extends React.Component {
  state = {
    loaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      //Could potentially grab from native base
      'nanum-pen-script': require('../assets/NanumScript.ttf'),
      'opensans-light': require('../assets/OpenSans-Light.ttf')
    });
    this.setState({ loaded: true });
  }

  render() {
    const { navigation, currentUser, logoutFunc } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Image
          style={styles.bgImage}
          source={require('../assets/home-bg.png')}
        />
        {this.state.loaded ? (
          <Text style={styles.headerText}>Banana Hunt</Text>
        ) : null}
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <FontAwesome
          name="play-circle"
          size={120}
          onPress={() => navigation.navigate('GameOptionPage')}
          style={styles.icon}
        />
        {this.state.loaded ? (
          <Text
            //Alternative {...styles.loginText, color: 'blue' }
            //Also consider making a function and then feeding arguments for nuances in styling
            style={styles.loginText}
            onPress={() => {
              return currentUser.email
                ? logoutFunc(navigation)
                : navigation.navigate('Login');
            }}
          >
            {currentUser && currentUser.email ? 'null' : 'Login'}
          </Text>
        ) : null}

        <Toolbar />
      </View>
    );
  }
}

const mapStateToProps = storeState => ({
  currentUser: storeState.currentUser
});

const mapDispatchToProps = dispatch => ({
  logoutFunc: navigation => dispatch(logout(navigation))
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E96B63',
    alignItems: 'center'
  },
  bgImage: {
    position: 'absolute',
    resizeMode: 'stretch',
    top: 0
  },
  logo: {
    width: 200,
    height: 200
  },
  headerText: {
    fontFamily: 'nanum-pen-script',
    fontSize: 55,
    color: '#8A4F3B',
    textAlign: 'center'
  },
  loginText: {
    fontFamily: 'opensans-light',
    color: '#F3EED9',
    padding: 20,
    fontSize: 20
  },
  icon: {
    color: '#F3EED9',
    paddingTop: 10,
    alignSelf: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
