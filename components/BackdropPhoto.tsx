import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../config/constants';

interface BackdropPhotoProps {
  photo: any;
  index: number;
  scrollX: SharedValue<number>; // Shared value tracking horizontal scroll position
}

const BackdropPhoto: React.FC<BackdropPhotoProps> = ({ photo, index, scrollX }) => {
  // Create an animated style that adjusts opacity based on scroll position
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollX.value, [index - 1, index, index + 1], [0, 1, 0]), // Fade in and out based on scroll position
  }));

  return <Animated.Image source={photo.img} style={[animatedStyle, styles.image]} blurRadius={50} />;
};

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject, // Position image absolutely to fill the screen
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    resizeMode: 'cover',
  },
});

export default BackdropPhoto;