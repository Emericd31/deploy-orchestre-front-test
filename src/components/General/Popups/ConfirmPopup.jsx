import React from "react";
import { AppContext } from "../../../Context";
import Alert from '@mui/material/Alert';
import Popup from "./Popup";
import { Button } from "@mui/material";
import { GreenButton } from "../StyledComponents/StyledButtons";

class ConfirmPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      openPopup: props.openPopup,
      parentCallback: props.parentCallback,
      text: props.text,
      errorText: props.errorText,
      successText: props.successText,
      cancelButtonFunction: props.cancelButtonFunction,
      confirmButtonFunction: props.confirmButtonFunction,
      buttonDisabled: props.buttonDisabled,
      confirmButtonId: props.confirmButtonId,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        openPopup: this.props.openPopup,
        title: this.props.title,
        text: this.props.text,
        errorText: this.props.errorText,
        successText: this.props.successText,
        buttonDisabled: this.props.buttonDisabled,
      });
    }
  }

  render() {
    const dictionary = this.context["dictionary"];
    const { classes } = this.props;
    return (
      <Popup
        title={this.state.title}
        openPopup={this.state.openPopup}
        parentCallback={this.state.parentCallback}
      >
        <div style={{ textAlign: "center" }}><p>{this.state.text}</p></div>
        {this.state.errorText && (
          <Alert className={classes.alert} severity="error">
            {this.state.errorText}
          </Alert>
        )}
        {this.state.successText && (
          <Alert severity="success">
            {this.state.successText}
          </Alert>
        )}
        <div style={{ marginTop: "30px", display: "flex", justifyContent: "center"}}>
          <Button
            style={{ marginRight: "15px" }}
            variant="contained"
            color="primary"
            onClick={this.state.cancelButtonFunction}
          >
            {dictionary["cancel"]}
          </Button>
          <GreenButton
            id={this.state.confirmButtonId}
            onClick={this.state.confirmButtonFunction}
            disabled={this.state.buttonDisabled}
          >
            {dictionary["confirm"]}
          </GreenButton>
        </div>
      </Popup>
    );
  }
}

ConfirmPopup.contextType = AppContext;
export default ConfirmPopup;
