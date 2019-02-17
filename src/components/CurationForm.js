import React from "react";
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import {getProblems} from '../actions/problem';
import {getExperience} from "../actions/experience";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

import { Redirect } from 'react-router-dom';




const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    spacing: 8,
});

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
    init = (text) => {
        var token = localStorage.getItem('hack-nyu-auth');
        if (!token) {
            this.setState({authRequired: true});
        }
        this.props.dispatch(getExperience(text));
        this.props.dispatch(getProblems(text));
    }
    componentDidMount() {
        this.init("");
    }

    handleChange = (event) => {
        this.init(event.target.value);
    }

    render() {
        const {experience, problem, classes} = this.props;
        const {authRequired} = this.state;
        
        if (authRequired)
            return <Redirect to="/login"/>

        return (
                <div className={classes.root}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={12}>
                            <Paper className={classes.paper}>
                                <TextField
                                    id="standard-search"
                                    label="Search field"
                                    type="search"
                                    className={classes.textField}
                                    margin="normal"
                                    onChange={this.handleChange}
                                />
                            </Paper>
                        </Grid>

                        {experience.experience.length > 0 && <Grid item xs={12} sm={6}>
                            <Typography variant="h5" align={"center"} gutterBottom>
                                Experiences
                            </Typography>
                            {experience.experience.map((items) =>
                                <Grid item xs={12} sm={12}>
                                    <Paper className={classes.paper}>
                                        <Typography variant="h5" align={"left"} gutterBottom>{items.text}</Typography>
                                        <br/>
                                        {items.tags.map((tag) => <Chip label={tag} /> )}
                                        <Checkbox/>
                                    </Paper>
                                </Grid>
                             )}
                        </Grid> }

                        {problem.problem.length > 0 && <Grid item xs={12} sm={6}>
                            <Typography variant="h5" align={"center"} gutterBottom>
                                Problems
                            </Typography>
                            {problem.problem.map((items) =>
                                <Grid item xs={12} sm={12}>
                                    <Paper className={classes.paper}>
                                        <Typography variant="h5" align={"left"} gutterBottom>{items.title}</Typography>
                                        <br/>
                                        <Typography variant="h5" align={"left"} gutterBottom>{items.description}</Typography>
                                        <br/>
                                        {items.tags.map((tag) => <Chip label={tag} /> )}
                                        <Checkbox/>
                                    </Paper>
                                </Grid>
                            )}
                        </Grid> }

                    </Grid>
                </div>
            )
        }
}
export default withStyles(styles)(connect(mapStateToProps)(CurationForm));
