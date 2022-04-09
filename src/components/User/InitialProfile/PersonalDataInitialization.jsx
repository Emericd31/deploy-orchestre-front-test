import React from "react";
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import Grid from "@mui/material/Grid";
import Alert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import Popup from "../../General/Popups/Popup";
import { PersonsInCharge } from "../Account/PersonsInCharge";
import { getCurrentUser } from "../../../GraphQL/queries/UserQueries";
import { getLegalGuardiansByUser } from "../../../GraphQL/queries/LegalGuardianQueries";
import { modifyCurrentUserInfo } from "../../../GraphQL/mutations/UserMutations";
import LegalGuardianForm from "../forms/LegalGuardianForm";
import ConfirmPopup from "../../General/Popups/ConfirmPopup";
import { removeLegalGuardian } from "../../../GraphQL/mutations/LegalGuardianMutations";
import LiveBriefedTextField from "../../General/TextFields/LiveBriefedTextField";

class PersonalDataInitialization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
      areFieldsValid: false,
      errorAlert: null,
      successAlert: null,
      redirect: null,
      isLoading: false,
      legalPersonsInCharge: true,
      openPopupAddPersonInCharge: false,
      fieldsAreValid: false,
      currentValues: {
        firstname: "",
        lastname: "",
        birthday: "",
        birthplace: "",
        address: "",
        addressComplement: "",
        postalCode: "",
        city: "",
        phoneNumber: "",
        mobileNumber: "",
      },
      newFirstname: { value: "", isValid: false },
      newLastname: { value: "", isValid: false },
      newBirthday: { value: "", isValid: false },
      newBirthplace: { value: "", isValid: false },
      newAddress: { value: "", isValid: false },
      newAddressComplement: { value: "", isValid: false },
      newPostalCode: { value: "", isValid: false },
      newCity: { value: "", isValid: false },
      newPhoneNumber: { value: "", isValid: false },
      newMobileNumber: { value: "", isValid: false },
      legalGuardians: [],
      openPopupEdit: false,
      openPopupDeleteConfirm: false,
      openPopupModify: false,
      currentLegalGuardian: null,
    };
  }

  nullToEmptyString(value) {
    return value === null ? "" : value;
  }

  componentDidMount() {
    getCurrentUser().then((res) => {
      let user = res.currentUser;
      this.setState({
        currentValues: {
          firstname: this.nullToEmptyString(user.firstName),
          lastname: this.nullToEmptyString(user.lastName),
          birthday: this.nullToEmptyString(user.birthday),
          birthplace: this.nullToEmptyString(user.birthPlace),
          address: this.nullToEmptyString(user.address),
          addressComplement: this.nullToEmptyString(user.addressComplement),
          postalCode: this.nullToEmptyString(user.postalCode),
          city: this.nullToEmptyString(user.city),
          phoneNumber: this.nullToEmptyString(user.phoneNumber),
          mobileNumber: this.nullToEmptyString(user.mobileNumber),
        },
        newFirstname: { value: this.nullToEmptyString(user.firstName) },
        newLastname: { value: this.nullToEmptyString(user.lastName) },
        newBirthday: { value: this.nullToEmptyString(user.birthday) },
        newBirthplace: { value: this.nullToEmptyString(user.birthPlace) },
        newAddress: { value: this.nullToEmptyString(user.address) },
        newAddressComplement: {
          value: this.nullToEmptyString(user.addressComplement),
        },
        newPostalCode: { value: this.nullToEmptyString(user.postalCode) },
        newCity: { value: this.nullToEmptyString(user.city) },
        newPhoneNumber: { value: this.nullToEmptyString(user.phoneNumber) },
        newMobileNumber: { value: this.nullToEmptyString(user.mobileNumber) },
      }, () => {
        this.checkRequiredFields();
      });
    });
    getLegalGuardiansByUser().then((res) => {
      this.setState({ legalGuardians: res.legalGuardiansByUser });
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
      () => {
        this.checkRequiredFields();
      }
    );
  }

  postalCodeSyntaxCheck = (postalCode) => {
    const regex = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
    return postalCode.match(regex);
  }

  phoneSyntaxCheck = (phone) => {
    const regex = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
    return phone.match(regex);
  }

  checkRequiredFields() {
    let firstnameValid = this.state.newFirstname.value !== "";
    let lastnameValid = this.state.newLastname.value !== "";
    let birthdayValid = this.state.newBirthday.value !== "";
    let birthPlaceValid = this.state.newBirthplace.value !== "";
    let addressValid = this.state.newAddress.value !== "";
    let postalCodeValid = this.state.newPostalCode.value !== "" && this.postalCodeSyntaxCheck(this.state.newPostalCode.value);
    let cityValid = this.state.newCity.value !== "";
    let mobileNumberValid = this.state.newMobileNumber.value !== "";
    let phoneNumberValid = this.state.newPhoneNumber.value === "" || (this.state.newPhoneNumber.value !== "" && this.phoneSyntaxCheck(this.state.newPhoneNumber.value));

    let currentFieldsAreValid = this.state.fieldsAreValid;
    this.setState({
      fieldsAreValid:
        firstnameValid &&
        lastnameValid &&
        birthdayValid &&
        birthPlaceValid &&
        addressValid &&
        postalCodeValid &&
        phoneNumberValid &&
        cityValid &&
        mobileNumberValid
    }, () => {
      if ((currentFieldsAreValid === false && this.state.fieldsAreValid === true) ||
        (currentFieldsAreValid === true && this.state.fieldsAreValid === false)) {
        this.props.functionCheckCompleted(0, this.state.fieldsAreValid);
      }
    });
  }

  saveUserInfo() {
    modifyCurrentUserInfo(
      this.state.newFirstname.value,
      this.state.newLastname.value,
      this.state.newBirthday.value,
      this.state.newBirthplace.value,
      this.state.newAddress.value,
      this.state.newAddressComplement.value,
      this.state.newCity.value,
      this.state.newPostalCode.value,
      this.state.newPhoneNumber.value,
      this.state.newMobileNumber.value
    ).then((res) => {
      this.setState(
        {
          currentValues: {
            firstname: this.state.newFirstname.value,
            lastname: this.state.newLastname.value,
            birthday: this.state.newBirthday.value,
            birthplace: this.state.newBirthplace.value,
            address: this.state.newAddress.value,
            addressComplement: this.state.newAddressComplement.value,
            postalCode: this.state.newPostalCode.value,
            city: this.state.newCity.value,
            phoneNumber: this.state.newPhoneNumber.value,
            mobileNumber: this.state.newMobileNumber.value,
          },
        },
        () => {
          this.props.functionCallback();
        }
      );
    });
  }

  addLegalGuardian = (legalGuardian) => {
    this.setState({
      openPopupAddPersonInCharge: false,
      legalGuardians: [...this.state.legalGuardians, legalGuardian],
    });
  };

  modifyLegalGuardian = (legalGuardian) => {
    var currentLegalGuardians = this.state.legalGuardians;
    currentLegalGuardians.map((currentLegalGuardian) => {
      if (currentLegalGuardian.id == legalGuardian.id) {
        currentLegalGuardian.firstname = legalGuardian.firstname;
        currentLegalGuardian.lastname = legalGuardian.lastname;
        currentLegalGuardian.relationship = legalGuardian.relationship;
        currentLegalGuardian.mobileNumber = legalGuardian.mobileNumber;
        currentLegalGuardian.email = legalGuardian.email;
      }
    });
    this.setState({ legalGuardians: currentLegalGuardians, openPopupModify: false });
  }

  deleteLegalGuardian = (idLegalGuardian) => {
    removeLegalGuardian(idLegalGuardian).then((res) => {
      if (res.removeLegalGuardian.statusCode === 200) {
        this.setState({
          legalGuardians: this.state.legalGuardians.filter(function (
            legalGuardian
          ) {
            return legalGuardian.id !== idLegalGuardian;
          }),
          openPopupDeleteConfirm: false
        });
      }
    });
  }

  render() {
    const { errorAlert, successAlert } = this.state;
    return (
      <div className="form">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginRight: "1%",
            marginTop: "1%",
            paddingBottom: "1%",
          }}
        >
          <h1>Mes informations : </h1>
        </div>

        <Grid container direction="column" spacing={3}>
          <Grid item container direction="row" spacing={3}>
            <Grid item xs={12} md={12} lg={6}>
              <BriefedTextField
                id={"lastname-field"}
                required={true}
                label="Nom"
                type="text"
                name="text"
                value={this.state.newLastname.value}
                saveField={(input, errorState) =>
                  this.updateField("newLastname", input, errorState)
                }
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <BriefedTextField
                id={"firstname-field"}
                required={true}
                label="Prénom"
                type="text"
                value={this.state.newFirstname.value}
                saveField={(input, errorState) =>
                  this.updateField("newFirstname", input, errorState)
                }
              />
            </Grid>
          </Grid>

          <Grid item container direction="row" spacing={3}>
            <Grid item xs={12} md={12} lg={6}>
              <BriefedTextField
                id={"birthday-field"}
                required={true}
                label="Date de naissance"
                type="date"
                name="date"
                value={
                  this.state.newBirthday.value !== ""
                    ? this.state.newBirthday.value
                    : "2000-01-01"
                }
                saveField={(input, errorState) =>
                  this.updateField("newBirthday", input, errorState)
                }
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <BriefedTextField
                id={"birthplace-field"}
                required={true}
                label="Lieu de naissance"
                type="text"
                value={this.state.newBirthplace.value}
                saveField={(input, errorState) =>
                  this.updateField("newBirthplace", input, errorState)
                }
              />
            </Grid>
          </Grid>

          <Grid item container direction="row" spacing={3}>
            <Grid item xs={12} md={12} lg={6}>
              <BriefedTextField
                id={"address-field"}
                required={true}
                label="Adresse"
                type="text"
                name="text"
                value={this.state.newAddress.value}
                saveField={(input, errorState) =>
                  this.updateField("newAddress", input, errorState)
                }
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <BriefedTextField
                id={"addressComplement-field"}
                label="Complément d'adresse"
                type="text"
                value={this.state.newAddressComplement.value}
                saveField={(input, errorState) =>
                  this.updateField("newAddressComplement", input, errorState)
                }
              />
            </Grid>
          </Grid>

          <Grid item container direction="row" spacing={3}>
            <Grid item xs={12} md={12} lg={2}>
              <LiveBriefedTextField
                id={"postalCode-field"}
                required={true}
                label="Code Postal"
                type="text"
                value={this.state.newPostalCode.value}
                helperText="La syntaxe du code postal n'est pas valide."
                saveField={(input, errorState) =>
                  this.updateField("newPostalCode", input, errorState)
                }
                syntaxChecker={this.postalCodeSyntaxCheck}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={10}>
              <BriefedTextField
                id={"city-field"}
                required={true}
                label="Ville"
                type="text"
                value={this.state.newCity.value}
                saveField={(input, errorState) =>
                  this.updateField("newCity", input, errorState)
                }
              />
            </Grid>
          </Grid>

          <Grid item container direction="row" spacing={3}>
            <Grid item xs={12} md={12} lg={6}>
              <LiveBriefedTextField
                id={"phoneNumber-field"}
                required={false}
                label="Téléphone Fixe"
                type="tel"
                name="phoneNumber"
                value={this.state.newPhoneNumber.value}
                helperText="La syntaxe du numéro de téléphone n'est pas valide."
                saveField={(input, errorState) =>
                  this.updateField("newPhoneNumber", input, errorState)
                }
                syntaxChecker={this.phoneSyntaxCheck}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <LiveBriefedTextField
                id={"mobileNumber-field"}
                required={true}
                label="Téléphone Mobile"
                type="tel"
                value={this.state.newMobileNumber.value}
                helperText="La syntaxe du numéro de téléphone n'est pas valide."
                saveField={(input, errorState) =>
                  this.updateField("newMobileNumber", input, errorState)
                }
                syntaxChecker={this.phoneSyntaxCheck}
              />
            </Grid>
          </Grid>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginRight: "1%",
              marginTop: "1%",
              paddingBottom: "1%",
            }}
          >
            <h1>Responsable(s) légal(aux) : </h1>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginRight: "1%",
            }}
          >
            <Button
              disabled={false}
              variant="contained"
              color="primary"
              style={{
                marginBottom: "30px",
              }}
              onClick={() =>
                this.setState({ openPopupAddPersonInCharge: true })
              }
            >
              Ajouter
            </Button>
          </div>
        </Grid>

        <PersonsInCharge
          functionEdit={(legalGuardian) =>
            this.setState({ currentLegalGuardian: legalGuardian, openPopupModify: true })
          }
          functionDelete={(legalGuardian) =>
            this.setState({ currentLegalGuardian: legalGuardian, openPopupDeleteConfirm: true })
          }
          editable={true}
          legalGuardians={this.state.legalGuardians}
        />

        <div
          style={{
            float: "right",
            marginRight: "10%",
            marginBottom: "50px",
            marginTop: "20px",
          }}
        >
          <Button
            disabled={!this.state.fieldsAreValid}
            onClick={() => this.saveUserInfo()}
            variant="contained"
            sx={{
              backgroundColor: "#1876D2"
            }}
          >
            Suivant
          </Button>
        </div>

        <div className="alert">
          {errorAlert && <Alert severity="error"> {errorAlert} </Alert>}
          {successAlert && <Alert severity="success"> {successAlert} </Alert>}
        </div>

        <Popup
          title="Ajouter un responsable légal"
          length="md"
          openPopup={this.state.openPopupAddPersonInCharge}
          parentCallback={() =>
            this.setState({ openPopupAddPersonInCharge: false })
          }
        >
          <LegalGuardianForm
            parentCallback={(legalGuardian) =>
              this.addLegalGuardian(legalGuardian)
            }
          />
        </Popup>

        <Popup
          title="Modifier un responsable légal"
          length="md"
          openPopup={this.state.openPopupModify}
          parentCallback={() =>
            this.setState({ openPopupModify: false })
          }
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <LegalGuardianForm
              isEditable={true}
              legalGuardian={this.state.currentLegalGuardian}
              parentCallback={(legalGuardian) =>
                this.modifyLegalGuardian(legalGuardian)
              }
            />
          </div>
        </Popup>

        <ConfirmPopup
          title={"Supprimer un responsable légal"}
          text={"Voulez vous vraiment supprimer " + this.state.currentLegalGuardian?.firstname + " " + this.state.currentLegalGuardian?.lastname + " de vos responsables légaux ? "}
          openPopup={this.state.openPopupDeleteConfirm}
          parentCallback={() => this.setState({ openPopupDeleteConfirm: false })}
          confirmButtonId="confirm-delete-legal-guardian"
          confirmButtonFunction={() => this.deleteLegalGuardian(this.state.currentLegalGuardian?.id)}
          cancelButtonFunction={() => this.setState({ openPopupDeleteConfirm: false })}
          buttonDisabled={false}
        />
      </div>
    );
  }
}

export default PersonalDataInitialization;
