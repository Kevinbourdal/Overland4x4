import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeRouter } from "react-router-native";
import Main from "./Main";

export default function App() {
  return (
    <NativeRouter>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </NativeRouter>
  );
}
