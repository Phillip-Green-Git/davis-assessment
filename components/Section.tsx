import { useNavigation, NavigationProp } from "@react-navigation/native";
import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import Carousel from "react-native-snap-carousel";

export interface SectionProps {
  title: string;
  images: string[];
}

const Section: React.FC<SectionProps> = ({ title, images }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { width } = Dimensions.get("screen");

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("gallery", {
          images: images,
          initialIndex: index,
          title,
        })
      }
    >
      <Image source={{ uri: item }} style={styles.carouselImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Carousel
        data={images}
        renderItem={renderItem}
        sliderWidth={width - 30}
        itemWidth={200}
        layout="default"
        loop
      />
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: "#ffffff",
    marginBottom: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  carouselImage: {
    width: 200,
    height: 150,
  },
});
