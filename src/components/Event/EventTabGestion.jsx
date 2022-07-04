import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SendIcon from '@mui/icons-material/Send';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import { getEventsGeneralInfos, getMusicalFormations, getPresence, getUsersAndPresencesByEvent } from "../../GraphQL/queries/EventQueries";
import { getDayNumbersMonthLettersYearNumbers, getHours, getDateDiff } from "../../Helpers/DateGestion";
import { Link as LinkRouter } from "react-router-dom";
import { hasRight } from '../../Helpers/RightsGestion';
import { GreenButton } from '../General/StyledComponents/StyledButtons';
import ActionButtons from '../General/Buttons/ActionButtons';
import Popup from '../General/Popups/Popup';
import ConfirmPopup from '../General/Popups/ConfirmPopup';
import EventGeneralDataTab from './Gestion/EventGeneralDataTab';
import ClientContactTab from './Gestion/ClientContactTab';
import { getEventTypes } from '../../GraphQL/queries/EventTypeQueries';
import LogisticProgramTab from './Gestion/LogisticProgramTab';
import DiffusionDataTab from './Gestion/DiffusionDataTab';
import CloseIcon from '@mui/icons-material/Close';

function MembersTab(props) {

    const sortArray = (x, y) => {

        if (x.item2.instrument < y.item2.instrument || y.item2.instrument == null) {return -1;}
        if (x.item2.instrument > y.item2.instrument || x.item2.instrument == null) {return 1;}
        return 0;
    }

    return (
        <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow style={{ backgroundColor: "#1D70B7" }}>
                        <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "15%" }}>Nom</TableCell>
                        <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "15%" }}>Prénom</TableCell>
                        <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "20%" }}>N° de téléphone</TableCell>
                        <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "20%" }}>Instrument</TableCell>
                        <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "30%" }}>Date de réponse</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.sort(sortArray).map((row) => (
                        (
                            (props.nonrenseigne && row.item2.presence == "NONRENSEIGNE") ||
                            (props.present && row.item2.presence == "PRESENT") ||
                            (props.absent && row.item2.presence == "ABSENT")
                        ) ? (
                            <TableRow key={row.item1.id}>
                                <TableCell align="left" style={{ width: "15%" }}>{row.item1.lastName}</TableCell>
                                <TableCell align="left" style={{ width: "15%" }}>{row.item1.firstName}</TableCell>
                                <TableCell align="left" style={{ width: "20%" }}>{row.item1.mobileNumber}</TableCell>
                                <TableCell align="left" style={{ width: "20%" }}>{row.item2.instrument}</TableCell>
                                <TableCell align="left" style={{ width: "30%" }}>{row.item2.date != null ? (getDayNumbersMonthLettersYearNumbers(row.item2.date) + " à " + getHours(row.item2.date)) : ""}</TableCell>
                            </TableRow>
                        ) : <React.Fragment key={row.item1.id}></React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function Row(props) {
    const { row } = props;
    const [isLoading, setIsLoading] = React.useState(true);
    const [users, setUsers] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [presence, setPresence] = React.useState(0);
    const [absent, setAbsence] = React.useState(0);
    const [nonrenseigne, setNonRenseigne] = React.useState(0);
    const [buttonPresent, setButtonPresent] = React.useState(false);
    const [buttonAbsent, setButtonAbsent] = React.useState(false);
    const [buttonNonRenseigne, setButtonNonRenseigne] = React.useState(false);
    const [nbSenders, setNbSenders] = React.useState(0);
    const [openPopupEdit, setOpenPopupEdit] = React.useState(false);
    const [openPopupDeleteConfirm, setOpenPopupDeleteConfirm] = React.useState(false);

    useEffect(() => {
        getPresence(row.id).then((res) => {
            if (res.presence.statusCode == 200) {
                setPresence(res.presence.present);
                setAbsence(res.presence.absent);
                setNonRenseigne(res.presence.nonRenseigne);
            }
            getUsersAndPresencesByEvent(row.id).then((res) => {
                setUsers([...res.usersAndPresencesByEvent.resultat]);
                setIsLoading(false);
            })
        });
    }, [])

    useEffect(() => {
        handleNbSendersChange();
    }, [buttonPresent, buttonAbsent, buttonNonRenseigne]);

    const handleNbSendersChange = () => {
        let nbSendersTemp = 0;
        if (buttonPresent) {
            nbSendersTemp += presence;
        }
        if (buttonAbsent) {
            nbSendersTemp += absent;
        }
        if (buttonNonRenseigne) {
            nbSendersTemp += nonrenseigne;
        }
        setNbSenders(nbSendersTemp);
    }

    const updateEvent = (event) => {
        row.entitled = event.intitule;
        row.startDate = event.startDate;
        row.endDate = event.endDate;
        row.address = event.address;
        row.addressComplement = event.addressComplement;
        row.postalCode = event.postalCode;
        row.city = event.city;
        row.phoneNumber = event.phoneNumber;
        row.mobileNumber = event.mobileNumber;
        row.email = event.email;
        row.musicalFormation.id = event.musicalFormation;
        row.eventType = event.eventType;
    }

    const updateClientInfo = (event) => {
        row.clientAddress = event.clientAddress;
        row.clientCity = event.clientCity;
        row.clientEmail = event.clientEmail;
        row.clientFirstname = event.clientFirstname;
        row.clientName = event.clientLastname;
        row.clientFirstname = event.clientFunction;
        row.clientMobileNumber = event.clientMobileNumber;
        row.clientPhoneNumber = event.clientPhoneNumber;
        row.clientPostalCode = event.clientPostalCode;
    }

    const updateLogisticProgram = (event) => {
        row.appointmentAddress = event.programAddress;
        row.appointmentCity = event.programCity;
        row.appointmentPostalCode = event.programPostalCode;
        row.dresses = event.programDresses;
        row.transportMode = event.programTransportMode;
        row.appointmentTime = event.programRendezvousDate;
    }

    const updateDiffusionData = (event) => {
        row.illustrationPath = event.illustrationPath;
        row.diffusionActiveMembers = event.diffusionActiveMembers;
        row.diffuionAdministration = event.diffuionAdministration;
        row.endInscriptionDate = event.diffusionEndInscriptionDate;
        row.activeMembersInformations = event.diffusionInformations;
        row.diffusionPublic = event.diffusionPublic;
        row.publicDescription = event.diffusionPublicDescription;
    }

    return (
        !isLoading ? (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    {open ? (
                        <TableCell component="th" scope="row" style={{ fontWeight: "bold" }}>
                            {row.entitled}
                        </TableCell>
                    ) : (
                        <TableCell component="th" scope="row">
                            {row.entitled}
                        </TableCell>)
                    }
                    <TableCell align="left" style={{ fontWeight: open ? "bold" : "" }}>{row.city}</TableCell>
                    <TableCell align="left" style={{ fontWeight: open ? "bold" : "" }}>{getDateDiff(row.startDate, row.endDate)}</TableCell>
                    <TableCell align="right" style={{ fontWeight: open ? "bold" : "" }}>{presence + " présents"}</TableCell>
                    <TableCell align="center" style={{ width: "10px" }}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell>
                        <ActionButtons
                            functionEdit={() => setOpenPopupEdit(true)}
                            functionDelete={() => setOpenPopupDeleteConfirm(true)}
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: "#EFEFEF" }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box style={{ paddingTop: "10px" }}>
                                <Button variant="contained"
                                    onClick={() => {
                                        setButtonPresent(!buttonPresent);
                                    }}
                                    style={{
                                        display: "inline", marginRight: "10px", width: "200px",
                                        backgroundColor: buttonPresent ? "#1664C0" : "#EFEFEF",
                                        color: buttonPresent ? "white" : "#707070",
                                        border: buttonPresent ? "1px solid #1664C0" : "1px solid"
                                    }}>
                                    <>
                                        <PersonAddAltIcon style={{ float: "left" }} />
                                        <p style={{ margin: "0px" }}>PRESENTS : {presence}</p>
                                    </>
                                </Button>
                                <Button variant="contained"
                                    onClick={() => {
                                        setButtonAbsent(!buttonAbsent);
                                    }}
                                    style={{
                                        display: "inline", marginRight: "10px", width: "200px",
                                        backgroundColor: buttonAbsent ? "#1664C0" : "#EFEFEF",
                                        color: buttonAbsent ? "white" : "#707070",
                                        border: buttonAbsent ? "1px solid #1664C0" : "1px solid"

                                    }}>
                                    <>
                                        <PersonRemoveIcon style={{ float: "left" }} />
                                        <p style={{ margin: "0px" }}>ABSENTS : {absent}</p>
                                    </>
                                </Button>
                                <Button variant="contained"
                                    onClick={() => {
                                        setButtonNonRenseigne(!buttonNonRenseigne);
                                    }}
                                    style={{
                                        display: "inline", width: "220px",
                                        backgroundColor: buttonNonRenseigne ? "#1664C0" : "#EFEFEF",
                                        color: buttonNonRenseigne ? "white" : "#707070",
                                        border: buttonNonRenseigne ? "1px solid #1664C0" : "1px solid"
                                    }}>
                                    <>
                                        <ManageAccountsIcon style={{ float: "left" }} />
                                        <p style={{ margin: "0px" }}>A RENSEIGNER : {nonrenseigne}</p>
                                    </>
                                </Button>
                            </Box>
                            <Box sx={{ margin: 0 }}>
                                <Table size="" aria-label="purchases">
                                    <TableBody>
                                        <TableRow style={{ borderStyle: "hidden" }}>
                                            <TableCell align="left" style={{ width: "30%" }}>
                                                <div>
                                                    <CheckroomIcon style={{ float: "left", marginRight: "10px" }} />
                                                    <p style={{ paddingTop: "3px" }}>{row.dresses ?? ""}</p>
                                                </div>
                                                <div>
                                                    <DirectionsBusIcon style={{ float: "left", marginRight: "10px" }} />
                                                    <p style={{ paddingTop: "3px" }}>{row.transportMode}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right" style={{ verticalAlign: "top", paddingTop: "30px" }}>
                                                <div style={{ display: "inline" }}>
                                                    <LocationOnIcon style={{ marginRight: "20px", display: "inline", verticalAlign: "middle" }} />
                                                    <p style={{ display: "inline", verticalAlign: "middle" }}>Lieu de rendez-vous : </p>
                                                </div>
                                            </TableCell>
                                            <TableCell align="left" style={{ verticalAlign: "top" }}>
                                                <p style={{ paddingTop: "3px" }}>{row.appointmentAddress}
                                                    <br />{row.appointmentCity}
                                                    <br />{row.appointmentPostalCode}</p>
                                            </TableCell>
                                            <TableCell align="left" style={{ verticalAlign: "top" }}>
                                                <div>
                                                    <EventAvailableIcon style={{ float: "left", marginRight: "10px" }} />
                                                    <p style={{ paddingTop: "3px" }}>Date de rendez-vous : {getDayNumbersMonthLettersYearNumbers(Date.parse(row.appointmentTime)) + " - " + getHours(Date.parse(row.appointmentTime))}</p>
                                                </div>
                                                <div>
                                                    <HowToRegIcon style={{ float: "left", marginRight: "10px" }} />
                                                    <p style={{ paddingTop: "3px" }}>Date limite d'inscription : {getDayNumbersMonthLettersYearNumbers(row.endInscriptionDate)}</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                            <Box style={{ marginBottom: "10px", float: "right" }}>
                                {
                                    hasRight("manage_communication") ? (
                                        <LinkRouter
                                            to={(buttonPresent || buttonAbsent || buttonNonRenseigne) ? "/communicationGestion" : "#"}
                                            state={{ foo: "toto" }}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <GreenButton variant="contained" style={{ display: "inline", marginRight: "10px", width: "200px" }}
                                                disabled={!buttonPresent && !buttonAbsent && !buttonNonRenseigne}
                                            >
                                                <>
                                                    <SendIcon style={{ float: "left" }} />
                                                    <p style={{ margin: "0px" }}>MESSAGE ({nbSenders})</p>
                                                </>
                                            </GreenButton>
                                        </LinkRouter>
                                    ) : ""
                                }
                                <Button variant="contained" style={{ display: "inline", marginRight: "10px", width: "120px" }}>
                                    <>
                                        <ReceiptIcon style={{ float: "left" }} />
                                        <p style={{ paddingTop: "3px", margin: "0px" }}>DEVIS</p>
                                    </>
                                </Button>
                                <Button variant="contained" style={{ display: "inline", width: "140px", marginRight: "10px" }}>
                                    <>
                                        <PointOfSaleIcon style={{ float: "left" }} />
                                        <p style={{ paddingTop: "3px", margin: "0px" }}>FACTURE</p>
                                    </>
                                </Button>
                            </Box>
                            {
                                (buttonPresent || buttonAbsent || buttonNonRenseigne) ? (
                                    <MembersTab rows={users} present={buttonPresent} absent={buttonAbsent} nonrenseigne={buttonNonRenseigne} />
                                ) : ""
                            }
                        </Collapse>
                    </TableCell>
                </TableRow>
                <Popup
                    title="Modifier un évènement"
                    length="xl"
                    openPopup={openPopupEdit}
                    parentCallback={() =>
                        setOpenPopupEdit(false)
                    }
                >
                    <div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                                marginRight: "1%",
                                marginBottom: "3%",
                            }}
                        >
                            <EditIcon color="primary" style={{ fontSize: 60 }} />
                        </div>
                        <EventGeneralDataTab
                            event={row}
                            musicalFormations={props.musicalFormations}
                            eventTypes={props.eventTypes}
                            functionCallback={(event) => updateEvent(event)}
                        />
                        <ClientContactTab
                            event={row}
                            functionCallback={(event) => updateClientInfo(event)}
                        />
                        <LogisticProgramTab
                            event={row}
                            functionCallback={(event) => updateLogisticProgram(event)}
                        />
                        <DiffusionDataTab
                            event={row}
                            functionCallback={(event) => updateDiffusionData(event)}
                        />
                    </div>
                </Popup>

                <ConfirmPopup
                    title={"Supprimer un évènement"}
                    text={"La suppression d'un évènement entraînera la suppression de toutes ses données (informations générales, inscriptions aux évènements, etc.). Voulez vous vraiment supprimer l'évènement " + row.entitled + " ? "}
                    openPopup={openPopupDeleteConfirm}
                    parentCallback={() => setOpenPopupDeleteConfirm(false)}
                    confirmButtonId="confirm-delete-user"
                    confirmButtonFunction={() => console.log("ok") /*props.deleteFunction(user.id)*/}
                    cancelButtonFunction={() => setOpenPopupDeleteConfirm(false)}
                    buttonDisabled={false}
                />
            </React.Fragment>
        ) : <></>
    );
}

class EventTabGestion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            eventsFiltered: [],
            eventTypeFiltered: "",
            eventMusicalFormationFiltered: "",
            oldEvents: false,
            nextEvents: true,
            isLoading: true,
            musicalFormations: [],
            eventTypes: []
        }
    }

    componentDidMount() {
        getEventsGeneralInfos().then((res) => {
            getMusicalFormations().then((res2) => {
                getEventTypes().then((res3) => {
                    this.setState({ eventTypes: res3.eventTypes, musicalFormations: res2.musicalFormations, events: res.events }, () => {
                        this.filterEvents();
                        this.setState({ isLoading: false })
                    })
                })
            })
        });
    }

    changeCheck(field, input) {
        this.setState({
            [field]: input,
        }, () => {
            this.filterEvents();
        });
    }

    filterEvents() {
        var eventsFiltered = [];

        this.state.events.map((event) => {
            if (this.state.oldEvents && new Date(event.startDate) < Date.now()) {
                if (this.state.eventTypeFiltered == "" || (this.state.eventTypeFiltered == event.eventType)
                    || (this.state.eventTypeFiltered == "Autres" && event.eventType !== "Concert" &&
                        event.eventType !== "Sortie" && event.eventType !== "Répétition" && event.eventType !== "Divers")) {
                    if (this.state.eventMusicalFormationFiltered == "" || this.state.eventMusicalFormationFiltered == "Toutes" || this.state.eventMusicalFormationFiltered == event.musicalFormation.value) {
                        eventsFiltered.push(event);
                    }
                }
            }

            if (this.state.nextEvents && new Date(event.startDate) > Date.now()) {
                if (this.state.eventTypeFiltered == "" || (this.state.eventTypeFiltered == event.eventType)
                    || (this.state.eventTypeFiltered == "Autres" && event.eventType !== "Concert" &&
                        event.eventType !== "Sortie" && event.eventType !== "Répétition" && event.eventType !== "Divers")) {
                    if (this.state.eventMusicalFormationFiltered == "" || this.state.eventMusicalFormationFiltered == "Toutes" || this.state.eventMusicalFormationFiltered == event.musicalFormation.value) {
                        eventsFiltered.push(event);
                    }
                }
            }
        })

        this.setState({ eventsFiltered: eventsFiltered });
    }

    compareDate(a, b) {
        var date1 = new Date(a.startDate);
        var date2 = new Date(b.startDate);
        return date1 > date2 ? 1 : date1 < date2 ? -1 : 0;
    }

    updateSelect(field, input) {
        this.setState({
            [field]: input,
        }, () => {
            this.filterEvents();
        });
    }

    render() {
        return (
            !this.state.isLoading ? (
                this.state.events.length > 0 ? (
                    <>
                        <Box sx={{ flexWrap: 'wrap', paddingTop: "30px" }}>
                            <FormControlLabel
                                style={{ marginTop: "5px", marginLeft: "10px" }}
                                control={
                                    <Checkbox
                                        checked={this.state.oldEvents}
                                        value={this.state.oldEvents}
                                        onChange={() =>
                                            this.changeCheck(
                                                "oldEvents",
                                                !this.state.oldEvents
                                            )
                                        }
                                        name="Evènements passés"
                                        color="primary"
                                    />
                                }
                                label="Evènements passés"
                            />
                            <FormControlLabel
                                style={{ marginTop: "5px", marginLeft: "10px" }}
                                control={
                                    <Checkbox
                                        checked={this.state.nextEvents}
                                        value={this.state.nextEvents}
                                        onChange={() =>
                                            this.changeCheck(
                                                "nextEvents",
                                                !this.state.nextEvents
                                            )
                                        }
                                        name="Evènements à venir"
                                        color="primary"
                                    />
                                }
                                label="Evènements à venir"
                            />
                            <FormControl size="small" style={{ width: "300px", marginLeft: "10px", marginTop: "5px", marginBottom: "20px" }}>
                                <InputLabel id="event_musical_formation_label">
                                    Formation musicale concernée
                                </InputLabel>
                                <Select
                                    id="type"
                                    labelId="event_musical_formation_label"
                                    label="Formation musicale concernée"
                                    value={this.state.eventMusicalFormationFiltered}
                                    onChange={(event) =>
                                        this.updateSelect("eventMusicalFormationFiltered", event.target.value)
                                    }
                                >
                                    {this.state.musicalFormations.map((type) => (
                                        <MenuItem key={type.value} value={type.value}>
                                            {type.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <IconButton color="primary" aria-label="upload picture" component="span"
                                onClick={() => this.updateSelect("eventMusicalFormationFiltered", "")}
                                style={{ margin: "5px" }}>
                                <CloseIcon style={{ color: "red" }} />
                            </IconButton>

                            <FormControl size="small" style={{ width: "300px", marginLeft: "10px", marginTop: "5px", marginBottom: "20px" }}>
                                <InputLabel id="event_type_label">
                                    Type d'évènement
                                </InputLabel>
                                <Select
                                    id="type"
                                    labelId="event_type_label"
                                    label="Type d'évènement"
                                    value={this.state.eventTypeFiltered}
                                    onChange={(event) =>
                                        this.updateSelect("eventTypeFiltered", event.target.value)
                                    }
                                >
                                    {this.state.eventTypes.map((type) => (
                                        <MenuItem key={type.value} value={type.value}>
                                            {type.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <IconButton color="primary" aria-label="upload picture" component="span"
                                onClick={() => this.updateSelect("eventTypeFiltered", "")}
                                style={{ margin: "5px" }}>
                                <CloseIcon style={{ color: "red" }} />
                            </IconButton>
                        </Box>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow style={{ backgroundColor: "#1D70B7" }}>
                                        <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "20%" }}>Intitulé</TableCell>
                                        <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "20%" }}>Lieu</TableCell>
                                        <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "30%" }}>Date</TableCell>
                                        <TableCell align="right" style={{ color: "white", fontWeight: "bold", width: "10%" }}>Présences</TableCell>
                                        <TableCell style={{ width: "5%" }}></TableCell>
                                        <TableCell style={{ width: "15" }}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.eventsFiltered.sort((a, b) => this.compareDate(a, b)).map((row) => (
                                        <Row
                                            key={row.id}
                                            row={row}
                                            musicalFormations={this.state.musicalFormations}
                                            eventTypes={this.state.eventTypes}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ) : (
                    <p>Il n'y a aucun évènement actuellement. Créez-en un maintenant !</p>
                )
            ) : ""
        );
    }
};

export default EventTabGestion;