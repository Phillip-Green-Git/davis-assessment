import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import AwesomeGallery from "react-native-awesome-gallery";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";

type RouteParams = {
  params: {
    images: string[];
    initialIndex: number;
    title: string;
  };
};

export default function Gallery() {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const { images, initialIndex, title } = route.params;

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: title });
  }, []);

  return (
    <AwesomeGallery
      data={images}
      initialIndex={initialIndex}
      onIndexChange={(newIndex) => {
        console.log(newIndex);
      }}
    />
  );
}

const styles = StyleSheet.create({});
