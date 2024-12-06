import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { usePhotoAnimation } from '../hooks/usePhotoAnimation';
import Carousel from '../components/Carousel';
import BackdropPhoto from '../components/BackdropPhoto';
import data from '../data';
import { SCREEN_WIDTH, IMAGE_WIDTH, IMAGE_HEIGHT, SPACING } from '../config/constants';
import AnimatedFlatList from '../components/AnimatedFlatList';

const HomeScreen = () => {
  // Custom hook to handle photo animation and scroll position
  const { scrollX, onScroll } = usePhotoAnimation(IMAGE_WIDTH, SPACING);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      
      {/* Render backdrop photos behind the main carousel */}
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((photo, index) => (
          <BackdropPhoto key={photo.id} photo={photo} index={index} scrollX={scrollX} />
        ))}
      </View>
      
      {/* Render main horizontal carousel with animated list */}
      <AnimatedFlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        horizontal
        snapToInterval={IMAGE_WIDTH + SPACING} // Makes items snap to the defined interval
        onScroll={onScroll} // Hook to track scroll position
        renderItem={({ item, index }) => (
          <Carousel
            item={item}
            index={index}
            scrollX={scrollX}
            imageWidth={IMAGE_WIDTH}
            imageHeight={IMAGE_HEIGHT}
          />
        )}
        contentContainerStyle={{
          gap: SPACING,
          paddingHorizontal: (SCREEN_WIDTH - IMAGE_WIDTH) / 2, // Centers the carousel items
        }}
        showsHorizontalScrollIndicator={false} // Disables scroll indicator
        style={styles.flatListStyle} // Styling for the flat list container
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  flatListStyle: {
    flexGrow: 0, // Prevents the FlatList from growing beyond the container
  },
});

export default HomeScreen;