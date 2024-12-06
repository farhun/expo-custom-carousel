import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../config/constants';

// Header component: Displays title and a close button
const Header = ({ title, onClose }: { title: string; onClose: () => void }) => (
  <View style={styles.header}>
    {title && <Text style={styles.title}>{title}</Text>}
    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
      <AntDesign name="close" size={30} color="white" />
    </TouchableOpacity>
  </View>
);

// Description component: Displays the description text
const Description = ({ description }: { description: string }) => (
  <View style={styles.descriptionContainer}>
    <Text style={styles.description}>{description}</Text>
  </View>
);

const DescriptionScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve params passed from the previous screen
  const title = searchParams.get('title');
  const description = searchParams.get('description');
  const image = searchParams.get('image');

  // Parse image URL, if provided
  const parsedImage = useMemo(() => image ? JSON.parse(image) : null, [image]);

  // Close button handler to navigate back
  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      {/* Display image as background */}
      <Image source={parsedImage} style={styles.image} resizeMode="cover" />
      <Header title={title || ''} onClose={handleClose} />
      {/* Display description if provided */}
      {description && <Description description={description} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  header: {
    position: 'absolute',
    top: 50, 
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  descriptionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 20,
    margin: 20,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default DescriptionScreen;