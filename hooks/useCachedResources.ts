import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        // Load fonts
        await Font.loadAsync({
          "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
          "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
          "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
          "Oswald-Regular": require("../assets/fonts/Oswald-Regular.ttf"),
          "Oswald-Medium": require("../assets/fonts/Oswald-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
