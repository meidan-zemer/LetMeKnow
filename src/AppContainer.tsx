import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import awsConfig from './definitions/aws-exports';
import App from './MainContainers/ContactPoints';
import AddNewContactPoint from './MainContainers/AddNewContactPoint';
import { rootReducer } from './redux/reducers';
import config from './definitions/letMeKnow.config';

Amplify.configure(awsConfig);

/*
 *  Prepare Store redux
 */

const axiosClient = axios.create(config.axiosClient);
const store = createStore(rootReducer, applyMiddleware(axiosMiddleware(axiosClient)));
/*
 * Create navigation container
 */
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: App,
    },
    AddNewContactPoint: {
      screen: AddNewContactPoint,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppNavigatorComp = createAppContainer(AppNavigator);

interface Props {
  authData: any;
}
class AppContainer extends Component<Props> {
  setAxiosAuthorizationHeader() {
    axios.defaults.headers.common['Authorization'] = this.props.authData.getSignInUserSession().idToken.jwtToken;
  }
  componentWillMount() {
    this.setAxiosAuthorizationHeader();
  }
  componentWillUpdate() {
    this.setAxiosAuthorizationHeader();
  }
  render() {
    return (
      <Provider store={store}>
        <AppNavigatorComp />
      </Provider>
    );
  }
}

export default withAuthenticator(AppContainer, true, [], null, null, { hiddenDefaults: ['phone_number'] });
