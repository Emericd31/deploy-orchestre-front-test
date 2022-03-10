import React from "react";
import BriefedTextField from "../General/TextFields/BriefedTextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { addLegalGuardian } from "../../GraphQL/mutations/LegalGuardianMutations";

class AddPersonInCharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: { value: "", isValid: false },
      lastname: { value: "", isValid: false },
      relationship: { value: "", isValid: false },
      email: { value: "", isValid: false },
      mobileNumber: { value: "", isValid: false },
      areFieldsValid: false,
    };
  }

  checkFormValidity() {
    this.setState({
      areFieldsValid:
        this.state.firstname.isValid &&
        this.state.lastname.isValid &&
        this.state.email.isValid &&
        this.state.mobileNumber.isValid,
    });
  }

  updateField(field, input, errorState) {
    this.setState(
      {
        [field]: {
          value: input,
          isValid: !errorState,
        },
      },
      () => this.checkFormValidity()
    );
  }

  addLegalGuardian = () => {
    addLegalGuardian(
      this.state.firstname.value,
      this.state.lastname.value,
      this.state.relationship.value,
      this.state.email.value,
      this.state.mobileNumber.value
    ).then((res) => {
      if (res.addLegalGuardian.statusCode === 200) {
        const legalGuardian = {
          id: res.addLegalGuardian.id,
          firstname: this.state.firstname.value,
          lastname: this.state.lastname.value,
          relationship: this.state.relationship.value,
          email: this.state.email.value,
          mobileNumber: this.state.mobileNumber.value,
        };
        this.props.parentCallback(legalGuardian);
      }
    });
  };

  handleKeyPress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      this.addLegalGuardian();
    }
  };

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
          <PersonAddIcon color="primary" style={{ fontSize: 60 }} />
        </div>
        <Grid item container direction="row" spacing={3} style={{marginBottom: "20px"}}>
          <Grid item xs={12} md={12} lg={6}>
            <BriefedTextField
              id={"legal-guardian-lastname-field"}
              required={true}
              label="Nom"
              type="text"
              name="Lastname"
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
              required={false}
              label="Parenté"
              type="text"
              name="relationship"
              saveField={(input, errorState) =>
                this.updateField("relationship", input, errorState)
              }
            />
          </Grid>
          <Grid item xs={12} md={12} lg={3}>
            <BriefedTextField
              id={"legal-guardian-mobileNumber-field"}
              required={true}
              label="Téléphone Mobile"
              type="text"
              saveField={(input, errorState) =>
                this.updateField("mobileNumber", input, errorState)
              }
            />
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            <BriefedTextField
              id={"legal-guardian-email-field"}
              required={true}
              label="Adresse Mail"
              type="email"
              saveField={(input, errorState) =>
                this.updateField("email", input, errorState)
              }
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
        </div>
      </div>
    );
  }
}

export default AddPersonInCharge;
