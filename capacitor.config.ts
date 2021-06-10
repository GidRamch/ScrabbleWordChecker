import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gidschwifty.offlinescrabblechecker',
  appName: 'Offline Scrabble Checker',
  webDir: 'www',
  bundledWebRuntime: false,
  android: {
    // backgroundColor: '#ffffff',
  },
  plugins: {
    "SplashScreen": {
      launchAutoHide: false,
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      backgroundColor: '#131313',
    },
  },
};

export default config;
