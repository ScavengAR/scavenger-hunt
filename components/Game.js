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
    this.state = {
      camPos: {
        x: 0,
        y: 0,
        z: 0
      },
      currItem: null
    };
  }

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
    );

    const geometry = new THREE.BoxGeometry(0.07, 0.07, 0.07);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const objects = [];

    const randomizePosition = () => {
      return Math.round(Math.random() * 10 - 5);
    };

    for (let i = 0; i < 10; i++) {
      const cube = new THREE.Mesh(geometry, material);
      randomizePosition(cube);
      // cube.position.z = -0.4;
      // cube.position.x = 0;
      // cube.position.y = 0;
      cube.position.z = randomizePosition();
      cube.position.x = randomizePosition();
      cube.position.y = 0;
      scene.add(cube);
      objects.push(cube);
    }

    const animate = () => {
      camera.position.setFromMatrixPosition(camera.matrixWorld);
      const cameraPos = new THREE.Vector3(0, 0, 0);
      cameraPos.applyMatrix4(camera.matrixWorld);
      this.setState({ camPos: camera.position });

      objects.forEach((cube, idx) => {
        cube.rotation.x += 0.07;
        cube.rotation.y += 0.04;
        // this.setState({ distance: cube.position.distanceTo(camera.position) });
        let dist = cube.position.distanceTo(camera.position);
        if (this.state.currItem === null) {
          if (dist < 0.3) this.setState({ currItem: idx });
        } else {
          if (idx === this.state.currItem && dist > 0.3) this.setState({ currItem: null });
        }
      });

      renderer.render(scene, camera);
      gl.endFrameEXP();
      requestAnimationFrame(animate);
    };
    animate();
  };

  render() {
    console.log(this.state.currItem);
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <Expo.GLView
          ref={ref => (this._glView = ref)}
          style={{ flex: 1 }}
          onContextCreate={this._onGLContextCreate}
        />
        <View style={styles.overlay}>
          <Text>Camera X: {this.state.camPos.x}</Text>
          <Text>Camera Y: {this.state.camPos.y}</Text>
          <Text>Camera Z: {this.state.camPos.z}</Text>
          <Text>currItem: {this.state.currItem}</Text>
          { this.state.currItem !== null ? <Button title="Capture" /> : <Text>Not close enough</Text>}
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