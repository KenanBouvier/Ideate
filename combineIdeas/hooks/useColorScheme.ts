import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.

export default function useColorScheme(): NonNullable<ColorSchemeName> {
  return _useColorScheme() as NonNullable<ColorSchemeName>;
}

// export default function useColorScheme(){
//   AsyncStorage.getItem('theme')
//     .then((item) => {
//         if (item) {
//           console.log("Theme is: ")
//           console.log(item);
//           return _useColorScheme() as NonNullable<ColorSchemeName>;
//         }
//         else{
//           return _useColorScheme() as NonNullable<ColorSchemeName>;
//         }
// });
//   console.log("ERROR IN GETTING THEME :(");
//   return _useColorScheme() as NonNullable<ColorSchemeName>;
// }
