import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { DeepReadonly } from 'utility-types';
import { IContainerProps } from '../definitions';
import { connect } from 'react-redux';
import { stateType } from '../../redux/definitions';
import { loadContactPoints } from '../../redux/actions';
import { contactPoint } from '../../../../let-me-know-ts-definitions';
import { getContactPoints } from '../../redux/stateReader';

interface ContactPointsProps extends IContainerProps {
  loadContactPoints: Function;
  contactPoints: DeepReadonly<contactPoint[]>;
}

class ContactPoints extends Component<ContactPointsProps> {
  constructor(props:ContactPointsProps){
    super(props);
    this.loadContactPoints();
  }
  componentWillUpdate() {
    this.loadContactPoints();
  }
  private loadContactPoints = () => {
    this.props.loadContactPoints();
  };
  private navigateToAddContactPoint = () => {
    this.props.navigation.navigate('AddContactPoint');
  };
  private navigateToUpdateContactPoint = (cpId:string) => {
    this.props.navigation.navigate('UpdateContactPoint',{cpId:cpId});
  };
  render() {
    return (
      <View style={styles.container}>
        <Button title={'Add'} onPress={this.navigateToAddContactPoint} backgroundColor={'blue'} />
        <ScrollView>
          <List>
            {this.props.contactPoints.map(cp => (
              <ListItem title={cp.name} key={cp.name} leftIcon={{ name: 'briefcase', type: 'material-community' }}
                        onPress={()=>this.navigateToUpdateContactPoint(cp.cpId)}/>
            ))}
          </List>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

const mapStateToProps = (state: stateType) => {
  let contactPoints: contactPoint[] = getContactPoints(state);
  return { contactPoints: contactPoints };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadContactPoints: () => dispatch(loadContactPoints()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactPoints);
