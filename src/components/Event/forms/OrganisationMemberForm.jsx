import React from "react";
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LiveBriefedTextField from "../../General/TextFields/LiveBriefedTextField";
import EditIcon from '@mui/icons-material/Edit';
import { addOrganisationMember, modifyOrganisationMember } from "../../../GraphQL/mutations/OrganisationMemberMutation";

const emailRegexSafe = require("email-regex-safe");

/**
 * Formulaire d'ajout ou de modification d'un membre d'organisation d'un évènement
 * 
 * Props : 
 * parentCallback(organisationMember) : function, fonction prenant en paramètre un objet organisationMember
 *    qui sera appelée après les actions du formulaire
 * isEditable : booléen, true si c'est une modification, false si c'est un ajout
 * isEventCreated : booléen, true si l'évènement a été crée au préalable, false sinon
 * nbOrganisationMember : nombre de membres d'organisation (à renseigner si l'évènement n'est pas crée)
 * organisationMember : object, objet contenant les informations d'un organisationMember
 *    (champ obligatoire : id)
 */
class OrganisationMemberForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: this.props.isEditable ?? false,
      eventId: this.props.isEventCreated ? this.props.eventId : null,
      currentOrganisationMember: this.props.isEditable ? this.props.organisationMember : null,
      nbOrganisationMember: this.props.isEventCreated ? 0 : this.props.nbOrganisationMember,
      idOrganisationMember: this.props.isEditable ? this.props.organisationMember.id : null,
      firstname: this.props.isEditable ? this.props.organisationMember.firstname : "",
      lastname: this.props.isEditable ? this.props.organisationMember.lastname : "",
      relationship: this.props.isEditable ? this.props.organisationMember.relationship : "",
      email: this.props.isEditable ? this.props.organisationMember.email : "",
      mobileNumber: this.props.isEditable ? this.props.organisationMember.mobileNumber : "",
      areFieldsValid: false,
    };
  }

  componentDidMount = () => {
    this.checkRequiredFields();
  }

  checkRequiredFields() {
    let lastnameValid = this.state.lastname !== "";
    let mobileNumberValid = this.state.mobileNumber === "" || this.phoneSyntaxCheck(this.state.mobileNumber);
    let emailValid = this.state.email === "" || this.emailSyntaxCheck(this.state.email);

    let currentFieldsAreValid = this.state.areFieldsValid;
    let checkValidity =
      lastnameValid &&
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

  addOrganisationMember = () => {
    if (this.state.eventId != null) {
      addOrganisationMember(
        this.state.firstname,
        this.state.lastname,
        this.state.relationship,
        this.state.email,
        this.state.mobileNumber,
        this.state.eventId
      ).then((res) => {
        if (res.addOrganisationMember.statusCode === 200) {
          const organisationMember = {
            id: res.addOrganisationMember.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            relationship: this.state.relationship,
            email: this.state.email,
            mobileNumber: this.state.mobileNumber
          };
          this.props.parentCallback(organisationMember);
        }
      });
    } else {
      // créer un organisationMember
      const organisationMember = {
        id: this.state.nbOrganisationMember,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        relationship: this.state.relationship,
        email: this.state.email,
        mobileNumber: this.state.mobileNumber
      }
      this.props.parentCallback(organisationMember);
    }
  };

  modifyOrganisationMember = () => {
    if (this.state.eventId != null) {
      modifyOrganisationMember(
        this.props.organisationMember.id,
        this.state.firstname,
        this.state.lastname,
        this.state.relationship,
        this.state.email,
        this.state.mobileNumber
      ).then((res) => {
        if (res.modifyOrganisationMember.statusCode === 200) {
          const organisationMember = {
            id: this.props.legalGuardian.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            relationship: this.state.relationship,
            email: this.state.email,
            mobileNumber: this.state.mobileNumber,
          };
          this.props.parentCallback(organisationMember);
        }
      })
    } else {
      // modifier l'organisationMember
      const organisationMember = this.state.currentOrganisationMember;
      organisationMember.firstname = this.state.firstname;
      organisationMember.lastname = this.state.lastname;
      organisationMember.relationship = this.state.relationship;
      organisationMember.email = this.state.email;
      organisationMember.mobileNumber = this.state.mobileNumber;
      this.props.parentCallback(organisationMember);
    }
  }

  emailSyntaxCheck = (email) => {
    return email.match(emailRegexSafe());
  };

  phoneSyntaxCheck = (phone) => {
    const regex = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
    return phone.match(regex);
  }

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
              id={"organisation-member-lastname-field"}
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
              id={"organisation-member-firstname-field"}
              required={false}
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
              id={"organisation-member-relationship-field"}
              required={false}
              label="Fonction"
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
              id={"organisation-member-mobileNumber-field"}
              required={false}
              label="Mobile"
              type="tel"
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
              id={"organisation-member-email-field"}
              required={false}
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
                onClick={() => this.modifyOrganisationMember()}
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
                onClick={() => this.addOrganisationMember()}
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

export default OrganisationMemberForm;
