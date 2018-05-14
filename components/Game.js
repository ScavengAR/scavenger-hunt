import React from 'react';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo from 'expo';
import {
  View,
  NativeModules,
  StatusBar,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { incrementItems, resetItems } from '../store';
import ExitButton from './ExitButton';
import Timer from './Timer';
import ResultSubmitForm from './ResultSubmitForm';
//seems like global configurations, consider a global config file
console.disableYellowBox = true;
// Turn off three.js warnings...
const originalWarn = console.warn.bind(console);
console.warn = text => !text.includes('THREE') && originalWarn(text); //toggle this off to see effect

const capturedItemMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInSight: null,
      isGameOver: false //consider putting this in store, b/c other components may care that the game ended
    };
    this.gameItems = [];
    this.itemsNum = 2;
  }

  componentDidMount() {
    this.props.resetItems();
  }

  componentDidUpdate() {
    if (this.props.capturedItems === this.itemsNum && !this.state.isGameOver) {
      this.gameOver();
    }
  }

  gameOver() {
    this.setState({ isGameOver: true });
  }

  handlePress = () => {
    const currentCube = this.gameItems[this.state.itemInSight];
    // User captures an item, stop item from animating and turn its color to gray
    currentCube.speed = 0;
    currentCube.material = capturedItemMaterial;

    // capturedItems increments by 1
    if (!currentCube.captured) {
      this.props.incrementItems(this.props.capturedItems);
      currentCube.captured = true;
    }
  };

  // Creates AR experience
  _onGLContextCreate = async gl => {
    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;
    // Starts an AR session
    this.arSession = await this._glView.startARSessionAsync();
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(width, height);
    const scene = new THREE.Scene();

    scene.background = ExpoTHREE.createARBackgroundTexture(
      this.arSession,
      renderer
    );

    const camera = ExpoTHREE.createARCamera(
      this.arSession, // field of view
      width, // aspect ratio
      height, // aspect ratio
      0.01, // near clipping plane
      1000 // far clipping plane
    );

    // Items are added to the AR scene
    generateItems(scene, this.gameItems, this.itemsNum);

    const animate = () => {
      camera.position.setFromMatrixPosition(camera.matrixWorld);
      const cameraPos = new THREE.Vector3(0, 0, 0);
      cameraPos.applyMatrix4(camera.matrixWorld);

      this.gameItems.forEach((cube, idx) => {
        // Animates items for live movement
        cube.rotation.x += cube.speed;
        cube.rotation.y += cube.speed;

        // Updates state to indicate if an itemInSight and prompts capture button
        // .distanceTo(vector) returns the distance between the camera and the items
        let dist = cube.position.distanceTo(camera.position);
        if (this.state.itemInSight === null) {
          if (dist < 0.3 && !cube.captured) {
            this.setState({ itemInSight: idx });
          }
        } else {
          if (idx === this.state.itemInSight && dist > 0.3) {
            this.setState({ itemInSight: null });
          }
        }
      });

      // Adds AR overlay over camera view
      renderer.render(scene, camera);
      gl.endFrameEXP();
      this.gameRequest = requestAnimationFrame(animate);
    };
    animate();
  };

  // Kill ARSession and cancel animation frame request
  async componentWillUnmount() {
    cancelAnimationFrame(this.gameRequest);
    try {
      await NativeModules.ExponentGLViewManager.stopARSessionAsync(
        this.arSession.sessionId
      );
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />

        <Expo.GLView
          ref={ref => (this._glView = ref)}
          style={{ flex: 1 }}
          onContextCreate={this._onGLContextCreate}
        />
        <View style={styles.timer}>
          <Timer
            isGameOver={this.state.isGameOver}
            capturedItems={this.props.capturedItems}
            itemsNum={this.itemsNum}
          />
        </View>
        <View style={styles.exitButton}>
          <ExitButton />
        </View>
        <View style={styles.overlay}>
          {this.state.itemInSight !== null &&
            !this.gameItems[this.state.itemInSight].captured && (
              <Button
                raised
                rounded
                title="Capture"
                onPress={this.handlePress}
                buttonStyle={{ width: 150 }}
              />
            )}
        </View>
        <ResultSubmitForm isGameOver={this.state.isGameOver} />
      </View>
    );
  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    position: 'absolute',
    top: height / 2,
    left: width / 2 - 75
  },
  timer: {
    //consider moving this styling into Timer.js
    position: 'absolute',
    top: 20,
    left: 20
  },
  exitButton: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  score: {
    position: 'absolute',
    top: 20,
    left: 150
  }
});

function generateItems(scene, items, num) {
  //consider making items an empty array then concat ....
  // Creating items
  const geometry = new THREE.BoxGeometry(0.07, 0.07, 0.07); // creates template for a cube
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // creates color for a cube

  // - range / 2 < (x,y,z) < range / 2 (in meters)
  const randomizePosition = (range = 10) => {
    return Math.random() * range - range / 2;
  };

  for (let i = 0; i < num; i++) {
    const cube = new THREE.Mesh(geometry, material);
    randomizePosition(cube);
    cube.position.z = randomizePosition(1); // (-5, 5) meters
    cube.position.x = randomizePosition(1); // (-5, 5) meters
    cube.position.y = randomizePosition(1); // (-0.5, 0.5) meters
    cube.speed = 0.05;
    cube.captured = false;
    scene.add(cube); //consider taking this out so this fn can be abstracted away as a helper fn
    items.push(cube);
  }
}

const mapState = state => {
  return { capturedItems: state.capturedItems };
};

const mapDispatch = dispatch => {
  return {
    incrementItems(count) {
      dispatch(incrementItems(count + 1));
    },
    resetItems() {
      dispatch(resetItems());
    }
  };
};

export default connect(mapState, mapDispatch)(Game);
