import React from "react";
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { addLegalGuardian, modifyLegalGuardian } from "../../../GraphQL/mutations/LegalGuardianMutations";
import LiveBriefedTextField from "../../General/TextFields/LiveBriefedTextField";
import EditIcon from '@mui/icons-material/Edit';

const emailRegexSafe = require("email-regex-safe");

class LegalGuardianForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: this.props.isEditable ?? false,
      firstname: this.props.isEditable ? this.props.legalGuardian.firstname : "",
      lastname: this.props.isEditable ? this.props.legalGuardian.lastname : "",
      relationship: this.props.isEditable ? this.props.legalGuardian.relationship : "",
      email: this.props.isEditable ? this.props.legalGuardian.email : "",
      mobileNumber: this.props.isEditable ? this.props.legalGuardian.mobileNumber : "",
      areFieldsValid: false,
    };
  }

  componentDidMount = () => {
    this.checkRequiredFields();
  }

  checkRequiredFields() {
    let firstnameValid = this.state.firstname !== "";
    let lastnameValid = this.state.lastname !== "";
    let relationshipValid = this.state.relationship !== "";
    let mobileNumberValid = this.state.mobileNumber !== "" && this.phoneSyntaxCheck(this.state.mobileNumber);
    let emailValid = this.state.email !== "" && this.emailSyntaxCheck(this.state.email);

    let currentFieldsAreValid = this.state.areFieldsValid;
    let checkValidity =
      firstnameValid &&
      lastnameValid &&
      relationshipValid &&
      mobileNumberValid &&
      emailValid;

    if ((currentFieldsAreValid && !checkValidity) || (!currentFieldsAreValid && checkValidity)) {
      this.setState({
        areFieldsValid: checkValidity
      });
    }
  }

  updateField(field, input, errorState) {
    this.setState(
      {
        [field]: input
      },
      () => this.checkRequiredFields()
    );
  }

  addLegalGuardian = () => {
    addLegalGuardian(
      this.state.firstname,
      this.state.lastname,
      this.state.relationship,
      this.state.email,
      this.state.mobileNumber
    ).then((res) => {
      if (res.addLegalGuardian.statusCode === 200) {
        const legalGuardian = {
          id: res.addLegalGuardian.id,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          relationship: this.state.relationship,
          email: this.state.email,
          mobileNumber: this.state.mobileNumber,
        };
        this.props.parentCallback(legalGuardian);
      }
    });
  };

  modifyLegalGuardian = () => {
    modifyLegalGuardian(
      this.props.legalGuardian.id,
      this.state.firstname,
      this.state.lastname,
      this.state.relationship,
      this.state.email,
      this.state.mobileNumber
    ).then((res) => {
      if (res.modifyLegalGuardian.statusCode === 200) {
        const legalGuardian = {
          id: this.props.legalGuardian.id,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          relationship: this.state.relationship,
          email: this.state.email,
          mobileNumber: this.state.mobileNumber,
        };
        this.props.parentCallback(legalGuardian);
      }
    })
  }

  emailSyntaxCheck = (email) => {
    return email.match(emailRegexSafe());
  };

  phoneSyntaxCheck = (phone) => {
    const regex = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
    return phone.match(regex);
  }

  // handleKeyPress = (e) => {
  //   //it triggers by pressing the enter key
  //   if (e.keyCode === 13) {
  //     console.log("ok")
  //     if (this.props.isEditable && this.state.areFieldsValid) {
  //       this.addLegalGuardian();
  //     } else {
  //       this.modifyLegalGuardian();
  //     }
  //   }
  // };

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginRight: "1%",
            marginBottom: "3%",
          }}
        >
          {
            this.props.isEditable ? (
              <EditIcon color="primary" style={{ fontSize: 60 }} />
            ) : (
              <PersonAddIcon color="primary" style={{ fontSize: 60 }} />
            )
          }
        </div>
        <Grid item container direction="row" spacing={3} style={{ marginBottom: "20px" }}>
          <Grid item xs={12} md={12} lg={6}>
            <BriefedTextField
              id={"legal-guardian-lastname-field"}
              required={true}
              label="Nom"
              type="text"
              name="Lastname"
              value={this.state.lastname}
              saveField={(input, errorState) =>
                this.updateField("lastname", input, errorState)
              }
            />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <BriefedTextField
              id={"legal-guardian-firstname-field"}
              required={true}
              label="Prénom"
              type="text"
              value={this.state.firstname}
              saveField={(input, errorState) =>
                this.updateField("firstname", input, errorState)
              }
            />
          </Grid>
        </Grid>
        <Grid item container direction="row" spacing={3}>
          <Grid item xs={12} md={12} lg={3}>
            <BriefedTextField
              id={"legal-guardian-relationship-field"}
              required={true}
              label="Parenté"
              type="text"
              name="relationship"
              value={this.state.relationship}
              saveField={(input, errorState) =>
                this.updateField("relationship", input, errorState)
              }
            />
          </Grid>
          <Grid item xs={12} md={12} lg={3}>
            <LiveBriefedTextField
              id={"legal-guardian-mobileNumber-field"}
              required={true}
              label="Mobile"
              type="text"
              value={this.state.mobileNumber}
              helperText="La syntaxe du numéro de téléphone n'est pas valide."
              saveField={(input, errorState) =>
                this.updateField("mobileNumber", input, errorState)
              }
              syntaxChecker={this.phoneSyntaxCheck}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            <LiveBriefedTextField
              id={"legal-guardian-email-field"}
              required={true}
              label="Adresse Mail"
              type="email"
              value={this.state.email}
              helperText="La syntaxe de l'e-mail n'est pas valide."
              saveField={(input, errorState) =>
                this.updateField("email", input, errorState)
              }
              syntaxChecker={this.emailSyntaxCheck}
            />
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginRight: "1%",
          }}
        >
          {
            this.props.isEditable ? (
              <Button
                disabled={!this.state.areFieldsValid}
                style={{ marginTop: "50px", textAlign: "center" }}
                variant="contained"
                color="primary"
                onClick={() => this.modifyLegalGuardian()}
                type="submit"
              >
                Modifier
              </Button>
            ) : (
              <Button
                disabled={!this.state.areFieldsValid}
                style={{ marginTop: "50px", textAlign: "center" }}
                variant="contained"
                color="primary"
                onClick={() => this.addLegalGuardian()}
                type="submit"
              >
                Ajouter
              </Button>
            )
          }
        </div>
      </div>
    );
  }
}

export default LegalGuardianForm;
