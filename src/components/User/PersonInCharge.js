import React from "react";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { Edit, Delete } from "@mui/icons-material";
import { Hidden } from "@mui/material";
import { removeLegalGuardian } from "../../GraphQL/mutations/LegalGuardianMutations";
import Popup from "../General/Popups/Popup";

class PersonInCharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      isSelected: false,
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      relationship: this.props.relationship,
      mobilePhone: this.props.mobileNumber,
      mail: this.props.email,
      openPopupConfirmDelete: false,
    };
  }

  deleteLegalGuardian = () => {
    removeLegalGuardian(this.state.id).then((res) => {
      if (res.removeLegalGuardian.statusCode === 200) {
        this.props.parentCallback(this.state.id);
      }
    });
  };

  render() {
    return (
      <>
        <Paper
          onMouseEnter={() => this.setState({ isSelected: true })}
          onMouseLeave={() => this.setState({ isSelected: false })}
          style={{
            padding: 3,
            marginTop: "10px",
            marginLeft: "2px",
            marginRight: "2px",
            color: "black",
            fontWeight: "bold",
            background: "white",
          }}
          elevation={3}
        >
          <Grid item container direction="row" sx={{ textAlign: "center" }}>
            <Grid item xs={4} md={4} lg={1} sx={{paddingLeft: "20px"}}>
              <p>{this.state.firstname}</p>
            </Grid>
            <Grid item xs={4} md={4} lg={2}>
              <p>{this.state.lastname}</p>
            </Grid>

            <Grid item xs={4} md={4} lg={2}>
              <p>{this.state.relationship}</p>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
              <p>{this.state.mobilePhone}</p>
            </Grid>
            <Grid item xs={4} md={4} lg={2}>
              <p>{this.state.mail}</p>
            </Grid>

            <Hidden lgUp>
              <Grid item xs={4} md={4}></Grid>
            </Hidden>
            <Hidden lgUp>
              <Grid item xs={4} md={3} style={{ height: "40px" }}></Grid>
            </Hidden>

            {this.state.isSelected ? (
              <Grid item xs={4} md={4} lg={1} style={{display: "flex", alignItems: "center"}}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "90%", marginRight: "10%" }}
                >
                  <Edit />
                </Button>
              </Grid>
            ) : (
              ""
            )}
            {this.state.isSelected ? (
              <Grid item xs={4} md={4} lg={1} style={{display: "flex", alignItems: "center"}}>
                <Button
                  variant="contained"
                  sx={{
                    width: "90%",
                    marginLeft: "10%",
                    marginRight: "10%",
                    backgroundColor: "#c62828",
                  }}
                  onClick={() =>
                    this.setState({ openPopupConfirmDelete: true })
                  }
                >
                  <Delete style={{color: "white"}} />
                </Button>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </Paper>

        <Popup
          title="Supprimer un responsable légal"
          length="md"
          openPopup={this.state.openPopupConfirmDelete}
          parentCallback={() =>
            this.setState({ openPopupConfirmDelete: false })
          }
        >
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <p>
                Etes-vous de sûr de vouloir supprimer{" "}
                {this.state.firstname + " " + this.state.lastname} des
                responsables légaux
              </p>
            </Grid>
            <Grid item xs={6} style={{display: "flex", justifyContent: "flex-end"}}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.setState({ openPopupConfirmDelete: false })}
              >
                Annuler
              </Button>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#FF4D4D", color: "white" }}
                onClick={() => this.deleteLegalGuardian()}
              >
                Confirmer
              </Button>
            </Grid>
          </Grid>
        </Popup>
      </>
    );
  }
}

export default PersonInCharge;
