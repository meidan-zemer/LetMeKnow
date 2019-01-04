import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import {connect} from 'react-redux';
import {addContactPoint} from "./actions";
import {IContainerProps} from "./definitions";

interface props extends IContainerProps {
    addContactPoint:(name:string, description:string)=>any;
}

type state = {
    name:string;
    description:string;
}
class AddNewContactPoint extends Component<props,state>{
    constructor(props:props){
        super(props);
        this.state = {name:"", description:""};
    }
    private addContactPoint = () =>{
        this.props.addContactPoint(this.state.name, this.state.description);
        this.navigateHome();
    }
    private navigateHome = () => {
        this.props.navigation.navigate('Home');
    }
    render(){
        return (
            <View>
                <View>
                    <Text>Name:</Text>
                    <TextInput
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                    />
                </View>
                <View>
                    <Text>Description:</Text>
                    <TextInput
                        onChangeText={(description) => this.setState({description})}
                        value={this.state.description}
                    />
                </View>
                <View>
                    <Button
                        onPress={this.addContactPoint}
                        title="Submit"
                    />
                    <Button
                        onPress={this.navigateHome}
                        title="Cancel"
                    />
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addContactPoint: (name:string, desc:string) => dispatch(addContactPoint(name, desc)),
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(AddNewContactPoint);
