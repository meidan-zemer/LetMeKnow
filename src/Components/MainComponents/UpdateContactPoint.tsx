import React, { Component } from 'react';
import { View } from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';
import { updateContactPoint } from '../../redux/actions';
import { IContainerProps } from '../definitions';
import { contactPoint } from '../../../../let-me-know-ts-definitions';
import { getContactPoint } from '../../redux/stateReader';
import { stateType } from '../../redux/definitions';

interface props extends IContainerProps {
  updateContactPoint: (cpId:string, cp: contactPoint) => any;
  cp: contactPoint;
}

type state = {
  name: string;
  description: string;
};

class UpdateContactPoint extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = { name: props.cp.name, description: props.cp.description };
  }
  private updateContactPoint = () => {
    let newCp = { ...this.props.cp, name: this.state.name, description: this.state.description };
    this.props.updateContactPoint(newCp.cpId,newCp);
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
          <FormLabel>Created Date</FormLabel>
          <FormInput editable={false} value={moment(this.props.cp.createDate).format()} />
        </View>
        <View>
          <FormLabel>Modidied Date</FormLabel>
          <FormInput editable={false} value={moment(this.props.cp.modifyDate).format()} />
        </View>
        <View>
          <Button onPress={this.updateContactPoint} title="Update" backgroundColor={'blue'} />
          <Button onPress={this.navigateHome} title="Cancel" backgroundColor={'blue'} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: stateType, props: any) => {
    const cpId:string = props.navigation.getParam("cpId");
    const cp = getContactPoint(state, cpId);
    return { cp };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateContactPoint: (cpId:string, cp: contactPoint) => dispatch(updateContactPoint(cpId, cp)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateContactPoint);
