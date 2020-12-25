import React from "react";
import { Platform } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values"; // For UUID to work
import { v4 as uuidv4 } from "uuid";
import ImgPickerButton from "../../components/ImgUpload/ImgPickerButton";
import ImgPreviewList from "../../components/ImgUpload/ImgPreviewList";
import { IImage } from "../../types/ImageUpload.interface";

const ImgUpload: React.FunctionComponent = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [images, setImages] = React.useState<IImage[]>([
    { id: "null", name: "Add More Image", type: "button", uri: "" },
  ]);

  const onOpenActionSheet = (): void => {
    const options = ["Camera", "Gallery", "Cancel"];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            openCamera();
            break;

          case 1:
            openGallery();
            break;

          default:
            break;
        }
      }
    );
  };

  const openCamera = async (): Promise<void> => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === "granted") {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.4,
        });

        if (!result.cancelled) {
          const img = {
            id: uuidv4(),
            name: `Image-${uuidv4()}`,
            type: "image/jpeg",
            uri: result.uri,
          };
          const newArr = [...images];
          newArr.unshift(img);
          setImages([...newArr]);
        }
      }
      if (status !== "granted") {
        alert("Sorry, we need Camera permissions to make this work!");
      }
    }
  };

  const openGallery = async (): Promise<void> => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === "granted") {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 0.1,
        });

        if (!result.cancelled) {
          const img = {
            id: uuidv4(),
            name: `Image-${uuidv4()}`,
            type: "image/jpeg",
            uri: result.uri,
          };
          const newArr = [...images];
          newArr.unshift(img);
          setImages([...newArr]);
        }
      }
      if (status !== "granted") {
        alert("Sorry, we need Camera Roll permissions to make this work!");
      }
    }
  };

  const onSave = async (): Promise<void> => {};

  return (
    <>
      {images.length > 1 && (
        <ImgPreviewList
          images={images}
          onOpenActionSheet={onOpenActionSheet}
          onSave={onSave}
        />
      )}
      {images.length === 1 && (
        <ImgPickerButton onOpenActionSheet={onOpenActionSheet} />
      )}
    </>
  );
};

export default ImgUpload;
