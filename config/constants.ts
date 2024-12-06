import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const IMAGE_WIDTH = SCREEN_WIDTH * 0.7;
export const IMAGE_HEIGHT = IMAGE_WIDTH * 1.76;

export const SPACING = 12;