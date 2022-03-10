import "../../../styles/Form.css";
import React from "react";

import { Navigate } from "react-router-dom";

import { loginUser } from "../../../GraphQL/mutations/UserMutations";

import BriefedTextField from "../../General/TextFields/BriefedTextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from '@mui/material/Alert';

class SignInForm extends React.Component {
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
    };
  }

  checkFormValidity() {
    this.setState({
      areFieldsValid: this.state.email.isValid && this.state.password.isValid,
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

  submitClick = (event) => {
    this.setState({ isLoading: true });
    event.preventDefault();
    const { email, password } = this.state;
    const user = {
      email: email.value,
      password: password.value,
    };
    loginUser(user.email, user.password)
      .then((res) => {
        this.setState({ isLoading: false });
        const mutation = res.login;
        if (mutation.statusCode === 200) {
          localStorage.setItem("Token", mutation.token);
          localStorage.setItem("userId", parseInt(mutation.id));
          this.setState({ redirect: "/board" });
        } else if (mutation.statusCode === 400) {
          this.setState({
            errorAlert: "E-mail ou mot de passe incorrect.",
            successAlert: null,
          });
        } else if (mutation.statusCode === 403) {
          this.setState({
            errorAlert: "Veuillez confirmer votre compte.",
            successAlert: null,
          });
        } else if (mutation.statusCode === 404) {
          this.setState({
            errorAlert: "Impossible d'accéder à l'application. Veuillez contacter un administrateur.", 
            successAlert: null
          })
        }
      })
      .catch(() => {
        this.setState({
          errorAlert:
            "Impossible d'établir une connexion avec le serveur. Réessayez plus tard.",
          successAlert: null,
          isLoading: false,
        });
      });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { errorAlert, successAlert } = this.state;

    return (
      <div className="form" style={{minWidth: "350px"}}>
        <form onSubmit={this.submitClick}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <BriefedTextField
                id={"email-field"}
                label="Adresse e-mail"
                type="email"
                name="email"
                saveField={(input, errorState) =>
                  this.updateField("email", input, errorState)
                }
              />
            </Grid>
            <Grid item>
              <BriefedTextField
                id={"password-field"}
                label="Mot de passe"
                type="password"
                saveField={(input, errorState) =>
                  this.updateField("password", input, errorState)
                }
              />
            </Grid>
            <Grid item>
              <Button
                id={"sign-in-button"}
                type="submit"
                disabled={!this.state.areFieldsValid || this.state.isLoading}
                variant="contained"
                color="primary"
                fullWidth={true}
              >
                Connexion
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
