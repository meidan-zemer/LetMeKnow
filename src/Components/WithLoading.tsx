import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native'
import {stateType} from "../redux/definitions";
import {isLoading} from "../redux/stateReader";

export default <P extends object>(Component: React.ComponentType<P>) => {

    interface WithLoadingProps {
        isLoading: boolean;
    }
    class WithLoading extends React.Component<P & WithLoadingProps> {
        render() {
            return ( this.props.isLoading ?
                <ActivityIndicator size="large" color="#0000ff" />
                :
                <Component {...this.props} />);
        }
    }
    return WithLoading;
}