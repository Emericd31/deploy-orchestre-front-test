import BriefedTextField from "./BriefedTextField";

class LiveBriefedTextField extends BriefedTextField {
  componentDidUpdate(prevProps) {
    if (this.props.updateChecker !== prevProps.updateChecker) {
      const errorState = !this.props.syntaxChecker(this.state.inputText);
      this.setState({
        helperText: this.props.helperText,
        errorState: errorState,
      });
      this.props.saveField(this.state.inputText, errorState);
    }
  }

  handleLeavingField = (event) => {
    const inputText = event.target.value;
    const inputIsNull = inputText.length === 0;
    const errorState =
      !this.props.syntaxChecker(event.target.value) || inputIsNull;
    this.setState({
      inputText: inputText,
      helperText: inputIsNull ? "Veuillez remplir ce champ." : "",
      errorState: errorState,
    });
    this.props.saveField(inputText, errorState);
  };

  handleInputChange = (event) => {
    const inputText = event.target.value;
    const errorState = !this.props.syntaxChecker(event.target.value);
    this.setState({
      inputText: inputText,
      errorState: errorState,
    });
    this.props.saveField(inputText, errorState);
  };

  getHelperText() {
    return this.state.inputText.length > 0
      ? this.props.helperText
      : this.state.helperText;
  }
}

export default LiveBriefedTextField;
