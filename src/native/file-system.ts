import RNFS from 'react-native-fs';
export const documentDirectory = RNFS.DocumentDirectoryPath + '/';
export const cacheDirectory = RNFS.CachesDirectoryPath + '/';
export const EncodingType = { UTF8: 'utf8' } as const;
export const writeAsStringAsync = (uri: string, data: string, options?: { encoding?: string }) => RNFS.writeFile(uri, data, options?.encoding || 'utf8');
