import React from "react";
import { Paper, Alert, createTheme, Button } from "@mui/material";
import CustomizedStepper from "../../components/User/CustomizedStepper";
import ClientContactForm from "../../components/Event/forms/ClientContactForm";
import GeneralDataForm from "../../components/Event/forms/GeneralDataForm";
import LogisticProgramForm from "../../components/Event/forms/LogicsticProgramForm";
import DiffusionForm from "../../components/Event/forms/DiffusionForm";
import { addEvent } from "../../GraphQL/mutations/EventMutations";
import Popup from "../../components/General/Popups/Popup";
import { Link as LinkRouter } from "react-router-dom";
import "../../App.css"

const backgroundGradient =
    "linear-gradient( 135deg, #11bbdd 0%, #1976d2 50%, #050055 100%)";

class AddEventPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openPopupAddEventFail: false,
            openPopupAddEventSuccess: false,
            event: {
                intitule: "",
                musicalFormation: "",
                eventType: "",
                eventStartDate: new Date(),
                eventEndDate: new Date(),
                eventAddress: "",
                eventAddressComplement: "",
                eventPostalCode: "",
                eventCity: "",
                eventPhoneNumber: "",
                eventMobileNumber: "",
                eventEmail: "",
                clientLastname: "",
                clientFirstname: "",
                clientPhoneNumber: "",
                clientMobileNumber: "",
                clientEmail: "",
                clientFunction: "",
                clientAddress: "",
                clientPostalCode: "",
                clientCity: "",
                programAddress: "",
                programPostalCode: "",
                programCity: "",
                programTransportMode: "",
                programTenueVestimentaire: "",
                programMusicalProgram: "",
                programRendezvousDate: new Date(),
                diffusionIllustration: "",
                diffusionPublicDescription: "",
                diffusionInformations: "",
                diffusionActiveMembers: false,
                diffusionPublic: false,
                diffusionAdministration: false,
                diffusionEndInscriptionDate: new Date()
            },
            components: [],
            currentComponentId: 0,
            steps: [],
            componentComplete: [false, false, false, false],
        };
    }

    initializeFields(fieldNames) {
        let fields = {};
        fieldNames.forEach((field) => {
            fields = {
                ...fields,
                [field]: this.state[field].value,
            };
        });
        return fields;
    }

    saveGeneralData(newEvent) {
        let checkChanges = newEvent.eventStartDate !== this.state.event.eventStartDate
            || newEvent.eventEndDate !== this.state.event.eventEndDate
            || newEvent.intitule !== this.state.event.intitule
            || newEvent.eventAddress !== this.state.event.eventAddress
            || newEvent.eventAddressComplement !== this.state.event.eventAddressComplement
            || newEvent.eventPostalCode !== this.state.event.eventPostalCode
            || newEvent.eventCity !== this.state.event.eventCity
            || newEvent.eventPhoneNumber !== this.state.event.eventPhoneNumber
            || newEvent.eventMobileNumber !== this.state.event.eventMobileNumber
            || newEvent.eventEmail !== this.state.event.eventEmail
            || newEvent.musicalFormation !== this.state.event.musicalFormation
            || newEvent.eventType !== this.state.event.eventType;

        if (checkChanges) {
            this.setState(prevState => ({
                event: {
                    ...prevState.event,
                    eventStartDate: newEvent.eventStartDate,
                    eventEndDate: newEvent.eventEndDate,
                    intitule: newEvent.intitule,
                    eventAddress: newEvent.eventAddress,
                    eventAddressComplement: newEvent.eventAddressComplement,
                    eventPostalCode: newEvent.eventPostalCode,
                    eventCity: newEvent.eventCity,
                    eventPhoneNumber: newEvent.eventPhoneNumber,
                    eventMobileNumber: newEvent.eventMobileNumber,
                    eventEmail: newEvent.eventEmail,
                    musicalFormation: newEvent.musicalFormation,
                    eventType: newEvent.eventType
                },
                currentComponentId: this.state.currentComponentId + 1
            }), () => {
                this.initializeComponents();
            });
        } else {
            this.setState({
                currentComponentId: this.state.currentComponentId + 1
            })
        }
    }

    saveClientData(newEvent, plusOrMinus) {
        let checkChanges = newEvent.clientLastname !== this.state.event.clientLastname
            || newEvent.clientFirstname !== this.state.event.clientFirstname
            || newEvent.clientPhoneNumber !== this.state.event.clientPhoneNumber
            || newEvent.clientMobileNumber !== this.state.event.clientMobileNumber
            || newEvent.clientEmail !== this.state.event.clientEmail
            || newEvent.clientFunction !== this.state.event.clientFunction
            || newEvent.clientAddress !== this.state.event.clientAddress
            || newEvent.clientPostalCode !== this.state.event.clientPostalCode
            || newEvent.clientCity !== this.state.event.clientCity;

        if (checkChanges) {
            this.setState(prevState => ({
                event: {
                    ...prevState.event,
                    clientLastname: newEvent.clientLastname,
                    clientFirstname: newEvent.clientFirstname,
                    clientPhoneNumber: newEvent.clientPhoneNumber,
                    clientMobileNumber: newEvent.clientMobileNumber,
                    clientEmail: newEvent.clientEmail,
                    clientFunction: newEvent.clientFunction,
                    clientAddress: newEvent.clientAddress,
                    clientPostalCode: newEvent.clientPostalCode,
                    clientCity: newEvent.clientCity
                },
                currentComponentId: this.state.currentComponentId + plusOrMinus
            }), () => {
                this.initializeComponents();
            });
        } else {
            this.setState({
                currentComponentId: this.state.currentComponentId + plusOrMinus
            })
        }
    }

    saveProgramData(newEvent, plusOrMinus) {
        let checkChanges = newEvent.programAddress !== this.state.event.programAddress
            || newEvent.programPostalCode !== this.state.event.programPostalCode
            || newEvent.programCity !== this.state.event.programCity
            || newEvent.programTransportMode !== this.state.event.programTransportMode
            || newEvent.programTenueVestimentaire !== this.state.event.programTenueVestimentaire
            || newEvent.programMusicalProgram !== this.state.event.programMusicalProgram
            || newEvent.programRendezvousDate !== this.state.event.programRendezvousDate;

        if (checkChanges) {
            this.setState(prevState => ({
                event: {
                    ...prevState.event,
                    programAddress: newEvent.programAddress,
                    programPostalCode: newEvent.programPostalCode,
                    programCity: newEvent.programCity,
                    programTransportMode: newEvent.programTransportMode,
                    programTenueVestimentaire: newEvent.programTenueVestimentaire,
                    programMusicalProgram: newEvent.programMusicalProgram,
                    programRendezvousDate: newEvent.programRendezvousDate
                },
                currentComponentId: this.state.currentComponentId + plusOrMinus
            }), () => {
                this.initializeComponents();
            });
        } else {
            this.setState({
                currentComponentId: this.state.currentComponentId + plusOrMinus
            })
        }
    }

    saveDiffusionData(newEvent, plusOrMinus) {
        let checkChanges = newEvent.diffusionIllustration !== this.state.event.diffusionIllustration
            || newEvent.diffusionPublicDescription !== this.state.event.diffusionPublicDescription
            || newEvent.diffusionInformations !== this.state.event.diffusionInformations
            || newEvent.diffusionActiveMembers !== this.state.event.diffusionActiveMembers
            || newEvent.diffusionPublic !== this.state.event.diffusionPublic
            || newEvent.diffusionAdministration !== this.state.event.diffusionAdministration
            || newEvent.diffusionEndInscriptionDate !== this.state.event.diffusionEndInscriptionDate

        if (checkChanges) {
            this.setState(prevState => ({
                event: {
                    ...prevState.event,
                    diffusionIllustration: newEvent.diffusionIllustration,
                    diffusionPublicDescription: newEvent.diffusionPublicDescription,
                    diffusionInformations: newEvent.diffusionInformations,
                    diffusionActiveMembers: newEvent.diffusionActiveMembers,
                    diffusionPublic: newEvent.diffusionPublic,
                    diffusionAdministration: newEvent.diffusionAdministration,
                    diffusionEndInscriptionDate: newEvent.diffusionEndInscriptionDate
                },
                currentComponentId: this.state.currentComponentId + plusOrMinus
            }), () => {
                this.initializeComponents();
                if (plusOrMinus === 0) {
                    this.addEventInDatabase();
                }
            });
        } else {
            this.setState({
                currentComponentId: this.state.currentComponentId + plusOrMinus
            });
        }
    }

    addEventInDatabase() {
        const eventInput = {
            entitled: this.state.event.intitule,
            musicalFormationId: this.state.event.musicalFormation,
            eventType: "eventType", //this.state.event.eventType, 
            startDate: this.state.event.eventStartDate,
            endDate: this.state.event.eventEndDate,
            address: this.state.event.eventAddress,
            addressComplement: this.state.event.eventAddressComplement,
            postalCode: this.state.event.eventPostalCode,
            city: this.state.event.eventCity,
            phoneNumber: this.state.event.eventPhoneNumber,
            mobileNumber: this.state.event.eventMobileNumber,
            email: this.state.event.eventEmail,
            clientName: this.state.event.clientLastname,
            clientFirstname: this.state.event.clientFirstname,
            clientPhoneNumber: this.state.event.clientPhoneNumber,
            clientMobileNumber: this.state.event.clientMobileNumber,
            clientEmail: this.state.event.clientEmail,
            clientFunction: this.state.event.clientFunction,
            clientAddress: this.state.event.clientAddress,
            clientPostalCode: this.state.event.clientPostalCode,
            clientCity: this.state.event.clientCity,
            transportMode: "transportMode", //this.state.event.programTransportMode, 
            appointmentTime: this.state.event.programRendezvousDate,
            appointmentAddress: this.state.event.programAddress,
            appointmentPostalCode: this.state.event.programPostalCode,
            appointmentCity: this.state.event.programCity,
            illustrationPath: this.state.event.diffusionIllustration,
            publicDescription: this.state.event.diffusionPublicDescription,
            activeMembersInformations: this.state.event.diffusionInformations,
            diffusionActiveMembers: this.state.event.diffusionActiveMembers,
            diffusionAdministration: this.state.event.diffusionAdministration,
            diffusionPublic: this.state.event.diffusionPublic,
            endInscriptionDate: this.state.event.diffusionEndInscriptionDate
        };

        addEvent(eventInput).then((res) => {
            if (res.addEvent.statusCode === 200) {
                this.setState({ openPopupAddEventSuccess: true });
            } else {
                this.setState({ openPopupAddEventFail: true });
            }
        });
    }

    initializeComponents() {
        let components = [];

        components.push(<GeneralDataForm
            event={this.state.event}
            functionCallback={(newEvent) =>
                this.saveGeneralData(newEvent)
            }
            functionCheckCompleted={(index, bool) => this.setState(prevState => ({
                componentComplete: {
                    ...prevState.componentComplete,
                    [index]: bool,
                }
            }))}
        ></GeneralDataForm>);

        components.push(<ClientContactForm
            event={this.state.event}
            functionCallback={(newEvent, plusOrMinus) =>
                this.saveClientData(newEvent, plusOrMinus)
            }
            functionCheckCompleted={(index, bool) => this.setState(prevState => ({
                componentComplete: {
                    ...prevState.componentComplete,
                    [index]: bool,
                }
            }))}></ClientContactForm>);

        components.push(<LogisticProgramForm
            event={this.state.event}
            functionCallback={(newEvent, plusOrMinus) =>
                this.saveProgramData(newEvent, plusOrMinus)
            }
            functionCheckCompleted={(index, bool) => this.setState(prevState => ({
                componentComplete: {
                    ...prevState.componentComplete,
                    [index]: bool,
                }
            }))}></LogisticProgramForm>);

        components.push(<DiffusionForm
            event={this.state.event}
            functionCallback={(newEvent, plusOrMinus) =>
                this.saveDiffusionData(newEvent, plusOrMinus)
            }
            functionCheckCompleted={(index, bool) => this.setState(prevState => ({
                componentComplete: {
                    ...prevState.componentComplete,
                    [index]: bool,
                }
            }))}></DiffusionForm>);
        this.setState({
            components: components,
            steps: [
                "Informations générales",
                "Contacts client",
                "Programme & Logistique",
                "Informations de diffusion"
            ],
        });
    }

    componentDidMount() {
        this.initializeComponents();
    }

    render() {
        const {
            components,
            currentComponentId,
            steps,
            componentComplete
        } = this.state;

        return (
            <div className="body" style={{ filter: (this.state.openPopupAddEventSuccess || this.state.openPopupAddEventFail) ? "blur(3px)" : "none" }}>
                <div style={{
                    overflow: "hidden"
                }}>
                    <Paper style={{ marginBottom: "50px" }}>
                        <div style={{ marginBottom: "50px", marginLeft: "5%", paddingTop: "50px", marginRight: "5%" }}>
                            {!this.state.componentComplete[this.state.currentComponentId] ?
                                (<Alert severity="info" variant="filled">Les informations doivent être complétées avant de pouvoir passer à l'étape suivante.</Alert>)
                                :
                                (<Alert severity="success" variant="filled">{steps[this.state.currentComponentId]} saisi.e.s avec succès.</Alert>)
                            }
                        </div>
                        <div style={{ marginLeft: "5%", marginRight: "5%" }}>
                            <CustomizedStepper
                                steps={steps}
                                currentStep={currentComponentId}
                                completed={componentComplete}
                                backgroundGradient={backgroundGradient}
                                setCurrent={(index) => this.setState({ currentComponentId: index })}
                            />
                        </div>
                        <div style={{ marginLeft: "5%", marginRight: "5%" }}>
                            {components[currentComponentId]}
                        </div>
                    </Paper>
                </div>

                <Popup
                    title="Évènements"
                    length="md"
                    closable="false"
                    openPopup={this.state.openPopupAddEventSuccess}
                    parentCallback={() =>
                        this.setState({ openPopupAddEventSuccess: false })
                    }
                >
                    <Alert severity="success" variant="filled">Évènement ajouté avec succès.</Alert>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <LinkRouter to="/eventsGestion" style={{ textDecoration: "none" }}>
                            <Button variant="contained" style={{ marginTop: "20px" }}>Voir les évènements</Button>
                        </LinkRouter>
                    </div>
                </Popup>

                <Popup
                    title="Évènements"
                    length="md"
                    closable="false"
                    openPopup={this.state.openPopupAddEventFail}
                    parentCallback={() =>
                        this.setState({ openPopupAddEventFail: false })
                    }
                >
                    <Alert severity="error" variant="filled">Une erreur est survenue lors de l'ajout de l'évènement, veuillez réessayer ultérieurement.</Alert>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <LinkRouter to="/eventsGestion" style={{ textDecoration: "none" }}>
                            <Button variant="contained" style={{ marginTop: "20px" }}>Voir les évènements</Button>
                        </LinkRouter>
                    </div>
                </Popup>
            </div>
        );
    }
}

export default AddEventPage;