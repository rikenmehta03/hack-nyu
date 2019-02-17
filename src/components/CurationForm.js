import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getProblems } from '../actions/problem';
import { getExperience } from "../actions/experience";


const mapStateToProps = state => {
    return {
        experience: state.experience,
        problem: state.problem
    };
};


class CurationForm extends React.Component {
    state = {
        authRequired: false
    }
    componentDidMount() {
        var token = localStorage.getItem('hack-nyu-auth');
        if (!token){
            this.setState({authRequired: true});
        } 
        this.props.dispatch(getExperience());
        this.props.dispatch(getProblems());
    }
    render() {
        const { experience, problem } = this.props;
        const { authRequired } = this.state;

        if(authRequired)
            return <Redirect to="/login" />
        
        return (
            <div>hello</div>
        )
    }

}

export default connect(mapStateToProps)(CurationForm);
