import React from "react";
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import {getProblems} from '../actions/problem';
import {getExperience} from "../actions/experience";


const mapStateToProps = state => {
    return {
        experience: state.experience,
        problem: state.problem
    };
};
function mapDispatchToProps(dispatch) {
    return {
        getExperience: () => dispatch(getExperience()),
        getProblems: () => dispatch(getProblems())
    };
}


class CurationForm extends React.Component {
    constructor(...args){
        super(...args);
        getExperience();
        getProblems();
    }
    render(){
        const {experience , problem} = this.props;
        console.log(experience);
        return (
            <div>
                hello
            </div>

        )
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(CurationForm);
