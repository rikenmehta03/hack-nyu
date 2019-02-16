import React from "react";
import { connect } from 'react-redux';
import uuid from "uuid";

import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const suggestions = [
    { label: "Afghanistan" },
    { label: "Aland Islands" },
    { label: "Albania" },
    { label: "Algeria" },
    { label: "American Samoa" },
    { label: "Andorra" },
    { label: "Angola" },
    { label: "Anguilla" },
    { label: "Antarctica" },
    { label: "Antigua and Barbuda" },
    { label: "Argentina" },
    { label: "Armenia" },
    { label: "Aruba" },
    { label: "Australia" },
    { label: "Austria" },
    { label: "Azerbaijan" },
    { label: "Bahamas" },
    { label: "Bahrain" },
    { label: "Bangladesh" },
    { label: "Barbados" },
    { label: "Belarus" },
    { label: "Belgium" },
    { label: "Belize" },
    { label: "Benin" },
    { label: "Bermuda" },
    { label: "Bhutan" },
    { label: "Bolivia, Plurinational State of" },
    { label: "Bonaire, Sint Eustatius and Saba" },
    { label: "Bosnia and Herzegovina" },
    { label: "Botswana" },
    { label: "Bouvet Island" },
    { label: "Brazil" },
    { label: "British Indian Ocean Territory" },
    { label: "Brunei Darussalam" }
];

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput
                },
                ...InputProps
            }}
            {...other}
        />
    );
}

function renderSuggestion({
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
}) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
}
renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 &&
                suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

class DownshiftMultiple extends React.Component {
    state = {
        inputValue: ""
    };

    handleKeyDown = event => {
        const { inputValue } = this.state;
        const { tags } = this.props;
        if (
            tags.length &&
            !inputValue.length &&
            event.key === "Backspace"
        ) {
            this.setState({
                selectedItem: selectedItem.slice(0, selectedItem.length - 1)
            });
        }
    };

    handleInputChange = event => {
        this.setState({ inputValue: event.target.value });
    };

    handleChange = item => {
        let { selectedItem } = this.state;
        const { handleTagsChange } = this.props;

        this.setState({
            inputValue: ""
        });
        handleTagsChange(item);
    };

    handleDelete = item => () => {
        this.setState(state => {
            const selectedItem = [...state.selectedItem];
            selectedItem.splice(selectedItem.indexOf(item), 1);
            return { selectedItem };
        });
    };

    render() {
        const { classes, handleTagsDelete, tags } = this.props;
        const { inputValue } = this.state;

        return (
            <Downshift
                id="downshift-multiple"
                inputValue={inputValue}
                onChange={this.handleChange}
                selectedItem={tags}
            >
                {({
                    getInputProps,
                    getItemProps,
                    isOpen,
                    inputValue: inputValue2,
                    selectedItem: selectedItem2,
                    highlightedIndex
                }) => (
                        <div className={classes.container}>
                            {renderInput({
                                fullWidth: true,
                                classes,
                                InputProps: getInputProps({
                                    startAdornment: tags.map(item => (
                                        <Chip
                                            key={item}
                                            tabIndex={-1}
                                            label={item}
                                            className={classes.chip}
                                            onDelete={handleTagsDelete(item)}
                                        />
                                    )),
                                    onChange: this.handleInputChange,
                                    placeholder: "Select tags for your problem"
                                }),
                                label: "Tags"
                            })}
                            {isOpen ? (
                                <Paper className={classes.paper} square>
                                    {getSuggestions(inputValue2).map((suggestion, index) =>
                                        renderSuggestion({
                                            suggestion,
                                            index,
                                            itemProps: getItemProps({ item: suggestion.label }),
                                            highlightedIndex,
                                            selectedItem: selectedItem2
                                        })
                                    )}
                                </Paper>
                            ) : null}
                        </div>
                    )}
            </Downshift>
        );
    }
}

DownshiftMultiple.propTypes = {
    classes: PropTypes.object.isRequired
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing.unit * 2
    },
    container: {
        flexGrow: 1,
        position: "relative"
    },
    paper: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    inputRoot: {
        flexWrap: "wrap"
    },
    inputInput: {
        width: "auto",
        flexGrow: 1
    },
    divider: {
        height: theme.spacing.unit * 2
    }
});

class LandingForm extends React.Component {
    state = {
        'profession': '',
        'text': '',
        'tags': []
    };
    handleProfessionChange = profession => {
        this.setState(state => {
            return { profession }
        });
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleTagsChange = item => {
        let { tags } = this.state;

        if (tags.indexOf(item) === -1) {
            tags = [...tags, item];
        }

        this.setState(state => {
            return { tags };
        });
    };

    handleTagsDelete = item => () => {
        this.setState(state => {
            const tags = [...state.tags];
            tags.splice(tags.indexOf(item), 1);
            return { tags };
        });
    };

    handleSubmit = () => {
        const opt = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...this.state,
                id: uuid.v4()
            })
        }
        fetch('/api/experience', opt)
            .then(results => results.json())
            .then(data => {
                if (data.ok === true) {
                    this.setState(state => {
                        return {
                            'profession': '',
                            'text': '',
                            'tags': []
                        }
                    })
                }
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item sm={6} xs={10}>
                        <Paper className={classes.paper}>
                            <Typography variant="h4" gutterBottom>
                                What troubles you ?
                    </Typography>
                            <form className={classes.container} noValidate autoComplete="off">
                                <Downshift id="downshift-simple" 
                                    onChange={this.handleProfessionChange}>
                                    {({
                                        getInputProps,
                                        getItemProps,
                                        getMenuProps,
                                        highlightedIndex,
                                        inputValue,
                                        isOpen,
                                        selectedItem
                                    }) => (
                                            <div className={classes.container}>
                                                {renderInput({
                                                    fullWidth: true,
                                                    classes,
                                                    InputProps: getInputProps({
                                                        placeholder: "What do you do?"
                                                    })
                                                })}
                                                <div {...getMenuProps()}>
                                                    {isOpen ? (
                                                        <Paper className={classes.paper} square>
                                                            {getSuggestions(inputValue).map((suggestion, index) =>
                                                                renderSuggestion({
                                                                    suggestion,
                                                                    index,
                                                                    itemProps: getItemProps({ item: suggestion.label }),
                                                                    highlightedIndex,
                                                                    selectedItem
                                                                })
                                                            )}
                                                        </Paper>
                                                    ) : null}
                                                </div>
                                            </div>
                                        )}
                                </Downshift>
                                <div className={classes.divider} />

                                <TextField
                                    id="standard-multiline-static"
                                    fullWidth="true"
                                    label="Text"
                                    multiline
                                    value={this.state.text}
                                    onChange={this.handleChange('text')}
                                    rows="4"
                                    rowsMax="8"
                                    placeholder="Describe your trouble"
                                    margin="normal"
                                />
                                <div className={classes.divider} />
                                <DownshiftMultiple tags={this.state.tags} classes={classes} handleTagsChange={this.handleTagsChange} handleTagsDelete={this.handleTagsDelete} />
                                <div className={classes.divider} />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={this.handleSubmit}
                                >
                                    Submit
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    };
}


LandingForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        experience: state.experience
    }
};

export default withStyles(styles)(connect(mapStateToProps)(LandingForm));