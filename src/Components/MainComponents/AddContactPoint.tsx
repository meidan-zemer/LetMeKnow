import React, { Component } from 'react';
import { View } from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { addContactPoint } from '../../redux/actions';
import { IContainerProps } from '../definitions';

interface props extends IContainerProps {
  addContactPoint: (name: string, description: string) => any;
}

type state = {
  name: string;
  description: string;
};

class AddContactPoint extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = { name: '', description: '' };
  }
  private addContactPoint = () => {
    this.props.addContactPoint(this.state.name, this.state.description);
    this.navigateHome();
  };
  private navigateHome = () => {
    this.props.navigation.navigate('Home');
  };
  render() {
    return (
      <View>
        <View>
          <FormLabel>Name</FormLabel>
          <FormInput onChangeText={name => this.setState({ name })} value={this.state.name} />
        </View>
        <View>
          <FormLabel>Description</FormLabel>
          <FormInput onChangeText={description => this.setState({ description })} value={this.state.description} />
        </View>
        <View>
          <Button onPress={this.addContactPoint} title="Submit" backgroundColor={'blue'} />
          <Button onPress={this.navigateHome} title="Cancel" backgroundColor={'blue'} />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addContactPoint: (name: string, desc: string) => dispatch(addContactPoint(name, desc)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(AddContactPoint);
