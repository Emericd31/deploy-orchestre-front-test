import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Checkbox from "@mui/material/Checkbox";
import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import SplitButton from '../../components/General/TextFields/SplitButton'
import { getEventsGeneralInfos, getMusicalFormations, getMyPresence } from "../../GraphQL/queries/EventQueries";
import { getDayNumbersMonthLettersYearNumbers, getHours, getDateDiff } from "../../Helpers/DateGestion";
import { Link as LinkRouter } from "react-router-dom";
import "../../styles/event.css";
import { getMyInstruments } from '../../GraphQL/queries/UserQueries';
import { setInstrumentEvent } from '../../GraphQL/mutations/EventMutations';
import { getEventTypes } from '../../GraphQL/queries/EventTypeQueries';
import CloseIcon from '@mui/icons-material/Close';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [myPresence, setMyPresence] = React.useState();
    const [myInstruments, setMyInstruments] = React.useState([]);
    const [selectedInstrument, setSelectedInstrument] = React.useState("");

    const updateSelect = (input) => {
        setInstrumentEvent(row.id, input).then((res) => {
            if (res.setInstrumentEvent.statusCode == 200) {
                setSelectedInstrument(input);
            }
        })
    }

    React.useEffect(() => {
        getMyInstruments().then((res) => {
            var instruments = [];
            res.currentUser.instruments.forEach(instrument => {
                instruments.push(instrument.type.type)
            });
            setMyInstruments(instruments);
        })
    }, [myPresence])

    React.useEffect(() => {
        getMyPresence(parseInt(row.id)).then((res) => {
            if (res.myPresence?.instrument == null) {
                setSelectedInstrument("");
            } else {
                if (Date.now() > new Date(row.startDate)) {
                    setSelectedInstrument(res.myPresence.instrument);
                } else {
                    if (myInstruments.includes(res.myPresence.instrument)) {
                        setSelectedInstrument(res.myPresence.instrument);
                    } else {
                        setSelectedInstrument("");
                    }
                }
            }
        })
    }, [myInstruments])

    return (
        <React.Fragment>
            {/* DEBUT VERSION RESPONSIVE */}
            <Grid container key={row.id} rowSpacing={0} style={{ border: "1px solid #E0E0E0", borderRadius: "2px", backgroundColor: "white" }}>
                {/* INTITULE */}
                <Grid item lg={2} md={6} xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "left", md: "center", lg: "inherit" }, padding: {xs: "10px" } }}>
                    <p className="eventContentTab" style={{ margin: "0px", fontWeight: open ? "bold" : "" }}>{row.entitled}</p>
                </Grid>
                {/* LIEU */}
                <Grid item lg={2} md={6} xs={6} sx={{ fontWeight: open ? "bold" : "", display: "flex", alignItems: "center", justifyContent: { xs: "right", md: "center", lg: "inherit" }, paddingRight: {xs: "10px", md: "0px"} }}>
                    <p className="eventContentTab" style={{ margin: "0px" }}>{row.city}</p>
                </Grid>
                {/* DATE */}
                <Grid item lg={3} md={6} xs={12} sx={{ paddingTop: "0px", fontWeight: open ? "bold" : "", display: "flex", alignItems: "center" }}>
                    <p className="eventContentTab" style={{ margin: "0px"}}>{getDateDiff(row.startDate, row.endDate)}</p>
                </Grid>
                {/* INSTRUMENT */}                {
                    (Date.now() > new Date(row.startDate)) ? (
                        <Grid item lg={3} md={6} xs={12} sx={{ paddingRight: "10px", display: "flex", alignItems: "center", justifyContent: { xs: "center", lg: "center" } }}>
                            <p style={{ margin: "0px" }}>{selectedInstrument}</p>
                        </Grid>
                    ) : (
                        <Grid item lg={3} md={6} xs={12} sx={{ marginTop: { xs: "20px", md: "10px"}, marginBottom: { xs: "10px" }, paddingRight: "10px", paddingLeft: "5px", display: "flex", alignItems: "center", justifyContent: { xs: "center", lg: "inherit" } }}>
                            {
                                myInstruments.length > 0 ? (
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="instrument_label">
                                            Instrument *
                                        </InputLabel>
                                        <Select
                                            id="type"
                                            labelId="instrument_label"
                                            label="Instrument *"
                                            disabled={Date.now() > new Date(row.startDate)}
                                            value={selectedInstrument}
                                            onChange={(event) =>
                                                updateSelect(event.target.value)
                                            }
                                        >
                                            {myInstruments.map((instrument) => (
                                                <MenuItem key={instrument} value={instrument}>
                                                    {instrument}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : ""
                            }
                        </Grid>
                    )
                }
                {/* PRESENCE */}
                <Grid item lg={1} md={6} xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", lg: "end" }, paddingBottom: "10px"}}>
                    <SplitButton disabled={Date.now() > new Date(row.startDate)} eventId={row.id}></SplitButton>
                </Grid>
                {/* ARROW MORE DETAILS */}
                <Grid className="eventArrow" item lg={1} md={12} xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                        style={{ float: "right", marginLeft: "20px" }}
                    >
                        {open ? <KeyboardArrowUpIcon sx={{ color: { xs: "white", lg: "black" } }} /> : <KeyboardArrowDownIcon sx={{ color: { xs: "white", lg: "black" } }} />}
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Grid container style={{ backgroundColor: "#EFEFEF" }}>
                            {/* TENUE VESTIMENTAIRE */}
                            <Grid item xs={6} lg={3} xl={2} sx={{ backgroundColor: { xs: "#1D70B7", lg: "#EFEFEF" }, color: { xs: "white", lg: "black" } }}>
                                <div>
                                    <CheckroomIcon sx={{ float: { xs: "none", lg: "left" }, marginLeft: { xs: "45%", lg: "20px" }, marginRight: { xs: "0px", lg: "20px" }, marginBottom: "-20px", marginTop: "-2px" }} />
                                    <p className="eventContentTab">Tenue vestimentaire</p>
                                </div>
                            </Grid>
                            <Grid item xs={6} lg={3} xl={4} style={{ display: "flex", alignItems: "top", justifyContent: { xs: "center", lg: "left" } }}>
                                <p className="eventContentTab">T-shirt  bleu clair, Pantalon Blanc</p>
                            </Grid>
                            {/* MODE DE TRANSPORT  */}
                            <Grid item xs={6} lg={3} xl={2} sx={{ backgroundColor: { xs: "#1D70B7", lg: "#EFEFEF" }, color: { xs: "white", lg: "black" } }}>
                                <div>
                                    <DirectionsBusIcon sx={{ float: { xs: "none", lg: "left" }, marginLeft: { xs: "45%", lg: "20px" }, marginRight: { xs: "0px", lg: "20px" }, marginBottom: "-20px", marginTop: "-2px" }} />
                                    <p className="eventContentTab">Mode de transport</p>
                                </div>
                            </Grid>
                            <Grid item xs={6} lg={3} xl={4} sx={{ display: "flex", alignItems: "top", justifyContent: { xs: "center", lg: "left" } }}>
                                <p className="eventContentTab">{row.transportMode}</p>
                            </Grid>
                            {/* LIEU DE RENDEZ-VOUS */}
                            <Grid item xs={6} lg={3} xl={2} sx={{ backgroundColor: { xs: "#1D70B7", lg: "#EFEFEF" }, color: { xs: "white", lg: "black" } }}>
                                <div>
                                    <LocationOnIcon sx={{ float: { xs: "none", lg: "left" }, marginLeft: { xs: "45%", lg: "20px" }, marginRight: { xs: "0px", lg: "20px" }, marginBottom: "-20px", marginTop: "-2px" }} />
                                    <p className="eventContentTab">Lieu de rendez-vous</p>
                                </div>
                            </Grid>
                            <Grid item xs={6} lg={3} xl={4} sx={{ display: "flex", alignItems: "top", justifyContent: { xs: "center", lg: "left" } }}>
                                <p className="eventContentTab">{row.appointmentAddress}
                                    , {row.appointmentCity}
                                    , {row.appointmentPostalCode}</p>
                            </Grid>
                            {/* DATE DE RENDEZ-VOUS */}
                            <Grid item xs={6} lg={3} xl={2} sx={{ backgroundColor: { xs: "#1D70B7", lg: "#EFEFEF" }, color: { xs: "white", lg: "black" } }}>
                                <div>
                                    <EventAvailableIcon sx={{ float: { xs: "none", lg: "left" }, marginLeft: { xs: "45%", lg: "20px" }, marginRight: { xs: "0px", lg: "20px" }, marginBottom: "-20px", marginTop: "-2px" }} />
                                    <p className="eventContentTab">Date de rendez-vous</p>
                                </div>
                            </Grid>
                            <Grid item xs={6} lg={3} xl={4} sx={{ display: "flex", alignItems: "top", justifyContent: { xs: "center", lg: "left" } }}>
                                <p className="eventContentTab">{getDayNumbersMonthLettersYearNumbers(row.appointmentTime) + " - " + getHours(row.appointmentTime)}</p>
                            </Grid>
                            {/* DATE LIMITE D'INSCRIPTION */}
                            <Grid item xs={6} lg={3} sx={{ backgroundColor: { xs: "#1D70B7", lg: "#EFEFEF" }, color: { xs: "white", lg: "black" } }}>
                                <div>
                                    <HowToRegIcon sx={{ float: { xs: "none", lg: "left" }, marginLeft: { xs: "45%", lg: "20px" }, marginRight: { xs: "0px", lg: "20px" }, marginBottom: "-20px", marginTop: "-2px" }} />
                                    <p className="eventContentTab">Date limite d'inscription</p>
                                </div>
                            </Grid>
                            <Grid item xs={6} lg={3} sx={{ display: "flex", alignItems: "top", justifyContent: { xs: "center", lg: "left" } }}>
                                <p>{getDayNumbersMonthLettersYearNumbers(row.endInscriptionDate)}</p>
                            </Grid>
                            {/* BOUTON MORE DETAILS */}
                            <Grid className="moreDetailsButton" item xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <LinkRouter to={'/eventDetails/' + row.id} style={{ textDecoration: "none" }}>
                                    <p style={{ float: "left", textDecoration: "none", color: "white", fontWeight: "bold" }}>Voir toutes les informations</p>
                                    <IconButton style={{ color: "white", marginTop: "8px" }}><InfoOutlinedIcon /></IconButton >
                                </LinkRouter>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Grid>
            </Grid>
            {/* FIN VERSION RESPONSIVE */}

            {/* DEBUT VERSION TABLEAU */}
            {/* <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                <TableCell align="right" style={{ fontWeight: open ? "bold" : "" }}><SplitButton disabled={Date.now() > new Date(row.startDate)} eventId={row.id}></SplitButton></TableCell>


                <TableCell align="center" style={{ width: "10px" }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>



            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: "#EFEFEF" }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 0 }}>
                            <Table size="" aria-label="purchases">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left" style={{ width: "30%" }}>
                                            <div>
                                                <CheckroomIcon style={{ float: "left", marginRight: "10px" }} />
                                                <p style={{ paddingTop: "3px" }}>T-shirt  bleu clair, Pantalon Blanc</p>
                                            </div>
                                            <div>
                                                <DirectionsBusIcon style={{ float: "left", marginRight: "10px" }} />
                                                <p style={{ paddingTop: "3px" }}>{row.transportMode}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right" style={{ verticalAlign: "top", paddingTop: "30px" }}>
                                            <div style={{ display: "inline", paddingTop: "25px" }}>
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
                                            <LinkRouter to={'/eventDetails/' + row.id} style={{ textDecoration: "none", float: "right", marginRight: "5px" }}>
                                                <IconButton color="primary"><InfoOutlinedIcon /></IconButton >
                                            </LinkRouter>
                                            <div>
                                                <EventAvailableIcon style={{ float: "left", marginRight: "10px" }} />
                                                <p style={{ paddingTop: "3px" }}>Date de rendez-vous : {getDayNumbersMonthLettersYearNumbers(row.appointmentTime) + " - " + getHours(row.appointmentTime)}</p>
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
                    </Collapse>
                </TableCell>
            </TableRow> */}
            {/* FIN VERSION TABLEAU */}
        </React.Fragment>
    );
}

class EventTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            musicalFormations: [],
            eventTypes: [],
            eventsFiltered: [],
            eventTypeFiltered: "",
            eventMusicalFormationFiltered: "",
            oldEvents: false,
            nextEvents: true,
            isLoading: true
        }
    }

    componentDidMount = () => {
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
                        <Box sx={{ flexWrap: 'wrap' }}>
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
                            <FormControl size="small" sx={{ width: { xs: "270px", md: "300px" }, marginLeft: "10px", marginTop: "5px", marginBottom: "20px" }}>
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

                            <FormControl size="small" sx={{ width: { xs: "270px", md: "300px" }, marginLeft: "10px", marginTop: "5px", marginBottom: "20px" }}>
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

                        {/* DEBUT VERSION RESPONSIVE  */}
                        <div className="eventsTab">
                            <Grid container className="eventTabHeader">
                                <Grid item lg={2} md={6} xs={12}>
                                    <p className="eventTitleTab">Intitulé</p>
                                </Grid>
                                <Grid item lg={2} md={6} xs={12}>
                                    <p className="eventTitleTab">Lieu</p>
                                </Grid>
                                <Grid item lg={4} md={6} xs={12}>
                                    <p className="eventTitleTab">Date</p>
                                </Grid>
                                <Grid item lg={2} md={6} xs={12}>
                                    <p className="eventTitleTab">Instrument</p>
                                </Grid>
                                <Grid item lg={2} md={6} xs={12}>
                                    <p style={{ textAlign: "center" }} >Présence</p>
                                </Grid>
                            </Grid>
                            {
                                this.state.eventsFiltered.sort((a, b) => this.compareDate(a, b)).map((row) => (
                                    <Row key={row.id} row={row} />
                                ))
                            }
                        </div>
                        {/* FIN VERSION RESPONSIVE */}

                        {/* DEBUT VERSION TABLEAU */}
                        {/* <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow style={{ backgroundColor: "#1D70B7" }}>
                                        <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "20%" }}>Intitulé</TableCell>
                                        <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "20%" }}>Lieu</TableCell>
                                        <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "40%" }}>Date</TableCell>
                                        <TableCell align="right" style={{ color: "white", fontWeight: "bold", width: "20%" }}>Présence</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.eventsFiltered.sort((a, b) => this.compareDate(a, b)).map((row) => (
                                        <Row key={row.id} row={row} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> */}
                        {/* FIN VERSION TABLEAU */}
                    </>
                ) : (
                    <p>Il n'y a aucun évènement pour le moment. Revenez plus tard !</p>
                )
            ) : ""
        )
    }
}

export default EventTab;