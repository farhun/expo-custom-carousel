import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

interface PhotoProps {
  item: any;
  index: number;
  scrollX: SharedValue<number>;
  imageWidth: number;
  imageHeight: number;
}

const Carousel: React.FC<PhotoProps> = ({ item, index, scrollX, imageWidth, imageHeight }) => {
  // Animated style for the image: scale, opacity, rotate, and height change based on scroll position
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollX.value, [index - 1, index, index + 1], [1.5, 1.2, 1.5]);
    const opacity = interpolate(scrollX.value, [index - 1, index, index + 1], [0.6, 1, 0.6]);
    const rotate = `${interpolate(scrollX.value, [index - 1, index, index + 1], [15, 0, -15])}deg`;
    const cardHeight = interpolate(scrollX.value, [index - 1, index, index + 1], [imageHeight, imageHeight * 1.1, imageHeight]);

    return {
      transform: [{ scale }, { rotate }],
      opacity,
      height: cardHeight,
    };
  });

  // Animated style for the text: fades in/out based on the scroll position
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollX.value, [index - 1, index, index + 1], [0, 1, 0]);
    return { opacity };
  });

  const router = useRouter();

  // Navigate to the Description screen with the item's details when pressed
  const handlePress = () => {
    router.push({
      pathname: '/description',
      params: {
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.img.toString(),
      },
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.container, { width: imageWidth }]}>
        {/* Render the image with animated transformations */}
        <Animated.Image source={item.img} style={[animatedStyle, styles.image]} />
        {/* Render the title with fading effect */}
        <Animated.View style={[styles.textContainer, animatedTextStyle]}>
          <Text style={styles.text}>{item.title}</Text>
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Carousel;