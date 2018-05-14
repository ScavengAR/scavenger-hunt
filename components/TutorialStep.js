import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { skipTutorialNavigation } from '../utils';

const TutorialStep = ({ navigation, title, desc, iconName, img }) => (
  <View style={styles.container}>
    <View style={styles.instructionsContainer}>
      <Text h2 style={styles.text}>
        {title}
      </Text>
      {iconName ? (
        <Ionicons name={iconName} size={130} color={'white'} />
      ) : (
        <Image source={img} size={130} />
      )}
      <Text h4 style={styles.text}>
        {desc}
      </Text>
      <Button
        style={{ width: 150 }}
        onPress={() => skipTutorialNavigation(navigation, title)}
        raised
        rounded
        title={
          title === 'Mission' || title === 'Save Map'
            ? "I'm ready!"
            : 'Skip Tutorial'
        }
        backgroundColor="white"
        color="gray"
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3FBE94',
    flex: 1,
    paddingTop: 20,
    paddingBottom: 100
  },
  instructionsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20,
    padding: 10
  },
  text: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'white',
    padding: 10,
    fontFamily: 'OriyaSangamMN'
  }
});

export default withNavigation(TutorialStep);
