import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeRouter } from "react-router-native";
import Main from "./Main";
import { Provider } from "react-redux";
import { store } from "./Store";

export default function App() {
  return (
    <NativeRouter>
      <SafeAreaProvider>
        <Provider store={store}>
          <Main />
        </Provider>
      </SafeAreaProvider>
    </NativeRouter>
  );
}
