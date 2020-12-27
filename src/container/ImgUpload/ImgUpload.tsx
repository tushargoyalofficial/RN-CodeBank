import React from 'react'
import { Alert, Platform } from 'react-native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import * as ImagePicker from 'expo-image-picker'
import 'react-native-get-random-values' // For UUID to work
import { v4 as uuidv4 } from 'uuid'
import ImgPickerButton from '../../components/ImgUpload/ImgPickerButton'
import ImgPreviewList from '../../components/ImgUpload/ImgPreviewList'
import { IImage } from '../../types/ImageUpload.interface'
// @ts-expect-error
import mime from 'mime'

const ImgUpload: React.FunctionComponent = () => {
  const { showActionSheetWithOptions } = useActionSheet()
  const [loading, isLoading] = React.useState(false)
  const [images, setImages] = React.useState<IImage[]>([
    { id: 'null', name: 'Add More Image', type: undefined, uri: '' }
  ])

  const onOpenActionSheet = (): void => {
    const options = ['Camera', 'Gallery', 'Cancel']
    const destructiveButtonIndex = 2
    const cancelButtonIndex = 2

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            openCamera()
            break

          case 1:
            openGallery()
            break

          default:
            break
        }
      }
    )
  }

  const openCamera = async (): Promise<void> => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      if (status === 'granted') {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.1
        })

        if (!result.cancelled) {
          const newImageUri = 'file:///' + result.uri.split('file:/').join('')
          const img = {
            id: uuidv4(),
            name: newImageUri.split('/').pop() || `Image-${uuidv4()}`,
            type: mime.getType(newImageUri),
            uri: newImageUri
          }
          const newArr = [...images]
          newArr.unshift(img)
          setImages([...newArr])
        }
      }
      if (status !== 'granted') {
        alert('Sorry, we need Camera permissions to make this work!')
      }
    }
  }

  const openGallery = async (): Promise<void> => {
    if (Platform.OS !== 'web') {
      const {
        status
      } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 0.1
        })

        if (!result.cancelled) {
          const newImageUri = 'file:///' + result.uri.split('file:/').join('')
          const img = {
            id: uuidv4(),
            name: newImageUri.split('/').pop() || `Image-${uuidv4()}`,
            type: mime.getType(newImageUri),
            uri: newImageUri
          }
          const newArr = [...images]
          newArr.unshift(img)
          setImages([...newArr])
        }
      }
      if (status !== 'granted') {
        alert('Sorry, we need Camera Roll permissions to make this work!')
      }
    }
  }

  const createFormData = (uri: any, body: any) => {
    const data = new FormData()
    data.append('photo', {
      // @ts-expect-error
      uri: uri,
      type: mime.getType(uri),
      name: uri.split('/').pop()
    })

    Object.keys(body).forEach((key) => {
      data.append(key, body[key])
    })

    return data
  }

  const onSave = async (): Promise<void> => {
    isLoading(true)
    if (!images.length) {
      alert('Please select atleast one image!')
      isLoading(false)
      return
    }
    const fd: FormData = createFormData(images[0].uri, { userId: '123' })
    fetch('https://rnexpo-server.herokuapp.com/api/upload', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: fd
    })
      .then(async (response) => await response.json())
      .then((response) => {
        console.log('upload succes', response)
        Alert.alert('Upload Response', response.message)
        isLoading(false)
      })
      .catch((error) => {
        console.log('upload error', error)
        alert('Upload failed!')
        isLoading(false)
      })
  }

  return (
    <>
      {images.length > 1 && (
        <ImgPreviewList
          images={images}
          onOpenActionSheet={onOpenActionSheet}
          onSave={onSave}
          loading={loading}
        />
      )}
      {images.length === 1 && (
        <ImgPickerButton onOpenActionSheet={onOpenActionSheet} />
      )}
    </>
  )
}

export default ImgUpload
