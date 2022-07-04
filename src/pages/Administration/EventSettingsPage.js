import React from "react";
import { getEventTypes } from "../../GraphQL/queries/EventTypeQueries";
import { IconButton, Collapse, Grid } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { isAdmin } from "../../Helpers/RightsGestion";
import { getMyRights } from "../../GraphQL/queries/UserQueries";
import { GreenButton } from "../../components/General/StyledComponents/StyledButtons";
import ActionButtons from "../../components/General/Buttons/ActionButtons";
import Popup from "../../components/General/Popups/Popup";
import ConfirmPopup from "../../components/General/Popups/ConfirmPopup";
import { addEventType, addMusicalFormation, addTransportType, deleteEventType, deleteMusicalFormation, deleteTransportType, modifyEventType, modifyMusicalFormation, modifyTransportType } from "../../GraphQL/mutations/EventMutations";
import BriefedTextField from "../../components/General/TextFields/BriefedTextField";
import CustomizedSnackbars from "../../components/General/Popups/CustomizedSnackbar";
import { getMusicalFormations, getTransportTypes } from "../../GraphQL/queries/EventQueries";

class EventSettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rights: [],
            eventTypes: [],
            newEventTypeValue: "",
            notifErrorEventTypeOpen: false,
            selectedEventType: null,
            musicalFormations: [],
            newMusicalFormationValue: "",
            notifErrorMusicalFormationOpen: false,
            notifErrorMusicalFormationDeleteOpen: false,
            selectedMusicalFormation: null,
            transportTypes: [],
            newTransportTypeValue: "",
            notifErrorTransportTypeOpen: false,
            selectedTransportType: null,
            openEvents: false,
            openPopupAddEventType: false,
            openPopupEditEventType: false,
            openPopupDeleteEventType: false,
            openMusicalFormations: false,
            openPopupAddMusicalFormation: false,
            openPopupEditMusicalFormation: false,
            openPopupDeleteMusicalFormation: false,
            openTransportTypes: false,
            openPopupAddTransportType: false,
            openPopupEditTransportType: false,
            openPopupDeleteTransportType: false,
            isLoading: true
        }
    }

    componentDidMount = () => {
        getEventTypes().then((res) => {
            getMyRights().then((res2) => {
                getMusicalFormations().then((res3) => {
                    getTransportTypes().then((res4) => {
                        this.setState({ eventTypes: res.eventTypes, rights: res2.myRights, musicalFormations: res3.musicalFormations, transportTypes: res4.transportTypes }, () => {
                            this.setState({ isLoading: false });
                        })
                    })
                });
            })
        });
    }

    addEventType = () => {
        addEventType(this.state.newEventTypeValue).then((res) => {
            if (res.addEventType.statusCode == 200) {
                const newEventType = {
                    id: res.addEventType.id,
                    value: this.state.newEventTypeValue
                }
                this.setState({
                    eventTypes: [...this.state.eventTypes, newEventType],
                    openPopupAddEventType: false,
                    newEventTypeValue: ""
                })
            } else {
                this.setState({ notifErrorEventTypeOpen: true });
            }
        })
    }

    addMusicalFormation = () => {
        addMusicalFormation(this.state.newMusicalFormationValue).then((res) => {
            if (res.addMusicalFormation.statusCode == 200) {
                const newMusicalFormation = {
                    id: res.addMusicalFormation.id,
                    value: this.state.newMusicalFormationValue
                }
                this.setState({
                    musicalFormations: [...this.state.musicalFormations, newMusicalFormation],
                    openPopupAddMusicalFormation: false,
                    newMusicalFormationValue: ""
                })
            } else {
                this.setState({ notifErrorMusicalFormationOpen: true });
            }
        });
    }

    addTransportType = () => {
        addTransportType(this.state.newTransportTypeValue).then((res) => {
            if (res.addTransportType.statusCode == 200) {
                const newTransportType = {
                    id: res.addTransportType.id,
                    type: this.state.newTransportTypeValue
                }
                this.setState({
                    transportTypes: [...this.state.transportTypes, newTransportType],
                    openPopupAddTransportType: false,
                    newTransportTypeValue: ""
                })
            } else {
                this.setState({ notifErrorTransportTypeOpen: true });
            }
        })
    }

    modifyEventType = () => {
        modifyEventType(this.state.selectedEventType.id, this.state.newEventTypeValue).then((res) => {
            if (res.modifyEventType.statusCode == 200) {
                var currentEventTypes = this.state.eventTypes;
                currentEventTypes.map((currentEventType) => {
                    if (currentEventType.id == this.state.selectedEventType.id) {
                        currentEventType.value = this.state.newEventTypeValue;
                    }
                });
                this.setState({ selectedEventType: -1, newEventTypeValue: "", eventTypes: currentEventTypes, openPopupEditEventType: false });
            } else {
                this.setState({ notifErrorEventTypeOpen: true });
            }
        });
    }

    modifyMusicalFormation = () => {
        modifyMusicalFormation(this.state.selectedMusicalFormation.id, this.state.newMusicalFormationValue).then((res) => {
            if (res.modifyMusicalFormation.statusCode == 200) {
                var currentMusicalFormations = this.state.musicalFormations;
                currentMusicalFormations.map((currentMusicalFormation) => {
                    if (currentMusicalFormation.id == this.state.selectedMusicalFormation.id) {
                        currentMusicalFormation.value = this.state.newMusicalFormationValue;
                    }
                });
                this.setState({ selectedMusicalFormation: -1, newMusicalFormationValue: "", musicalFormations: currentMusicalFormations, openPopupEditMusicalFormation: false });
            } else {
                this.setState({ notifErrorMusicalFormationOpen: true });
            }
        });
    }

    modifyTransportType = () => {
        modifyTransportType(this.state.selectedTransportType.id, this.state.newTransportTypeValue).then((res) => {
            if (res.modifyTransportType.statusCode == 200) {
                var currentTransportTypes = this.state.transportTypes;
                currentTransportTypes.map((currentTransportType) => {
                    if (currentTransportType.id == this.state.selectedTransportType.id) {
                        currentTransportType.type = this.state.newTransportTypeValue;
                    }
                });
                this.setState({ selectedTransportType: -1, newTransportTypeValue: "", transportTypes: currentTransportTypes, openPopupEditTransportType: false });
            } else {
                this.setState({ notifErrorTransportTypeOpen: true });
            }
        });
    }

    deleteEventType = (eventTypeId) => {
        deleteEventType(eventTypeId).then((res) => {
            if (res.deleteEventType.statusCode == 200) {
                this.setState({
                    eventTypes: this.state.eventTypes.filter(function (
                        eventType
                    ) {
                        return eventType.id !== eventTypeId;
                    }),
                    openPopupDeleteEventType: false
                });
            }
        });
    }

    deleteMusicalFormation = (musicalFormationId) => {
        deleteMusicalFormation(musicalFormationId).then((res) => {
            if (res.deleteMusicalFormation.statusCode == 200) {
                this.setState({
                    musicalFormations: this.state.musicalFormations.filter(function (
                        musicalFormation
                    ) {
                        return musicalFormation.id !== musicalFormationId;
                    }),
                    openPopupDeleteMusicalFormation: false
                })
            } else {
                this.setState({ notifErrorMusicalFormationDeleteOpen: true });
            }
        })
    }

    deleteTransportType = (transportTypeId) => {
        deleteTransportType(transportTypeId).then((res) => {
            if (res.deleteTransportType.statusCode == 200) {
                this.setState({
                    transportTypes: this.state.transportTypes.filter(function (
                        transportType
                    ) {
                        return transportType.id !== transportTypeId;
                    }),
                    openPopupDeleteTransportType: false
                });
            }
        });
    }

    updateField(field, input, errorState) {
        this.setState(
            {
                [field]: input
            }
        );
    }

    resetNotifOpen = () => {
        this.setState({ notifErrorEventTypeOpen: false, notifErrorMusicalFormationOpen: false, notifErrorMusicalFormationDeleteOpen: false, notifErrorTransportTypeOpen: false });
    }

    sortValues = (x, y) => {
        if (x.value < y.value)
            return -1;
        else if (x.value > y.value)
            return 1;
        return 0;
    }

    sortTypes = (x, y) => {
        if (x.type < y.type)
            return -1;
        else if (x.type > y.type)
            return 1;
        return 0;
    }

    render() {
        return (
            !this.state.isLoading ? (
                isAdmin(this.state.rights) ? (
                    <div className="body">
                        <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                            <div style={{ display: "flex", flexWrap: "nowrap" }}>
                                <h2 style={{ paddingLeft: "20px", display: "inline" }}>Paramètres des évènements</h2>
                            </div>

                            {/* TYPES D'EVENEMENTS */}
                            <div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                                <div style={{ display: "flex" }}>
                                    <p style={{ marginLeft: "20px" }}>Types d'évènements</p>
                                    <div style={{ margin: "auto 10px auto auto" }}>
                                        <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={() => this.setState({ openEvents: !this.state.openEvents })}
                                        >
                                            {this.state.openEvents ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                    </div>
                                </div>
                                <Collapse in={this.state.openEvents} timeout="auto" unmountOnExit>
                                    <div style={{ marginBottom: "20px", marginLeft: "20px" }}>
                                        {
                                            this.state.eventTypes.sort(this.sortValues).map((eventType) => {
                                                return (
                                                    <Grid container key={eventType.id}>
                                                        <Grid item lg={2} md={3} xs={4}>
                                                            <p style={{ margin: "15px" }}>{eventType.value}</p>
                                                        </Grid>
                                                        <Grid item lg={3} md={3} xs={8} style={{ display: "flex", alignItems: "center" }}>
                                                            <ActionButtons
                                                                functionEdit={() => this.setState({ selectedEventType: eventType, newEventTypeValue: eventType.value, openPopupEditEventType: true })}
                                                                functionDelete={() => this.setState({ selectedEventType: eventType, openPopupDeleteEventType: true })} />
                                                        </Grid>
                                                    </Grid>
                                                )
                                            })
                                        }
                                        <GreenButton style={{ marginLeft: "120px", marginTop: "20px" }} onClick={() => this.setState({ newEventTypeValue: "", openPopupAddEventType: true })}>Ajouter</GreenButton>
                                    </div>
                                </Collapse>
                            </div>

                            {/* FORMATIONS MUSICALES */}
                            <div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                                <div style={{ display: "flex" }}>
                                    <p style={{ marginLeft: "20px" }}>Formations musicales</p>
                                    <div style={{ margin: "auto 10px auto auto" }}>
                                        <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={() => this.setState({ openMusicalFormations: !this.state.openMusicalFormations })}
                                        >
                                            {this.state.openMusicalFormations ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                    </div>
                                </div>
                                <Collapse in={this.state.openMusicalFormations} timeout="auto" unmountOnExit>
                                    <div style={{ marginBottom: "20px", marginLeft: "20px" }}>
                                        {
                                            this.state.musicalFormations.sort(this.sortValues).map((musicalFormation) => {
                                                return (
                                                    <Grid container key={musicalFormation.id}>
                                                        <Grid item lg={2} md={3} xs={4}>
                                                            <p style={{ margin: "15px" }}>{musicalFormation.value}</p>
                                                        </Grid>
                                                        <Grid item lg={3} md={3} xs={8} style={{ display: "flex", alignItems: "center" }}>
                                                            <ActionButtons
                                                                functionEdit={() => this.setState({ selectedMusicalFormation: musicalFormation, newMusicalFormationValue: musicalFormation.value, openPopupEditMusicalFormation: true })}
                                                                functionDelete={() => this.setState({ selectedMusicalFormation: musicalFormation, openPopupDeleteMusicalFormation: true })} />
                                                        </Grid>
                                                    </Grid>
                                                )
                                            })
                                        }
                                        <GreenButton style={{ marginLeft: "120px", marginTop: "20px" }} onClick={() => this.setState({ newMusicalFormationValue: "", openPopupAddMusicalFormation: true })}>Ajouter</GreenButton>
                                    </div>
                                </Collapse>
                            </div>

                            {/* TRANSPORTS TYPES */}
                            <div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                                <div style={{ display: "flex" }}>
                                    <p style={{ marginLeft: "20px" }}>Moyens de transport</p>
                                    <div style={{ margin: "auto 10px auto auto" }}>
                                        <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={() => this.setState({ openTransportTypes: !this.state.openTransportTypes })}
                                        >
                                            {this.state.openTransportTypes ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                    </div>
                                </div>
                                <Collapse in={this.state.openTransportTypes} timeout="auto" unmountOnExit>
                                    <div style={{ marginBottom: "20px", marginLeft: "20px" }}>
                                        {
                                            this.state.transportTypes.sort(this.sortTypes).map((transportType) => {
                                                return (
                                                    <Grid container key={transportType.id}>
                                                        <Grid item lg={2} md={3} xs={4}>
                                                            <p style={{ margin: "15px" }}>{transportType.type}</p>
                                                        </Grid>
                                                        <Grid item lg={3} md={3} xs={8} style={{ display: "flex", alignItems: "center" }}>
                                                            <ActionButtons
                                                                functionEdit={() => this.setState({ selectedTransportType: transportType, newTransportTypeValue: transportType.type, openPopupEditTransportType: true })}
                                                                functionDelete={() => this.setState({ selectedTransportType: transportType, openPopupDeleteTransportType: true })} />
                                                        </Grid>
                                                    </Grid>
                                                )
                                            })
                                        }
                                        <GreenButton style={{ marginLeft: "120px", marginTop: "20px" }} onClick={() => this.setState({ newTransportTypeValue: "", openPopupAddTransportType: true })}>Ajouter</GreenButton>
                                    </div>
                                </Collapse>
                            </div>
                        </div>

                        {/* POPUPS EVENT TYPES */}
                        <Popup
                            title="Ajouter un type d'évènements"
                            length="md"
                            openPopup={this.state.openPopupAddEventType}
                            parentCallback={() =>
                                this.setState({ openPopupAddEventType: false })
                            }
                        >
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", paddingTop: "20px" }}>
                                <BriefedTextField
                                    id={"event-type-field"}
                                    required={true}
                                    label="Type d'évènement"
                                    type="text"
                                    name="text"
                                    value={this.state.newEventTypeValue}
                                    saveField={(input, errorState) =>
                                        this.updateField("newEventTypeValue", input, errorState)
                                    }
                                />
                                <GreenButton style={{ marginTop: "20px", width: "100px" }} disabled={this.state.newEventTypeValue === ""} onClick={() => this.addEventType()}>Ajouter</GreenButton>
                            </div>
                        </Popup>

                        <Popup
                            title="Modifier un type d'évènements"
                            length="md"
                            openPopup={this.state.openPopupEditEventType}
                            parentCallback={() =>
                                this.setState({ openPopupEditEventType: false })
                            }
                        >
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", paddingTop: "20px" }}>
                                <BriefedTextField
                                    id={"event-type-field"}
                                    required={true}
                                    label="Type d'évènement"
                                    type="text"
                                    name="text"
                                    value={this.state.newEventTypeValue}
                                    saveField={(input, errorState) =>
                                        this.updateField("newEventTypeValue", input, errorState)
                                    }
                                />
                                <GreenButton style={{ marginTop: "20px", width: "100px" }} disabled={this.state.newEventTypeValue === ""} onClick={() => this.modifyEventType()}>Modifier</GreenButton>
                            </div>
                        </Popup>

                        <ConfirmPopup
                            title={"Supprimer un type d'évènements"}
                            text={"Voulez vous vraiment supprimer le type d'évènements \"" + this.state.selectedEventType?.value + "\" ? "}
                            openPopup={this.state.openPopupDeleteEventType}
                            parentCallback={() => this.setState({ openPopupDeleteEventType: false })}
                            confirmButtonId="confirm-delete-event-type"
                            confirmButtonFunction={() => this.deleteEventType(this.state.selectedEventType?.id)}
                            cancelButtonFunction={() => this.setState({ openPopupDeleteEventType: false })}
                            buttonDisabled={false}
                        />
                        {
                            this.state.notifErrorEventTypeOpen ? (
                                <CustomizedSnackbars
                                    open={true}
                                    timer={5000}
                                    message={"Impossible d'ajouter ou modifier le type d'évènement, vérifiez que le nom saisi ne soit pas déjà utilisé."}
                                    severity={"error"}
                                    functionCallback={() => this.resetNotifOpen()}
                                />
                            ) : ""
                        }

                        {/* POPUPS MUSICAL FORMATIONS */}
                        <Popup
                            title="Ajouter une formation musicale"
                            length="md"
                            openPopup={this.state.openPopupAddMusicalFormation}
                            parentCallback={() =>
                                this.setState({ openPopupAddMusicalFormation: false })
                            }
                        >
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", paddingTop: "20px" }}>
                                <BriefedTextField
                                    id={"event-type-field"}
                                    required={true}
                                    label="Formation musicale"
                                    type="text"
                                    name="text"
                                    value={this.state.newMusicalFormationValue}
                                    saveField={(input, errorState) =>
                                        this.updateField("newMusicalFormationValue", input, errorState)
                                    }
                                />
                                <GreenButton style={{ marginTop: "20px", width: "100px" }} disabled={this.state.newMusicalFormationValue === ""} onClick={() => this.addMusicalFormation()}>Ajouter</GreenButton>
                            </div>
                        </Popup>
                        <Popup
                            title="Modifier une formation musicale"
                            length="md"
                            openPopup={this.state.openPopupEditMusicalFormation}
                            parentCallback={() =>
                                this.setState({ openPopupEditMusicalFormation: false })
                            }
                        >
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", paddingTop: "20px" }}>
                                <BriefedTextField
                                    id={"musical-formation-field"}
                                    required={true}
                                    label="Formation musicale"
                                    type="text"
                                    name="text"
                                    value={this.state.newMusicalFormationValue}
                                    saveField={(input, errorState) =>
                                        this.updateField("newMusicalFormationValue", input, errorState)
                                    }
                                />
                                <GreenButton style={{ marginTop: "20px", width: "100px" }} disabled={this.state.newMusicalFormationValue === ""} onClick={() => this.modifyMusicalFormation()}>Modifier</GreenButton>
                            </div>
                        </Popup>
                        <ConfirmPopup
                            title={"Supprimer une formation musicale"}
                            text={"Voulez vous vraiment supprimer la formation musicale \"" + this.state.selectedMusicalFormation?.value + "\" ? "}
                            openPopup={this.state.openPopupDeleteMusicalFormation}
                            parentCallback={() => this.setState({ openPopupDeleteMusicalFormation: false })}
                            confirmButtonId="confirm-delete-musical-formation"
                            confirmButtonFunction={() => this.deleteMusicalFormation(this.state.selectedMusicalFormation?.id)}
                            cancelButtonFunction={() => this.setState({ openPopupDeleteMusicalFormation: false })}
                            buttonDisabled={false}
                        />
                        {
                            this.state.notifErrorMusicalFormationOpen ? (
                                <CustomizedSnackbars
                                    open={true}
                                    timer={5000}
                                    message={"Impossible d'ajouter ou modifier la formation musicale, vérifiez que le nom saisi ne soit pas déjà utilisé."}
                                    severity={"error"}
                                    functionCallback={() => this.resetNotifOpen()}
                                />
                            ) : ""
                        }
                        {
                            this.state.notifErrorMusicalFormationDeleteOpen ? (
                                <CustomizedSnackbars
                                    open={true}
                                    timer={5000}
                                    message={"Impossible de supprimer une formation musicale associée à un évènement existant."}
                                    severity={"error"}
                                    functionCallback={() => this.resetNotifOpen()}
                                />
                            ) : ""
                        }

                        {/* POPUPS TRANSPORT TYPES */}
                        <Popup
                            title="Ajouter un moyen de transport"
                            length="md"
                            openPopup={this.state.openPopupAddTransportType}
                            parentCallback={() =>
                                this.setState({ openPopupAddTransportType: false })
                            }
                        >
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", paddingTop: "20px" }}>
                                <BriefedTextField
                                    id={"transport-type-field"}
                                    required={true}
                                    label="Moyen de transport"
                                    type="text"
                                    name="text"
                                    value={this.state.newTransportTypeValue}
                                    saveField={(input, errorState) =>
                                        this.updateField("newTransportTypeValue", input, errorState)
                                    }
                                />
                                <GreenButton style={{ marginTop: "20px", width: "100px" }} disabled={this.state.newTransportTypeValue === ""} onClick={() => this.addTransportType()}>Ajouter</GreenButton>
                            </div>
                        </Popup>

                        <Popup
                            title="Modifier un moyen de transport"
                            length="md"
                            openPopup={this.state.openPopupEditTransportType}
                            parentCallback={() =>
                                this.setState({ openPopupEditTransportType: false })
                            }
                        >
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", paddingTop: "20px" }}>
                                <BriefedTextField
                                    id={"transport-type-field"}
                                    required={true}
                                    label="Moyen de transport"
                                    type="text"
                                    name="text"
                                    value={this.state.newTransportTypeValue}
                                    saveField={(input, errorState) =>
                                        this.updateField("newTransportTypeValue", input, errorState)
                                    }
                                />
                                <GreenButton style={{ marginTop: "20px", width: "100px" }} disabled={this.state.newTransportTypeValue === ""} onClick={() => this.modifyTransportType()}>Modifier</GreenButton>
                            </div>
                        </Popup>

                        <ConfirmPopup
                            title={"Supprimer un moyen de transport"}
                            text={"Voulez vous vraiment supprimer le moyen de transport \"" + this.state.selectedTransportType?.type + "\" ? "}
                            openPopup={this.state.openPopupDeleteTransportType}
                            parentCallback={() => this.setState({ openPopupDeleteTransportType: false })}
                            confirmButtonId="confirm-delete-event-type"
                            confirmButtonFunction={() => this.deleteTransportType(this.state.selectedTransportType?.id)}
                            cancelButtonFunction={() => this.setState({ openPopupDeleteTransportType: false })}
                            buttonDisabled={false}
                        />
                        {
                            this.state.notifErrorTransportTypeOpen ? (
                                <CustomizedSnackbars
                                    open={true}
                                    timer={5000}
                                    message={"Impossible d'ajouter ou modifier le moyen de transport, vérifiez que le nom saisi ne soit pas déjà utilisé."}
                                    severity={"error"}
                                    functionCallback={() => this.resetNotifOpen()}
                                />
                            ) : ""
                        }
                    </div>
                ) : ""
            ) : ""
        )
    }
};

export default EventSettingsPage;
