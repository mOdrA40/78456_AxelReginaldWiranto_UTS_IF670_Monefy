import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

const RECEIPT_KEY_PREFIX = 'receipt_';

/**
 * Mengubah ukuran gambar untuk mengoptimalkan penyimpanan
 *
 * @param uri - URI gambar yang akan diubah ukurannya
 * @param width - Lebar gambar yang diinginkan (default: 800px)
 * @returns URI gambar yang sudah diubah ukurannya
 */
export const resizeImage = async (uri: string, width: number = 800): Promise<string> => {
  try {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    return result.uri;
  } catch (error) {
    console.error('Error resizing image:', error);
    return uri; 
  }
};

/**
 * Menyimpan bukti transaksi (receipt) ke penyimpanan lokal
 *
 * @param transactionId - ID transaksi yang terkait dengan bukti
 * @param imageUri - URI gambar bukti transaksi
 * @returns Boolean yang menunjukkan keberhasilan penyimpanan
 */
export const saveTransactionReceipt = async (
  transactionId: string,
  imageUri: string
): Promise<boolean> => {
  try {
    const resizedImageUri = await resizeImage(imageUri);

    const base64Image = await FileSystem.readAsStringAsync(resizedImageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const key = `${RECEIPT_KEY_PREFIX}${transactionId}`;
    await AsyncStorage.setItem(key, base64Image);

    return true;
  } catch (error) {
    console.error('Error saving receipt:', error);
    return false;
  }
};

/**
 * Mengambil bukti transaksi (receipt) dari penyimpanan lokal
 *
 * @param transactionId - ID transaksi yang terkait dengan bukti
 * @returns URI gambar dalam format data URL atau null jika tidak ditemukan
 */
export const getTransactionReceipt = async (
  transactionId: string
): Promise<string | null> => {
  try {
    const key = `${RECEIPT_KEY_PREFIX}${transactionId}`;
    const base64Image = await AsyncStorage.getItem(key);

    if (base64Image) {
      return `data:image/jpeg;base64,${base64Image}`;
    }
    return null;
  } catch (error) {
    console.error('Error getting receipt:', error);
    return null;
  }
};

/**
 * Menghapus bukti transaksi (receipt) dari penyimpanan lokal
 *
 * @param transactionId - ID transaksi yang terkait dengan bukti
 * @returns Boolean yang menunjukkan keberhasilan penghapusan
 */
export const deleteTransactionReceipt = async (
  transactionId: string
): Promise<boolean> => {
  try {
    const key = `${RECEIPT_KEY_PREFIX}${transactionId}`;
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error deleting receipt:', error);
    return false;
  }
};