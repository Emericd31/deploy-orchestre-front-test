import React from "react";

import TextField from "@mui/material/TextField";

class BriefedTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      helperText: "",
      errorState: false,
    };
  }

  handleInputChange = (event) => {
    this.handleLeavingField(event);
  };

  handleLeavingField = (event) => {
    const inputText = event.target.value;
    const errorState = inputText.length === 0;
    this.setState({
      inputText: inputText,
      helperText: (this.props.required && errorState) ? "Veuillez remplir ce champ." : "",
      errorState: (this.props.required && errorState),
    });
    this.props.saveField(inputText, errorState);
  };

  onKeyDown = () => {};

  getHelperText() {
    return this.state.helperText;
  }

  render() {
    return (
      <div className="briefedtextfield">
        <TextField
          disabled={this.props.disabled}
          required={this.props.required}
          error={this.state.errorState}
          label={this.props.label}
          type={this.props.type}
          name={this.props.name}
          value={this.props.value ? this.props.value : this.state.inputText}
          variant="outlined"
          color="primary"
          size="small"
          fullWidth={this.props.fullWidth !== undefined ? this.props.fullWidth : true}
          helperText={this.state.errorState && this.getHelperText()}
          onChange={this.handleInputChange}
          onBlur={this.handleLeavingField}
          onKeyDown={this.onKeyDown}
          InputProps={this.props.InputProps}
        />
      </div>
    );
  }
}

export default BriefedTextField;