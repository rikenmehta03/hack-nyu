import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        alignItems: 'center',
        display: 'flex'
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '50%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});


class LandingForm extends React.Component{
    state = {
        occupation: 'Occupation',
        problemText: 'Care to Share?'
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            Problem-Overflow
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        What troubles you?
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="occupation"
                                label="What do you do?"
                                className={classes.textField}
                                value={this.state.occupation}
                                onChange={this.handleChange('occupation')}
                                margin="normal"
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="problemText"
                                label="What problem would you like to share with us today?"
                                multiline={true}
                                rowsMax="8"
                                value={this.state.problemText}
                                onChange={this.handleChange('problemText')}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </FormControl>

                            {/*<FormControl margin="normal" required fullWidth>*/}
                                {/*<InputLabel htmlFor="email">Occupation</InputLabel>*/}
                                {/*<Input id="email" name="email" autoComplete="email" autoFocus />*/}
                            {/*</FormControl>*/}
                            {/*<FormControl margin="normal" required fullWidth>*/}
                                {/*<InputLabel htmlFor="password">Password</InputLabel>*/}
                                {/*<Input name="password" type="password" id="password" autoComplete="current-password" />*/}
                            {/*</FormControl>*/}
                            {/*<FormControlLabel*/}
                                {/*control={<Checkbox value="remember" color="primary" />}*/}
                                {/*label="Remember me"*/}
                            {/*/>*/}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Submit
                            </Button>
                    </form>
                </Paper>
            </div>
        );








        // return(
        //     <form className={classes.container} noValidate autoComplete="off">
        //         <TextField
        //             id="occupation"
        //             label="What do you do?"
        //             className={classes.textField}
        //             value={this.state.occupation}
        //             onChange={this.handleChange('name')}
        //             margin="normal"
        //             variant="outlined"
        //         />
        //
        //         {/*<TextField*/}
        //             {/*id="problemText"*/}
        //             {/*label="What problem would you like to share with us today?"*/}
        //             {/*defaultValue={this.state.problemText}*/}
        //             {/*multiline={true}*/}
        //             {/*className={classes.textField}*/}
        //             {/*margin="normal"*/}
        //             {/*variant="outlined"*/}
        //         {/*/>*/}
        //
        //         <TextField
        //             id="problemText"
        //             label="What problem would you like to share with us today?"
        //             multiline
        //             rowsMax="8"
        //             value={this.state.problemText}
        //             onChange={this.handleChange('problemText')}
        //             className={classes.textField}
        //             margin="normal"
        //             variant="outlined"
        //         />
        //     </form>
        // )
    }
}


LandingForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingForm);