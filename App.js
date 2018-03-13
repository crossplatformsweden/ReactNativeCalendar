import React from "react";
import { View } from "react-native";

import AppContainer from "./dist/App";
import Theme from "./dist/styles/";

const App = () => {
    return (
      <View style={Theme.container}>
        <AppContainer />
      </View>
    );
}
