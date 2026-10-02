import { createNavigationContainerRef } from '@react-navigation/native';
export const navigationRef = createNavigationContainerRef<any>();
export const appNavigation = {
  replace: (name: string, params?: object) => { if (navigationRef.isReady()) navigationRef.reset({ index: 0, routes: [{ name, params }] }); },
  navigate: (name: string, params?: object) => { if (navigationRef.isReady()) navigationRef.navigate(name, params); },
};
