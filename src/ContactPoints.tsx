import React, { Component } from 'react';
import { StyleSheet,View,ScrollView } from 'react-native';
import { List, ListItem,Button } from 'react-native-elements'
import { DeepReadonly } from 'utility-types';
import { IContainerProps } from './definitions';
import { connect } from 'react-redux';
import { stateType } from './reducers';
import { loadContactPoints } from './actions';
import { contactPoint } from 'let-me-know-ts-definitions';

interface ContactPointsProps extends IContainerProps {
  loadContactPoints: Function;
  contactPoints: DeepReadonly<contactPoint[]>;
}

class ContactPoints extends Component<ContactPointsProps> {
  loadContactPoints() {
    this.props.loadContactPoints();
  }
  componentWillMount() {
    this.loadContactPoints();
  }
  private navigateToAddContactPoint = () => {
    this.props.navigation.navigate('AddNewContactPoint');
  };

  render() {
    return (
        <View style={styles.container}>
          <Button key={"AddCp"} title={"Add"} onPress={this.navigateToAddContactPoint} backgroundColor={"blue"}/>
        <ScrollView>
          <List>
            {
              this.props.contactPoints.map((cp)=>
                  <ListItem
                      title={cp.name}
                      key={cp.name}
                      leftIcon={{name:"briefcase",type:'material-community'}}
                  />
              )
            }
          </List>
        </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column'
  }
});

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
)(ContactPoints);
