import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './reducers';
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
import App from './App';

Amplify.configure(awsConfig);

import { withAuthenticator } from 'aws-amplify-react-native';

const store = createStore(rootReducer);

const AppNavigator = createStackNavigator(
  {
    Home: withAuthenticator(App, true),
  },
  {
    initialRouteName: 'Home',
  },
);

const AppNavigatorComp = createAppContainer(AppNavigator);
interface Props {}
class AppContainer extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <AppNavigatorComp />
      </Provider>
    );
  }
}

export default AppContainer;
