import React from "react";
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import Grid from "@mui/material/Grid";
import Alert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import Popup from "../../General/Popups/Popup";
import PersonInCharge from "../PersonInCharge";
import { getCurrentUser } from "../../../GraphQL/queries/UserQueries";
import { getLegalGuardiansByUser } from "../../../GraphQL/queries/LegalGuardianQueries";
import { modifyCurrentUserInfo } from "../../../GraphQL/mutations/UserMutations";
import AddPersonInCharge from "../AddPersonInCharge";
import { Paper } from "@mui/material";
import { Hidden } from "@mui/material";
import './test.css'

class PersonalDataForm extends React.Component {
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

  checkRequiredFields() {
    let firstnameValid = this.state.newFirstname.value !== "";
    let lastnameValid = this.state.newLastname.value !== "";
    let birthdayValid = this.state.newBirthday.value !== "";
    let birthPlaceValid = this.state.newBirthplace.value !== ""; 
    let addressValid = this.state.newAddress.value !== "";
    let postalCodeValid = this.state.newPostalCode.value !== "";
    let cityValid = this.state.newCity.value !== "";
    let mobileNumberValid = this.state.newMobileNumber.value !== "";

    let currentFieldsAreValid = this.state.fieldsAreValid; 
    this.setState({
      fieldsAreValid: 
        firstnameValid &&
        lastnameValid &&
        birthdayValid &&
        birthPlaceValid &&
        addressValid &&
        postalCodeValid &&
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
      this.state.newPostalCode.value,
      this.state.newCity.value,
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

  deleteLegalGuardian = (idLegalGuardian) => {
    this.setState({
      legalGuardians: this.state.legalGuardians.filter(function (
        legalGuardian
      ) {
        return legalGuardian.id !== idLegalGuardian;
      }),
    });
  };

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
              <BriefedTextField
                id={"postalCode-field"}
                required={true}
                label="Code postal"
                type="text"
                name="postalCode"
                value={this.state.newPostalCode.value}
                saveField={(input, errorState) =>
                  this.updateField("newPostalCode", input, errorState)
                }
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
              <BriefedTextField
                id={"phoneNumber-field"}
                label="Téléphone Fixe"
                type="tel"
                name="phoneNumber"
                value={this.state.newPhoneNumber.value}
                saveField={(input, errorState) =>
                  this.updateField("newPhoneNumber", input, errorState)
                }
              />
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <BriefedTextField
                id={"mobileNumber-field"}
                required={true}
                label="Téléphone portable"
                type="tel"
                name="mobileNumber"
                value={this.state.newMobileNumber.value}
                saveField={(input, errorState) =>
                  this.updateField("newMobileNumber", input, errorState)
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

          <Paper
            style={{
              padding: 3,
              marginTop: "10px",
              marginLeft: "2px",
              marginRight: "2px",
              marginBottom: "0px",
              color: "white",
              fontWeight: "bold",
              background: "#1976D2",
            }}
            elevation={0}
          >
            <Grid
              item
              container
              direction="row"
              style={{ textAlign: "center" }}
            >
              <Grid item xs={4} md={4} lg={1} style={{ paddingLeft: "20px" }}>
                <p>Prénom</p>
              </Grid>
              <Grid item xs={4} md={4} lg={2}>
                <p>Nom</p>
              </Grid>

              <Grid item xs={4} md={4} lg={2}>
                <p>Parenté</p>
              </Grid>
              <Grid item xs={4} md={4} lg={3}>
                <p>Mobile</p>
              </Grid>
              <Grid item xs={4} md={4} lg={2}>
                <p>Email</p>
              </Grid>

              <Hidden lgUp>
                <Grid item xs={4} md={4}></Grid>
              </Hidden>
              <Hidden lgUp>
                <Grid item xs={4} md={3} style={{ height: "40px" }}></Grid>
              </Hidden>
            </Grid>
          </Paper>

          {this.state.legalGuardians.map((legalGuardian) => {
            return (
              <PersonInCharge
                key={legalGuardian.id}
                id={legalGuardian.id}
                firstname={legalGuardian.firstname}
                lastname={legalGuardian.lastname}
                relationship={legalGuardian.relationship}
                mobileNumber={legalGuardian.mobileNumber}
                email={legalGuardian.email}
                parentCallback={(idLegalGuardian) =>
                  this.deleteLegalGuardian(idLegalGuardian)
                }
              />
            );
          })}
        </Grid>

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
          <AddPersonInCharge
            parentCallback={(legalGuardian) =>
              this.addLegalGuardian(legalGuardian)
            }
          />
        </Popup>
      </div>
    );
  }
}

export default PersonalDataForm;
