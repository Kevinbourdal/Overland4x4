import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeRouter } from "react-router-native";
import Main from "./Main";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import LandingPage from "./Landing/LandingPage";
import Navigation from "./navigation";
import DriverNavigation from "./navigation/DriverNavigation";

export default function App() {
  return (
    <NativeRouter>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </NativeRouter>
  );
}
