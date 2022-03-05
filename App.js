import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Tabs from "./navigation/tabs";
import { RecoilRoot } from 'recoil';

// import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";
// import rootReducer from "./stores/rootReducer";
// const store = createStore(rootReducer, applyMiddleware(thunk));

// import MainLayout from './screens/MainLayout';
// import { LogBox } from 'react-native';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
// LogBox.ignoreLogs([
//   "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
// ]);
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <RecoilRoot>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName={"MainLayout"}
        >
          <Stack.Screen name="MainLayout" component={Tabs} />
        </Stack.Navigator>
      </RecoilRoot>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
