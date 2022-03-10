import React from "react";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { Edit, Delete } from "@mui/icons-material";
import { Hidden } from "@mui/material";
import { removeInstrument } from "../../GraphQL/mutations/InstrumentsMutations";
import Popup from "../General/Popups/Popup";

class Instrument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      isSelected: false,
      type: props.type,
      marque: props.marque,
      model: props.model,
      serialNumber: props.serialNumber,
      formation: props.formation,
      openPopupConfirmDelete: false,
    };
  }

  deleteInstrument = () => {
    removeInstrument(this.state.id).then((res) => {
      if (res.removeInstrument.statusCode === 200) {
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
            marginBottom: "10px",
            color: "black",
            fontWeight: "bold",
            background: "white",
          }}
          elevation={3}
        >
          <Grid item container direction="row" style={{ textAlign: "center" }}>
            <Grid item xs={4} md={4} lg={2}>
              <p>{this.state.type}</p>
            </Grid>
            <Grid item xs={4} md={4} lg={2}>
              <p>{this.state.marque}</p>
            </Grid>

            <Grid item xs={4} md={4} lg={2}>
              <p>{this.state.model}</p>
            </Grid>
            <Grid item xs={4} md={4} lg={2}>
              <p>{this.state.serialNumber}</p>
            </Grid>
            <Grid item xs={4} md={4} lg={2}>
              <p>{this.state.formation}</p>
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
                  style={{
                    width: "90%",
                    marginLeft: "10%",
                    backgroundColor: "#c62828"
                  }}
                  onClick={() =>
                    this.setState({ openPopupConfirmDelete: true })
                  }
                >
                  <Delete />
                </Button>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </Paper>

        <Popup
          title="Supprimer un instrument"
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
                Etes-vous de sûr de vouloir supprimer l'instrument{" "}
                {'"' +
                  this.state.type +
                  '" de marque : "' +
                  this.state.marque +
                  '" et modèle : "' +
                  this.state.model +
                  '"'}
                <br />
                {'dont le numéro de série est le : "' +
                  this.state.serialNumber +
                  '"'}{" "}
                de vos instruments
              </p>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
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
                onClick={() => this.deleteInstrument()}
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

export default Instrument;
