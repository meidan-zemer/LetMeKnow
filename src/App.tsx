import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { DeepReadonly } from 'utility-types';
import { IContainerProps } from './definitions';
import { connect } from 'react-redux';
import { stateType } from './reducers';
import { loadProducts } from './actions';

/*const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});*/

interface AppProps extends IContainerProps {
  loadProducts: Function;
  products: DeepReadonly<any[]>;
}

class App extends Component<AppProps> {
  loadProducts() {
    this.props.loadProducts();
  }
  componentWillMount() {
    this.loadProducts();
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.products.map(prod => (
          <Text style={styles.welcome}>{prod.name}</Text>
        ))}
      </View>
    );
  }
}

const mapStateToProps = (state: stateType)  => {
  //return {products: state.products ? state.products : []};
  return {products:state.products}
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadProducts: () => dispatch(loadProducts()),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);

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
