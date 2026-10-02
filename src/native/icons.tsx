// Compatibility wrapper for the legacy react-native-vector-icons Ionicons API.
// The original app uses glyphMap for category icon typing.
const IconModule = require('react-native-vector-icons/Ionicons');
export const Ionicons: any = IconModule.default || IconModule;
