import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';
import { updateContactPoint, setLoading } from '../../redux/actions';
import { IContainerProps } from '../definitions';
import { contactPoint } from '../../../../let-me-know-ts-definitions';
import {getContactPoint, isLoading} from '../../redux/stateReader';
import { stateType } from '../../redux/definitions';
import withLoading from '../WithLoading';

interface props extends IContainerProps {
  updateContactPoint: (cpId: string, cp: contactPoint) => any;
  setLoading: (isLoading: boolean) => any;
  cp: contactPoint;
}

type state = {
  name: string;
  description: string;
  draftMode: boolean;
};

class UpdateContactPoint extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = { name: props.cp.name, description: props.cp.description, draftMode: false };
  }
  private updateContactPoint = () => {
    let newCp = { ...this.props.cp, name: this.state.name, description: this.state.description };
    this.props.setLoading(true);
    this.props.updateContactPoint(newCp.cpId, newCp).then(() => {
      this.props.setLoading(false);
    });
  };
  private navigateHome = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <View>
        <View>
          <FormLabel>Name</FormLabel>
          <FormInput onChangeText={name => this.setState({ name, draftMode: true })} value={this.state.name} />
        </View>
        <View>
          <FormLabel>Description</FormLabel>
          <FormInput
            onChangeText={description => this.setState({ description, draftMode: true })}
            value={this.state.description}
          />
        </View>
        <View>
          <FormLabel>Created Date</FormLabel>
          <FormInput editable={false} value={moment(this.props.cp.createDate).format()} />
        </View>
        <View>
          <FormLabel>Modidied Date</FormLabel>
          <FormInput editable={false} value={moment(this.props.cp.modifyDate).format()} />
        </View>
        <View style={styles.actionContainer}>
          <Button
            large
            disabled={!this.state.draftMode}
            backgroundColor={'blue'}
            onPress={this.updateContactPoint}
            title="Update"
          />
          <Button
            large
            disabled={!this.state.draftMode}
            backgroundColor={'blue'}
            onPress={this.navigateHome}
            title="Cancel"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionContainer: { flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 10 },
});

const mapStateToProps = (state: stateType, props: any) => {
  const cpId: string = props.navigation.getParam('cpId');
  const cp = getContactPoint(state, cpId);
  return { cp, isLoading:isLoading(state) };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateContactPoint: (cpId: string, cp: contactPoint) => dispatch(updateContactPoint(cpId, cp)),
    setLoading: (isLoading: boolean) => dispatch(setLoading(isLoading)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLoading(UpdateContactPoint));
