import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import Popup from "../../General/Popups/Popup";
import { IconButton, Collapse, Grid, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getInstrumentsByUser } from "../../../GraphQL/queries/InstrumentQueries";
import { GreenButton } from "../../General/StyledComponents/StyledButtons";
import { InstrumentsArray } from "./InstrumentsArray";
import InstrumentForm from "../forms/InstrumentForm";
import { removeInstrument } from "../../../GraphQL/mutations/InstrumentsMutations";
import ConfirmPopup from "../../General/Popups/ConfirmPopup";
import { getMusicalFormations } from "../../../GraphQL/queries/EventQueries";

class InstrumentsTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentInstrument: null,
            openPopupEdit: false,
            openPopupAdd: false,
            openPopupModify: false,
            openPopupDeleteConfirm: false,
            open: false,
            loading: true,
            instruments: [], 
            musicalFormations: []
        }
    }

    componentDidMount() {
        getInstrumentsByUser().then((res) => {
            getMusicalFormations().then((res2) => {
                this.setState({ musicalFormations: res2.musicalFormations, instruments: res.instrumentsByUser }, () => {
                    this.setState({ loading: false });
                })
            })
        })
    }

    handleEditClick() {
        this.setState({ openPopupEdit: true }, () => {
            this.props.functionCallback(true);
        });
    }

    addInstrument = (instrument) => {
        this.setState({
            openPopupAdd: false,
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
            !this.state.loading ?
                (<div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                    <div style={{ display: "flex" }}>
                        <p style={{ marginLeft: "20px" }}>Instrument(s) de musique</p>
                        <div style={{ margin: "auto 10px auto auto" }}>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => this.setState({ open: !this.state.open })}
                            >
                                {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                            <GreenButton onClick={() => this.handleEditClick()}><EditIcon /></GreenButton>
                        </div>
                    </div>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <InstrumentsArray
                            editable={false}
                            instruments={this.state.instruments}
                        />
                    </Collapse>

                    <Popup
                        title="Instrument(s) de musique"
                        length="lg"
                        openPopup={this.state.openPopupEdit}
                        parentCallback={() =>
                            this.setState({ openPopupEdit: false }, () => {
                                this.props.functionCallback(false);
                            })
                        }
                    >
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Grid container>
                                <Grid item xs={12} style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                                    <Button variant='contained' onClick={() => this.setState({ openPopupAdd: true })}>Ajouter</Button>
                                </Grid>
                                <Grid item xs={12}>
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
                                </Grid>
                            </Grid>
                        </div>
                    </Popup>

                    <Popup
                        title="Ajouter un instrument de musique"
                        length="md"
                        openPopup={this.state.openPopupAdd}
                        parentCallback={() =>
                            this.setState({ openPopupAdd: false }, () => {
                                this.props.functionCallback(false);
                            })
                        }
                    >
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <InstrumentForm
                                musicalFormations={this.state.musicalFormations}
                                parentCallback={(instrument) =>
                                    this.addInstrument(instrument)
                                }></InstrumentForm>
                        </div>
                    </Popup >

                    <Popup
                        title="Modifier un instrument de musique"
                        length="md"
                        openPopup={this.state.openPopupModify}
                        parentCallback={() =>
                            this.setState({ openPopupModify: false }, () => {
                                this.props.functionCallback(false);
                            })
                        }
                    >
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <InstrumentForm
                                isEditable={true}
                                instrument={this.state.currentInstrument}
                                musicalFormations={this.state.musicalFormations}
                                parentCallback={(instrument) =>
                                    this.modifyInstrument(instrument)
                                }></InstrumentForm>
                        </div>
                    </Popup>

                    <ConfirmPopup
                        title={"Supprimer un instrument de musique"}
                        text={"Voulez vous vraiment supprimer le " + this.state.currentInstrument?.type.type +" de marque " + this.state.currentInstrument?.marque + " et de modèle " + this.state.currentInstrument?.model + " dont le numéro de série est : " + this.state.currentInstrument?.serialNumber + " de vos instruments de musique ? "}
                        openPopup={this.state.openPopupDeleteConfirm}
                        parentCallback={() => this.setState({ openPopupDeleteConfirm: false })}
                        confirmButtonId="confirm-delete-instrument"
                        confirmButtonFunction={() => this.deleteInstrument(this.state.currentInstrument?.id)}
                        cancelButtonFunction={() => this.setState({ openPopupDeleteConfirm: false })}
                        buttonDisabled={false}
                    />
                </div>) : ""
        );
    }
}

export default InstrumentsTab;