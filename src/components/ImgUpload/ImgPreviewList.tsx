import * as React from 'react'
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  Image,
  Pressable,
  Text
} from 'react-native'
import { IImage } from '../../types/ImageUpload.interface'

interface IProps {
  images: IImage[]
  onOpenActionSheet: () => void
  onSave: () => Promise<void>
  loading: boolean
}

const ImgPreviewList: React.FunctionComponent<IProps> = ({
  images,
  onOpenActionSheet,
  onSave,
  loading
}: IProps) => (
  <SafeAreaView
    style={{ flex: 1, width: '100%', marginTop: StatusBar.currentHeight || 0 }}
  >
    <View style={{ flex: 0.86, marginHorizontal: 12 }}>
      <FlatList
        data={images}
        numColumns={2}
        renderItem={({ item }) =>
          item.id !== 'null' && item.uri ? (
            <View
              style={{
                width: '46%',
                height: 120,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'grey',
                backgroundColor: 'grey'
              }}
            >
              <Image
                source={{ uri: item.uri }}
                style={{ width: 100, height: 100, resizeMode: 'cover' }}
              />
            </View>
          ) : (
            <Pressable
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'grey',
                width: '46%',
                height: 120,
                backgroundColor: '#ededed'
              }}
              android_ripple={{ color: 'grey' }}
              onPress={onOpenActionSheet}
            >
              <Text style={{ textAlign: 'center', width: '80%' }}>
                Add More Images
              </Text>
            </Pressable>
          )}
        columnWrapperStyle={{
          marginVertical: 12,
          justifyContent: 'space-between'
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
    <View
      style={{
        flex: 0.14,
        justifyContent: 'center',
        left: 0,
        right: 0,
        bottom: 0,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center'
        }}
      >
        <Pressable
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'orange',
            width: '90%',
            height: 46,
            backgroundColor: 'orange',
            borderRadius: 12,
            elevation: 10
          }}
          android_ripple={{ color: 'yellow' }}
          onPress={onSave}
          disabled={loading}
        >
          <Text
            style={{
              textAlign: 'center',
              width: '80%',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 16
            }}
          >
            Save
          </Text>
        </Pressable>
      </View>
    </View>
  </SafeAreaView>
)

export default ImgPreviewList
