import * as React from 'react';
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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import SplitButton from '../../components/General/TextFields/SplitButton'
import { getEventsGeneralInfos } from "../../GraphQL/queries/EventQueries";
import { getDayNumbersMonthLettersYearNumbers, getHours, getDateDiff } from "../../Helpers/DateGestion";
import { Link as LinkRouter } from "react-router-dom";

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
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
                <TableCell align="right" style={{ fontWeight: open ? "bold" : "" }}><SplitButton eventId={row.id}></SplitButton></TableCell>


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
            </TableRow>
        </React.Fragment>
    );
}

class EventTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            eventsFiltered: [],
            oldEvents: false,
            nextEvents: true,
            isLoading: true
        }
    }

    componentDidMount = () => {
        getEventsGeneralInfos().then((res) => {
            this.setState({ events: res.events }, () => {
                this.filterEvents();
                this.setState({ isLoading: false })
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
            if (this.state.oldEvents && new Date(event.startDate) < Date.now())
                eventsFiltered.push(event);

            if (this.state.nextEvents && new Date(event.startDate) > Date.now())
                eventsFiltered.push(event);
        })

        this.setState({ eventsFiltered: eventsFiltered });
    }

    compareDate(a, b) {
        var date1 = new Date(a.startDate);
        var date2 = new Date(b.startDate);
        return date1 > date2 ? 1 : date1 < date2 ? -1 : 0;
    }

    render() {
        return (
            !this.state.isLoading ? (
                this.state.events.length > 0 ? (
                    <>
                        <div>
                            <FormControlLabel
                                style={{ marginTop: "5px" }}
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
                                style={{ marginTop: "5px" }}
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
                        </div>
                        <TableContainer component={Paper}>
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
                        </TableContainer>
                    </>
                ) : (
                    <p>Il n'y a aucun évènement pour le moment. Revenez plus tard !</p>
                )
            ) : ""
        )
    }
}

export default EventTab;