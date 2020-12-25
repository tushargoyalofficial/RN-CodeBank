import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import ImgUpload from './src/container/ImgUpload/ImgUpload'

export default function App () {
  return (
    <ActionSheetProvider>
      <View style={styles.container}>
        <ImgUpload />
      </View>
    </ActionSheetProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
