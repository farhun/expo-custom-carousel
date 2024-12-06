import React from 'react';
import Animated from 'react-native-reanimated';

interface AnimatedFlatListProps {
  data: any[];
  renderItem: ({ item, index }: { item: any; index: number }) => JSX.Element;
  keyExtractor: (item: any, index: number) => string;
  horizontal?: boolean;
  snapToInterval: number; // Interval to snap to when scrolling
  onScroll: any; // Scroll handler for tracking scroll position
  contentContainerStyle?: object;
  showsHorizontalScrollIndicator?: boolean;
  style?: object;
}

const AnimatedFlatList: React.FC<AnimatedFlatListProps> = ({
  data,
  renderItem,
  keyExtractor,
  horizontal = false,
  snapToInterval,
  onScroll,
  contentContainerStyle,
  showsHorizontalScrollIndicator = false,
  style,
}) => {
  return (
    <Animated.FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal={horizontal}
      snapToInterval={snapToInterval} // Snap to interval for smooth scrolling
      onScroll={onScroll} // Handler for tracking scroll position
      scrollEventThrottle={16}
      contentContainerStyle={contentContainerStyle}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      style={style}
    />
  );
};

export default AnimatedFlatList;