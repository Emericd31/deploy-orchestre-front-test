import React from "react";
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { FormGroup } from "@mui/material";
import { TextField } from "@mui/material";
import { getMedicalDataCurrentUser } from "../../../GraphQL/queries/UserQueries";
import { getBloodTypes } from "../../../GraphQL/queries/BloodTypeQueries";
import { getMedicalPrescriptionCurrentUser } from "../../../GraphQL/queries/MedicalPrescriptionQueries";
import { addMedicalPrescription, deleteMedicalPrescription } from "../../../GraphQL/mutations/MedicalPrescriptionMutation";
import { modifyCurrentUserHealthData } from "../../../GraphQL/mutations/UserMutations"
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import MedicalPrescription from "../MedicalPrescription";

class HealthForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasChanged: false,
      bloodTypes: [],
      currentBloodType: "",
      currentSocialSecurityNumber: "",
      currentMedicalTreatment: false,
      currentFoodAllergy: false,
      currentDrugAllergy: false,
      currentAsthma: false,
      currentAllergiesText: "",
      currentHealthProblems: "",
      currentMedicalDevices: "",
      currentReferringDoctorFirstname: "", 
      currentReferringDoctorLastname: "", 
      currentReferringDoctorMobileNumber: "", 
      currentExactData: false,
      openSnackbar: false,
      selectedFile: null,
      medicalPrescriptions: []
    };
  }

  nullToEmptyString(value) {
    return value === null ? "" : value;
  }

  componentDidMount() {
    getBloodTypes().then((res) => {
      this.setState({ bloodTypes: res.bloodTypes });
    });

    getMedicalDataCurrentUser().then((res) => {
      let currentUser = res.currentUser;
      this.setState({
        currentBloodType: currentUser.bloodType.id,
        currentSocialSecurityNumber: this.nullToEmptyString(
          currentUser.socialSecurityNumber
        ),
        currentMedicalTreatment: currentUser.medicalTreatment,
        currentFoodAllergy: currentUser.foodAllergy,
        currentDrugAllergy: currentUser.drugAllergy,
        currentAsthma: currentUser.asthma,
        currentAllergiesText: this.nullToEmptyString(currentUser.allergiesText),
        currentHealthProblems: this.nullToEmptyString(
          currentUser.healthProblems
        ),
        currentMedicalDevices: this.nullToEmptyString(
          currentUser.medicalDevices
        ),
        currentReferringDoctorFirstname: this.nullToEmptyString(
          currentUser.referringDoctorFirstname
        ),
        currentReferringDoctorLastname: this.nullToEmptyString(
          currentUser.referringDoctorLastname
        ),
        currentReferringDoctorMobileNumber: this.nullToEmptyString(
          currentUser.referringDoctorMobileNumber
        )
      });

      getMedicalPrescriptionCurrentUser().then((res) => {
        this.setState({ medicalPrescriptions: res.medicalPrescriptionsByUser });
      })
    });

    this.props.functionCheckCompleted(2, true);
  }

  updateField(field, input, errorState) {
    this.setState(
      {
        [field]: input,
      },
      () => {
        this.checkChange();
      }
    );
  }

  changeCheck(field, input) {
    this.setState({
      [field]: input,
    });
  }

  updateSelect(field, input) {
    this.setState({
      [field]: input,
    });
  }

  checkChange = () => {
  };

  handleClickUpload = (event) => {
    document.getElementById("file").click();
  };

  validateFileType = () => {
    var fileName = document.getElementById("file").value;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile == "jpg" || extFile == "pdf") {
      var file = document.getElementById("file").files[0];
      this.setState({ selectedFile: document.getElementById("file").files });
      addMedicalPrescription(file).then((res) => {
        document.getElementById("file").value = "";
        if (res.addMedicalPrescription.statusCode == 200) {
          const medicalPrescription = {
            id: res.addMedicalPrescription.id,
            filename: fileName.split('\\').pop().split('/').pop(),
            extension: extFile,
            uploadDate: Date.now().toString()
          }
          this.setState({ medicalPrescriptions: [...this.state.medicalPrescriptions, medicalPrescription] });
        }
      })
    } else {
      this.setState({ openSnackbar: true });
    }
  }

  deleteMedicalPrescription = (id) => {
    deleteMedicalPrescription(id).then((res) => {
      if (res.deleteMedicalPrescription.statusCode === 200) {
        this.setState({
          medicalPrescriptions: this.state.medicalPrescriptions.filter(function (medicalPrescription) {
            return medicalPrescription.id !== id;
          })
        });
      }
    })
  }

  saveUserInfo = () => {
    modifyCurrentUserHealthData(
      this.state.currentBloodType, 
      this.state.currentSocialSecurityNumber, 
      this.state.currentMedicalTreatment, 
      this.state.currentFoodAllergy, 
      this.state.currentDrugAllergy, 
      this.state.currentAsthma, 
      this.state.currentAllergiesText, 
      this.state.currentHealthProblems, 
      this.state.currentMedicalDevices, 
      this.state.currentReferringDoctorFirstname, 
      this.state.currentReferringDoctorLastname, 
      this.state.currentReferringDoctorMobileNumber
    ).then((res) => {
      if (res.modifyCurrentUserHealthData.statusCode === 200) {
        this.props.functionCallback(); 
      }
    })
  }

  handleClose = () => {
    this.setState({ openSnackbar: false });
  }

  render() {
    return (
      <div>
        <Snackbar open={this.state.openSnackbar} autoHideDuration={6000} onClose={() => this.handleClose()}>
          <Alert onClose={() => this.handleClose()} severity="error" variant="filled" sx={{ width: '100%' }}>
            Seuls les fichiers .jpg et .pdf sont autorisés !
          </Alert>
        </Snackbar>
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
          <h1>Fiche sanitaire : </h1>
        </div>

        <div>
          <Grid
            item
            container
            direction="row"
            spacing={3}
            style={{ textAlign: "center" }}
          >
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="bloodType_label">
                  Groupe sanguin
                </InputLabel>
                <Select
                  id="type"
                  labelId="bloodType_label"
                  label="Groupe sanguin"
                  value={this.state.currentBloodType}
                  onChange={(event) =>
                    this.updateSelect("currentBloodType", event.target.value)
                  }
                >
                  {this.state.bloodTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <BriefedTextField
                id={"lastname-field"}
                label="Numéro de sécurité sociale"
                type="text"
                name="text"
                value={this.state.currentSocialSecurityNumber}
                saveField={(input, errorState) =>
                  this.updateField(
                    "currentSocialSecurityNumber",
                    input,
                    errorState
                  )
                }
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <FormControlLabel
                style={{ float: "left" }}
                control={
                  <Checkbox
                    checked={this.state.currentMedicalTreatment}
                    onChange={() =>
                      this.changeCheck(
                        "currentMedicalTreatment",
                        !this.state.currentMedicalTreatment
                      )
                    }
                    name="checkedA"
                    color="primary"
                  />
                }
                label="Traitement médical"
              />
            </Grid>
          </Grid>

          <Paper
            style={{
              padding: 10,
              marginTop: "10px",
              marginLeft: "2px",
              marginRight: "2px",
              marginBottom: "50px",
              color: "white",
              fontWeight: "bold",
              background: "#DF6D18",
            }}
            elevation={3}
          >
            <Grid
              item
              container
              direction="row"
              style={{ textAlign: "center" }}
            >
              <Grid item xs={12} md={1} lg={1}>
                <WarningIcon style={{ marginTop: "15px" }}></WarningIcon>
              </Grid>
              <Grid item xs={12} md={11} lg={11}>
                <p style={{ textAlign: "left" }}>
                  Aucun médicament ne sera donné à un mineur sans ordonnance
                  <br />
                  Boites de médicaments dans leur emballage d'origine, marquées
                  au nom de l'enfant et accompagnées de l'ordonnance rédigée en
                  DCI.
                </p>
              </Grid>
            </Grid>
          </Paper>
        </div>

        <div>
          {
            this.state.medicalPrescriptions.length > 0 ? (
              <div>
                <h2 style={{ float: "left" }}>Mes ordonnances médicales : </h2>
                <Button
                  style={{ float: "right", marginTop: "25px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => this.handleClickUpload()}
                >
                  <NoteAddIcon style={{ marginRight: "10px" }} />
                  ORDONNANCE MEDICALE
                </Button>
                <div>
                  <input type='file' id='file' accept=".jpg, .pdf" onChange={() => this.validateFileType()} style={{ display: 'none' }} />
                </div>
                {this.state.medicalPrescriptions.map((medicalPrescription) => {
                  return (
                    <MedicalPrescription
                      key={medicalPrescription.id}
                      id={medicalPrescription.id}
                      filename={medicalPrescription.filename}
                      extension={medicalPrescription.extension}
                      uploadDate={medicalPrescription.uploadDate}
                      parentCallback={(medicalPrescriptionId) =>
                        this.deleteMedicalPrescription(medicalPrescriptionId)
                      }
                    ></MedicalPrescription>
                  );
                })}
              </div>
            ) : (
              <p>Aucune ordonnance n'a été uploadé.</p>
            )
          }
        </div>

        <Grid item container direction="row" style={{ textAlign: "center" }}>
          <Grid item xs={12} md={12} lg={12}>
            <h3 style={{ float: "left" }}>Présentez-vous des allergies : </h3>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.currentAsthma}
                    onChange={() =>
                      this.changeCheck(
                        "currentAsthma",
                        !this.state.currentAsthma
                      )
                    }
                    name="Asthme"
                    color="primary"
                  />
                }
                label="Asthme"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.currentFoodAllergy}
                    onChange={() =>
                      this.changeCheck(
                        "currentFoodAllergy",
                        !this.state.currentFoodAllergy
                      )
                    }
                    name="Alimentaire"
                    color="primary"
                  />
                }
                label="Alimentaire"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.currentDrugAllergy}
                    onChange={() =>
                      this.changeCheck(
                        "currentDrugAllergy",
                        !this.state.currentDrugAllergy
                      )
                    }
                    name="Médicamenteuse"
                    color="primary"
                  />
                }
                label="Médicamenteuse"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              style={{ width: "100%", marginTop: "20px" }}
              id="outlined-multiline-static"
              multiline
              rows={4}
              variant="outlined"
              placeholder="Préciser la cause de l'allergie et la conduite à tenir (si automédication, merci de le signaler)"
              value={this.state.currentAllergiesText}
              onChange={(event, errorState) =>
                this.updateField(
                  "currentAllergiesText",
                  event.target.value,
                  errorState
                )
              }
            />
          </Grid>
        </Grid>

        <Grid item container direction="row" style={{ textAlign: "center" }}>
          <Grid item xs={12} md={12} lg={12}>
            <h2 style={{ float: "left" }}>Recommandations importantes</h2>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              style={{ width: "100%", marginBottom: "20px" }}
              id="outlined-multiline-static"
              multiline
              rows={4}
              variant="outlined"
              placeholder="Merci d'indiquer les éventuels problèmes ou difficultés de santé : maladie, accident, crises convulsives, opérations, rééducations, ...
              En indiquant les précautions éventuelles."
              value={this.state.currentHealthProblems}
              onChange={(event, errorState) =>
                this.updateField(
                  "currentHealthProblems",
                  event.target.value,
                  errorState
                )
              }
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              style={{ width: "100%" }}
              id="outlined-multiline-static"
              multiline
              rows={4}
              variant="outlined"
              placeholder="Portez-vous des lunettes, lentilles, prothèses auditives ou dentaires ?
              Précisez aussi s'il est astreint à un régime alimentaire particulier (allergies, intolérances, ...)"
              value={this.state.currentMedicalDevices}
              onChange={(event, errorState) =>
                this.updateField(
                  "currentMedicalDevices",
                  event.target.value,
                  errorState
                )
              }
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="row"
          spacing={3}
          style={{ textAlign: "center" }}
        >
          <Grid item xs={12} md={12} lg={12}>
            <h2 style={{ float: "left" }}>Médecin traitant</h2>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <BriefedTextField
              id={"lastname-field"}
              label="Nom"
              type="text"
              name="text"
              value={this.state.currentReferringDoctorLastname}
              saveField={(input, errorState) =>
                this.updateField("currentReferringDoctorLastname", input, errorState)
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <BriefedTextField
              id={"firstname-field"}
              label="Prénom"
              type="text"
              name="text"
              value={this.state.currentReferringDoctorFirstname}
              saveField={(input, errorState) =>
                this.updateField("currentReferringDoctorFirstname", input, errorState)
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <BriefedTextField
              id={"mobile-number-field"}
              label="Téléphone mobile"
              type="text"
              name="text"
              value={this.state.currentReferringDoctorMobileNumber}
              saveField={(input, errorState) =>
                this.updateField("currentReferringDoctorMobileNumber", input, errorState)
              }
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="row"
          spacing={3}
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <Grid item xs={12} md={1} lg={1} style={{ display: "flex", justifyContent: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.currentExactData}
                  value={this.state.currentExactData}
                  onChange={(event, errorState) =>
                    this.changeCheck(
                      "currentExactData", !this.state.currentExactData
                    )
                  }
                  name="Asthme"
                  color="primary"
                />
              }
              label=""
            />

          </Grid>
          <Grid item xs={12} md={11} lg={11}>
            <p style={{ fontWeight: "bold", textAlign: "left" }}>
              (Requis *)
              <br />
              Je déclare exacts les renseignements sur cette fiche.
              <br /> J'autorise par la présente le responsable du voyage à
              prendre, le cas échéant, toutes mesures (traitement médical,
              hospitalisation, interventions chirurgicale) rendues nécessaires
              par l'état du membre actif dont je suis responsable légal.
            </p>
          </Grid>
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
            disabled={false}
            onClick={() => this.props.functionCallbackDecrement()}
            variant="contained"
            sx={{
              backgroundColor: "#1D70B7"
            }}
          >
            Retour
          </Button>
          <Button
            disabled={!this.state.currentExactData}
            onClick={() => this.saveUserInfo()}
            variant="contained"
            sx={{
              ml: 2,
              backgroundColor: "#1D70B7"
            }}
          >
            Suivant
          </Button>
        </div>
      </div>
    );
  }
}

export default HealthForm;
