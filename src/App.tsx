import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { DeepReadonly } from 'utility-types';
import { IContainerProps } from './definitions';
import { connect } from 'react-redux';
import { stateType } from './reducers';
import { loadContactPoints } from './actions';
import {contactPoint} from 'let-me-know-ts-definitions';
/*const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});*/

interface AppProps extends IContainerProps {
  loadContactPoints: Function;
  contactPoints: DeepReadonly<contactPoint[]>;
}

class App extends Component<AppProps> {
  loadContactPoints() {
    this.props.loadContactPoints();
  }
  componentWillMount() {
    this.loadContactPoints();
  }
  private navigateToAddContactPoint = () =>{
    this.props.navigation.navigate('AddNewContactPoint');
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.navigateToAddContactPoint} title={"Add Contact Point"}/>
        {this.props.contactPoints.map(cp=> (
          <Text style={styles.welcome}>{cp.name+" "+cp.description}</Text>
        ))}
      </View>
    );
  }
}

const mapStateToProps = (state: stateType) => {
  return { contactPoints: state.contactPoints };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadContactPoints: () => dispatch(loadContactPoints()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
