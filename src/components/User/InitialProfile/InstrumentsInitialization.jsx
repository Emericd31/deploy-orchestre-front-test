import React from "react";
import Button from "@mui/material/Button";
import Popup from "../../General/Popups/Popup";
import { getInstrumentsByUser } from "../../../GraphQL/queries/InstrumentQueries";
import { InstrumentsArray } from "../Account/InstrumentsArray";
import InstrumentForm from "../forms/InstrumentForm";
import ConfirmPopup from "../../General/Popups/ConfirmPopup";
import { removeInstrument } from "../../../GraphQL/mutations/InstrumentsMutations";

class InstrumentsInitialization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentInstrument: null,
      openPopupAddInstrument: false,
      openPopupModify: false,
      openPopupDeleteConfirm: false,
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

  modifyInstrument = (instrument) => {
    var currentInstruments = this.state.instruments;
    currentInstruments.map((currentInstrument) => {
      if (currentInstrument.id == instrument.id) {
        currentInstrument.marque = instrument.marque;
        currentInstrument.model = instrument.model;
        currentInstrument.musicalFormation = instrument.musicalFormation;
        currentInstrument.serialNumber = instrument.serialNumber;
        currentInstrument.type = instrument.type;
      }
    });
    this.setState({ instruments: currentInstruments, openPopupModify: false });
  }

  deleteInstrument = (idInstrument) => {
    removeInstrument(idInstrument).then((res) => {
      if (res.removeInstrument.statusCode === 200) {
        this.setState({
          instruments: this.state.instruments.filter(function (
            instrument
          ) {
            return instrument.id !== idInstrument;
          }),
          openPopupDeleteConfirm: false
        });
      }
    });
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
            marginTop: "1%",
            paddingBottom: "1%",
          }}
        >
          <h1>Mes instruments de musique : </h1>
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

        <InstrumentsArray
          functionEdit={(instrument) =>
            this.setState({ currentInstrument: instrument, openPopupModify: true })
          }
          functionDelete={(instrument) =>
            this.setState({ currentInstrument: instrument, openPopupDeleteConfirm: true })
          }
          editable={true}
          instruments={this.state.instruments}
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
            this.setState({ openPopupAddInstrument: false }, () => {
              this.props.functionCallback(false);
            })
          }
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <InstrumentForm
              parentCallback={(instrument) =>
                this.addInstrument(instrument)
              }></InstrumentForm>
          </div>
        </Popup>

        <Popup
          title="Modifier un instrument de musique"
          length="md"
          openPopup={this.state.openPopupModify}
          parentCallback={() =>
            this.setState({ openPopupModify: false })
          }
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <InstrumentForm
              isEditable={true}
              instrument={this.state.currentInstrument}
              parentCallback={(instrument) =>
                this.modifyInstrument(instrument)
              }></InstrumentForm>
          </div>
        </Popup>

        <ConfirmPopup
          title={"Supprimer un instrument de musique"}
          text={"Voulez vous vraiment supprimer le " + this.state.currentInstrument?.type.type + " de marque " + this.state.currentInstrument?.marque + " et de modèle " + this.state.currentInstrument?.model + " dont le numéro de série est : " + this.state.currentInstrument?.serialNumber + " de vos instruments de musique ? "}
          openPopup={this.state.openPopupDeleteConfirm}
          parentCallback={() => this.setState({ openPopupDeleteConfirm: false })}
          confirmButtonId="confirm-delete-instrument"
          confirmButtonFunction={() => this.deleteInstrument(this.state.currentInstrument?.id)}
          cancelButtonFunction={() => this.setState({ openPopupDeleteConfirm: false })}
          buttonDisabled={false}
        />
      </div>
    );
  }
}

export default InstrumentsInitialization;
