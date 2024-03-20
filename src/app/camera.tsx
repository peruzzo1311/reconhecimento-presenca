import React from 'react'
import { View, Text, Button } from 'tamagui'
import { Camera as ExpoCam, CameraType } from 'expo-camera'
import { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})

const Camera = (props: any) => {
  const [type, setType] = useState(CameraType.back)
  const [permission, requestPermission] = ExpoCam.useCameraPermissions()

  if (!permission) {
    // Camera permissions are still loading
    return <View />
  }
  React.useEffect(() => {console.log(JSON.stringify(permission, null, 2));}, [])

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}>grant permission</Button>
      </View>
    )
  }

  function toggleCameraType() {
    setType((current: any) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    )
  }

  return (
    <View style={styles.container}>
      <ExpoCam
        style={styles.camera}
        type={type}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={toggleCameraType}
          >
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </ExpoCam>
    </View>
  )
}

export default Camera
