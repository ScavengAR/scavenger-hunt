import React from 'react';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo from 'expo';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
console.disableYellowBox = true;

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // maybe REDUX for state management depending on your state complexity
      camPos: { x: 0, y: 0, z: 0 },
      itemInSight: null,
      currScore: 0, // remove comma
    };
    this.gameItems = [];
    this.capturedItemMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc }); // maybe a constant outside of the class
    this.handlePress = this.handlePress.bind(this) // also be able to do with class arrow function which the 'this' context is bound now to the instance
  }

  handlePress(e){
    let currentCube = this.gameItems[this.state.itemInSight] // const instead of let here
    // User captures an item, stop item from animating and turn its color to gray
    currentCube.speed = 0
    currentCube.material = this.capturedItemMaterial;

    // User's score increments by 1
    if ( !currentCube.captured ) {
      let newScore = this.state.currScore + 1 // semi-colon inconsistenties
      this.setState({currScore: newScore})
      currentCube.captured = true;
    }
  }

// documenting comments are useful for both developers and code-readers
  _onGLContextCreate = async gl => {
    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;
    const arSession = await this._glView.startARSessionAsync();
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer);

    const camera = ExpoTHREE.createARCamera(
      arSession,
      width,
      height,
      0.01,
      1000
    ); // Omri:  is there a stopARSession?

    const geometry = new THREE.BoxGeometry(0.07, 0.07, 0.07);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    const randomizePosition = () => {
      return Math.round(Math.random() * 5 - 2.5); // Andrew:  maybe don't need Math.round (make them slightly apart)
    };

// comments here would help, maybe wrap into a function too?  or make into a utility function?
    for (let i = 0; i < 10; i++) {
      const cube = new THREE.Mesh(geometry, material);
      randomizePosition(cube);
      cube.position.z = randomizePosition();
      cube.position.x = randomizePosition(); // calibrate phone angles in modal to start game, check with Expo.permissions
      cube.position.y = 0;
      cube.speed = 0.05
      cube.captured = false;
      scene.add(cube); // Omri:  Overlapping cubes bug -> shuffle arrays first?
      this.gameItems.push(cube);
    }


    const animate = () => {
      camera.position.setFromMatrixPosition(camera.matrixWorld);
      const cameraPos = new THREE.Vector3(0, 0, 0);
      cameraPos.applyMatrix4(camera.matrixWorld);
      this.setState({ camPos: camera.position });

      this.gameItems.forEach((cube, idx) => {
        cube.rotation.x += cube.speed;
        cube.rotation.y += cube.speed;
        // this.setState({ distance: cube.position.distanceTo(camera.position) });
        let dist = cube.position.distanceTo(camera.position);
        if (this.state.itemInSight === null) {
          if (dist < 0.3) this.setState({ itemInSight: idx });
        } else {
          if (idx === this.state.itemInSight && dist > 0.3) this.setState({ itemInSight: null });
        }
      });

      renderer.render(scene, camera);
      gl.endFrameEXP();
      requestAnimationFrame(animate); // Omri:  detect maybe when it's not mounted anymore?  or kill it somehow?
    };
    animate(); // this needs to stop at some point!  memory intensive!!
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <Expo.GLView
          ref={ref => (this._glView = ref)} // what is ref?  // comments please // Omri:  should run twice, once when GL view mounts and unmounts, could check if ref exists first
          style={{ flex: 1 }} // don't need flex: 1
          onContextCreate={this._onGLContextCreate}
        />
        <View style={styles.overlay}>
          <Text>Camera X: {this.state.camPos.x}</Text>
          <Text>Camera Y: {this.state.camPos.y}</Text>
          <Text>Camera Z: {this.state.camPos.z}</Text>
          <Text>itemInSight: {this.state.itemInSight}</Text>
          <Text>currScore: {this.state.currScore}</Text>
          { this.state.itemInSight !== null && !this.gameItems[this.state.itemInSight].captured ?
            (<Button title="Capture" onPress={this.handlePress}/>)
            :
            (<Text>Not close enough</Text>)
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%'
  }
});
