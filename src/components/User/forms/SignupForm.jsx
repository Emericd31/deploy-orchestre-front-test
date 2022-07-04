import "../../../styles/Form.css";
import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import LiveBriefedTextField from "../../General/TextFields/LiveBriefedTextField";
import Alert from '@mui/material/Alert';
import { addUser } from '../../../GraphQL/mutations/UserMutations';

const emailRegexSafe = require("email-regex-safe");

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: { value: "", isValid: false },
      lastName: { value: "", isValid: false },
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
      confirmPassword: { value: "", isValid: false },
      areAllFieldsValid: false,
      errorAlert: null,
      successAlert: null,
      redirect: null,
      isLoading: false,
    };
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

  emailSyntaxCheck = (email) => {
    return email.match(emailRegexSafe());
  };

  passwordSyntaxCheck = (password) => {
    var re = {
      'capital': /[A-Z]/,
      'digit': /[0-9]/,
    };

    return re.capital.test(password) &&
      re.digit.test(password) &&
      password.length >= 8 && 
      password.length <= 20;
  };

  confirmPasswordSyntaxCheck = (confirmPassword, password) => {
    return confirmPassword === password;
  };

  checkFormValidity() {
    this.setState({
      areAllFieldsValid:
        this.state.email.isValid &&
        this.state.password.isValid &&
        this.state.firstName.isValid &&
        this.state.lastName.isValid &&
        this.state.password.isValid &&
        this.state.confirmPassword.isValid,
    });
  }

  submitClick = (event) => {
    event.preventDefault();
    const newUser = {
      firstName: this.state.firstName.value,
      lastName: this.state.lastName.value,
      email: this.state.email.value,
      password: this.state.password.value,
    };
    addUser(newUser.firstName, newUser.lastName, newUser.email, newUser.password).then((res) => {
      const mutation = res.addUser;
      if (mutation.statusCode === 200) {
        this.setState({
          errorAlert: null,
          successAlert: "Compte crée avec succès. Un e-mail de confirmation vous a été envoyé.",
          userId: mutation.id,
        });
        if (this.props.parentCallback) {
          this.props.parentCallback();
        }
      } else if (mutation.statusCode === 403) {
        this.setState({
          errorAlert: "Cette adresse e-mail est déjà utilisée. Veuillez vous connecter.",
          successAlert: null,
        });
        console.error("Code: " + mutation.statusCode + " " + mutation.message);
      } else {
        this.setState({
          errorAlert: "Erreur lors de la création du compte",
          successAlert: null,
        });
        console.error("Code: " + mutation.statusCode + " " + mutation.message);
      }
    });
  };

  render() {
    const { errorAlert, successAlert } = this.state;
    return (
      <div>
        <form onSubmit={this.submitClick}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={6}
            >
              <BriefedTextField
                id="last-name-field"
                label="Nom"
                type="text"
                required={true}
                saveField={(input, errorState) =>
                  this.updateField("lastName", input, errorState)
                }
              />
            </Grid>

            <Grid
              item
              xs={6}
            >
              <BriefedTextField
                id="first-name-field"
                label="Prénom"
                type="text"
                required={true}
                saveField={(input, errorState) =>
                  this.updateField("firstName", input, errorState)
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <LiveBriefedTextField
                id={"email-field"}
                label="Email"
                type="email"
                required={true}
                helperText="La syntaxe de l'e-mail n'est pas valide."
                saveField={(input, errorState) =>
                  this.updateField("email", input, errorState)
                }
                syntaxChecker={this.emailSyntaxCheck}
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <p>Le mot de passe choisi est temporaire et devra être modifié par l'utilisateur lors de sa première connexion.<br />Le mot de passe doit contenir entre 8 et 20 caractères dont un nombre, une minuscule et une majuscule.<br />Il lui sera communiqué dans l'email d'inscription.</p>
              <LiveBriefedTextField
                id={"password-field"}
                label="Mot de passe"
                type="password"
                required={true}
                helperText="La syntaxe du mot de passe n'est pas valide. Veuillez vous assurer qu'il contienne entre 8 et 20 caractères
                dont un nombre, une minuscule et une majuscule."
                saveField={(input, errorState) =>
                  this.updateField("password", input, errorState)
                }
                syntaxChecker={this.passwordSyntaxCheck}
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <LiveBriefedTextField
                id="confirmPassword-field"
                label="Vérifier le mot de passe"
                type="password"
                required={true}
                helperText="Les deux mots de passe ne sont pas identiques."
                saveField={(input, errorState) =>
                  this.updateField("confirmPassword", input, errorState)
                }
                syntaxChecker={(input) =>
                  this.confirmPasswordSyntaxCheck(
                    input,
                    this.state.password.value
                  )
                }
                updateChecker={this.state.password.value}
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <Button
                style={{
                  width: "60%",
                  marginLeft: "20%",
                  marginrigth: "20%",
                }}
                id={"sign-up-button"}
                type="submit"
                disabled={!this.state.areAllFieldsValid}
                variant="contained"
                color="primary"
                fullWidth={true}
              >
                Créer le compte
              </Button>
            </Grid>
          </Grid>
        </form>
        <div className="alert">
          {errorAlert && <Alert severity="error"> {errorAlert} </Alert>}
          {successAlert && <Alert severity="success"> {successAlert} </Alert>}
        </div>
      </div>
    );
  }
}

export default SignInForm;
