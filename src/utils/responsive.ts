import { Dimensions, ScaledSize } from 'react-native';
import { useWindowDimensions } from 'react-native';


const DESIGN_WIDTH = 375; 
const DESIGN_HEIGHT = 812;

// Threshold untuk tablet
export const TABLET_THRESHOLD = 768;

export const getScreenDimensions = (): ScaledSize => {
  return Dimensions.get('window');
};

export const useResponsive = () => {
  const window = useWindowDimensions();
  const { width, height } = window;

  const isTablet = width >= TABLET_THRESHOLD;
  const isLandscape = width > height;

  /**
   * Mengubah ukuran ke ukuran yang responsif berdasarkan lebar layar
   * @param size Ukuran dalam desain
   * @returns Ukuran responsif
   */
  const scaleWidth = (size: number): number => {
    const scale = width / DESIGN_WIDTH;
    const newSize = size * scale;
    
   
    if (isTablet) {
      return Math.min(newSize, size * 1.3);
    }
    
    return newSize;
  };

  /**
   * Mengubah ukuran ke ukuran yang responsif berdasarkan tinggi layar
   * @param size Ukuran dalam desain
   * @returns Ukuran responsif
   */
  const scaleHeight = (size: number): number => {
    const scale = height / DESIGN_HEIGHT;
    const newSize = size * scale;
    
    if (isTablet) {
      return Math.min(newSize, size * 1.3);
    }
    
    return newSize;
  };

  /**
   * Mengubah ukuran font ke ukuran yang responsif
   * @param size Ukuran font dalam desain
   * @returns Ukuran font responsif
   */
  const scaleFontSize = (size: number): number => {
    
    const scaleFactor = isTablet ? 1.2 : Math.min(width / DESIGN_WIDTH, 1.3);
    const newSize = size * scaleFactor;
    
    return Math.round(newSize);
  };

  /**
   * Mengubah spacing (padding, margin) ke ukuran yang responsif
   * @param spacing Ukuran spacing dalam desain
   * @returns Ukuran spacing responsif
   */
  const scaleSpacing = (spacing: number): number => {
    const factor = isTablet ? 1.3 : Math.min(width / DESIGN_WIDTH, 1.5);
    return Math.round(spacing * factor);
  };

  /**
   * Mengubah ukuran ikon ke ukuran yang responsif
   * @param size Ukuran ikon dalam desain
   * @returns Ukuran ikon responsif
   */
  const scaleIconSize = (size: number): number => {
    return isTablet ? Math.round(size * 1.3) : size;
  };

  
  const getContentMaxWidth = (): number | undefined => {
    if (!isTablet) return undefined;
    return isLandscape ? 900 : 700;
  };


  const getContainerPadding = (defaultPadding: number): number => {
    if (isTablet) {
      return isLandscape ? defaultPadding * 1.5 : defaultPadding * 1.2;
    }
    return isLandscape ? defaultPadding * 1.2 : defaultPadding;
  };

  return {
    isTablet,
    isLandscape,
    width,
    height,
    scaleWidth,
    scaleHeight,
    scaleFontSize,
    scaleSpacing,
    scaleIconSize,
    getContentMaxWidth,
    getContainerPadding
  };
}; 