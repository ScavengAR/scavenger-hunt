import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import HomeIcon from './HomeIcon';

const GameOptionPage = ({ navigation }) => (
  <View style={styles.container}>
    <Image style={styles.bgImage} source={require('../assets/home-bg.png')} />
    <HomeIcon />
    <View style={styles.buttonsContainer}>
      <Button
        style={styles.gameOptionBtn}
        onPress={() => navigation.navigate('Game')}
        raised
        rounded
        title="Play Now"
        backgroundColor="#F3EED9"
        color="gray"
      />
      <Button
        style={styles.gameOptionBtn}
        onPress={() => navigation.navigate('CustomGameList')}
        raised
        rounded
        title="Play Custom Game"
        backgroundColor="#F3EED9"
        color="gray"
      />
      <Button
        style={styles.gameOptionBtn}
        onPress={() => navigation.navigate('CustomInstructions')}
        raised
        rounded
        title="Create Custom Game"
        backgroundColor="#F3EED9"
        color="gray"
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E96B63',
    flex: 1,
    paddingHorizontal: 20
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgImage: {
    position: 'absolute',
    resizeMode: 'stretch',
    top: 0
  },
  gameOptionBtn: {
    justifyContent: 'center',
    borderRadius: 20,
    width: 300,
    marginBottom: 40,
    alignSelf: 'center'
  }
});

export default connect()(GameOptionPage);
