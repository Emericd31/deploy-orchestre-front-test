import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Popup from "../../General/Popups/Popup";
import Instrument from "../Instrument";
import { Paper } from "@mui/material";
import { Hidden } from "@mui/material";
import AddInstrument from "./AddInstrument";
import { getInstrumentsByUser } from "../../../GraphQL/queries/InstrumentQueries";

class InstrumentsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openPopupAddInstrument: false,
      instruments: [],
    };
  }

  componentDidMount() {
    getInstrumentsByUser().then((res) => {
      this.setState({ instruments: res.instrumentsByUser }, () => {
        this.props.functionCheckCompleted(1, true);
      });
    });
  }

  addInstrument = (instrument) => {
    this.setState({
      openPopupAddInstrument: false,
      instruments: [...this.state.instruments, instrument],
    });
  };

  deleteInstrument = (instrumentId) => {
    this.setState({
      instruments: this.state.instruments.filter(function (instrument) {
        return instrument.id !== instrumentId;
      }),
    });
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
            marginTop: "1%",
            paddingBottom: "1%",
          }}
        >
          <h1>Mes instruments de musique : </h1>
        </div>

        {this.state.instruments.length == 0 ? (
          <><p style={{ textAlign: "center", marginBottom: "30px" }}>
            Vous n'avez pas d'instrument pour le moment
          </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginRight: "1%",
              }}
            >
              <Button
                onClick={() => this.setState({ openPopupAddInstrument: true })}
                disabled={false}
                variant="contained"
                color="primary"
                style={{
                  marginBottom: "30px",
                }}
              >
                Ajouter
              </Button>
            </div></>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginRight: "1%",
              }}
            >
              <Button
                onClick={() => this.setState({ openPopupAddInstrument: true })}
                disabled={false}
                variant="contained"
                color="primary"
                style={{
                  marginBottom: "30px",
                }}
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
              elevation={3}
            >
              <Grid
                item
                container
                direction="row"
                style={{ textAlign: "center" }}
              >
                <Grid item xs={4} md={4} lg={2}>
                  <p>Type d'instrument</p>
                </Grid>
                <Grid item xs={4} md={4} lg={2}>
                  <p>Marque</p>
                </Grid>

                <Grid item xs={4} md={4} lg={2}>
                  <p>Modèle</p>
                </Grid>
                <Grid item xs={4} md={4} lg={2}>
                  <p>N° de série</p>
                </Grid>
                <Grid item xs={4} md={4} lg={2}>
                  <p>Formation associée</p>
                </Grid>

                <Hidden lgUp>
                  <Grid item xs={4} md={4}></Grid>
                </Hidden>
                <Hidden lgUp>
                  <Grid item xs={4} md={3} style={{ height: "40px" }}></Grid>
                </Hidden>
              </Grid>
            </Paper>

            {this.state.instruments.map((instrument) => {
              return (
                <Instrument
                  key={instrument.id}
                  id={instrument.id}
                  type={instrument.type.type}
                  marque={instrument.marque}
                  model={instrument.model}
                  serialNumber={instrument.serialNumber}
                  formation={instrument.musicalFormation}
                  parentCallback={(instrumentId) =>
                    this.deleteInstrument(instrumentId)
                  }
                ></Instrument>
              );
            })}
          </div>
        )}

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
            disabled={false}
            onClick={() => this.props.functionCallback()}
            variant="contained"
            sx={{
              ml: 2,
              backgroundColor: "#1D70B7"
            }}
          >
            Suivant
          </Button>
        </div>

        <Popup
          title="Ajouter un instrument de musique"
          length="md"
          openPopup={this.state.openPopupAddInstrument}
          parentCallback={() =>
            this.setState({ openPopupAddInstrument: false })
          }
        >
          <AddInstrument
            parentCallback={(idInstrument) => this.addInstrument(idInstrument)}
          ></AddInstrument>
        </Popup>
      </div>
    );
  }
}

export default InstrumentsForm;
