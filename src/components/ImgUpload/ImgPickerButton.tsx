import * as React from 'react'
import { View, Button } from 'react-native'

interface IProps {
  onOpenActionSheet: () => void
}

const ImgPickerButton: React.FunctionComponent<IProps> = ({
  onOpenActionSheet
}: IProps) => (
  <View>
    <Button
      color='#f44336'
      title='Select Image'
      onPress={onOpenActionSheet}
    />
  </View>
)

export default ImgPickerButton
