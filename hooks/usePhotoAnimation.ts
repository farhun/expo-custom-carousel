import { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';

export const usePhotoAnimation = (imageWidth: number, spacing: number) => {
  // Shared value to track the horizontal scroll position
  const scrollX = useSharedValue(0);

  // Animated scroll handler that updates the scrollX value based on the scroll position
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      // Calculate the horizontal scroll progress based on the offset and image width with spacing
      scrollX.value = event.contentOffset.x / (imageWidth + spacing);
    },
  });

  // Return the scrollX value and the scroll handler to be used in components
  return { scrollX, onScroll };
};