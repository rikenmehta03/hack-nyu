import React from "react";
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import { getProblems } from '../actions/problem';
import { getExperience, updateExperience } from "../actions/experience";
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
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
        textAlign: 'left',
        color: theme.palette.text.secondary,
        margin: theme.spacing.unit * 4
    },
    chip: {
        paddingRight: theme.spacing.unit * 2
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    }
});

const mapStateToProps = state => {
    return {
        experience: state.experience,
        problem: state.problem
    };
};


class CurationForm extends React.Component {
    state = {
        authRequired: false,
    }
    loadData = (text = '') => {

        this.props.dispatch(getExperience(text));
        this.props.dispatch(getProblems(text));
    }
    componentDidMount() {
        var token = localStorage.getItem('hack-nyu-auth');
        if (!token) {
            this.setState({ authRequired: true });
        }
        this.loadData();
    }

    handleChange = (event) => {
        this.loadData(event.target.value);
    }

    handleCheckedChange = (index) => () => {
        let experienceList = this.props.experience.experienceList;
        experienceList[index].checked = !experienceList[index].checked;
        this.props.dispatch(updateExperience(experienceList));
    }

    render() {
        const { experience, problem, classes } = this.props;

        const { authRequired } = this.state;

        problem.problem = []
        problem.problem.push({
            title: "asfasf",
            description: "asfasfu afhdlfds sdlgdsg",
            tags: ["Asf", "sdgdsg", "sdgdsg"],
            checked: false
        });
        problem.problem.push({
            title: "sagag",
            description: "sdgsdg dg",
            tags: ["ds", "ggj", "fh"],
            checked: false
        });
        problem.problem.push({
            title: "hdbd",
            description: "dffd",
            tags: ["df", "gf"],
            checked: false
        });
        problem.problem.push({
            title: "dgbd",
            description: "fbd",
            tags: ["sc", "gjg"],
            checked: false
        });

        if (authRequired)
            return <Redirect to="/login" />

        return (
            <div className={classes.root}>
                <Grid container direction="row" justify="center" alignItems="flex-start" spacing={24}>
                    <Grid className={classes.paper} item xs={8}>
                        <TextField
                            id="standard-search"
                            label="Search"
                            type="search"
                            fullWidth="true"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleChange}
                        />
                    </Grid>

                    <Fab color="primary" aria-label="Add" className={classes.fab}>
                        <AddIcon />
                    </Fab>

                    {experience.experienceList.length && <Grid item xs={10} sm={5}>

                        <Typography variant="h5" align={"center"} gutterBottom>
                            Experiences
                            </Typography>
                        {experience.experienceList.map((items, index) =>
                            <Paper className={classes.paper} >
                                <Checkbox checked={items.checked} onClick={this.handleCheckedChange(index)}
                                />
                                {items.tags.map((tag) => <Chip className={classes.chip} label={tag} />)}
                                <Typography variant="h5" gutterBottom>{items.text}</Typography>
                            </Paper>
                        )}
                    </Grid>}

                    {problem.problem.length && <Grid item xs={10} sm={5}>
                        <Typography variant="h5" align={"center"} gutterBottom>
                            Problems
                            </Typography>
                        {problem.problem.map((items) =>
                            <Paper className={classes.paper}>
                                <Checkbox />
                                {items.tags.map((tag) => <Chip className={classes.chip} label={tag} />)}
                                <Typography variant="h5" align={"left"} gutterBottom>{items.title}</Typography>
                                <br />
                                <Typography variant="h5" align={"left"} gutterBottom>{items.description}</Typography>
                                <br />
                            </Paper>
                        )}
                    </Grid>}

                </Grid>
            </div>
        )
    }
}
export default withStyles(styles)(connect(mapStateToProps)(CurationForm));
