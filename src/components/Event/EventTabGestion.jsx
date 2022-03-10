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
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SendIcon from '@mui/icons-material/Send';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { getEventsGeneralInfos, getPresence } from "../../GraphQL/queries/EventQueries";
import { getDayNumbersMonthLettersYearNumbers, getHours, getDateDiff } from "../../Helpers/DateGestion";
import { Link as LinkRouter } from "react-router-dom";

const RedButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#FF0000",
    '&:hover': {
        backgroundColor: "#A40000",
    },
}));

const GrayButton = styled(Button)(({ theme }) => ({
    color: "#707070",
    border: "1px solid",
    backgroundColor: "#EFEFEF",
    '&:hover': {
        backgroundColor: "#EFEFEF",
    },
}));

const GreenButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#00AF06",
    '&:hover': {
        backgroundColor: "#009205",
    },
}));

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [presence, setPresence] = React.useState(0);
    const [absent, setAbsence] = React.useState(0);
    const [nonrenseigne, setNonRenseigne] = React.useState(0);
    const [buttonPresent, setButtonPresent] = React.useState(false);
    const [buttonAbsent, setButtonAbsent] = React.useState(false);
    const [buttonNonRenseigne, setButtonNonRenseigne] = React.useState(false);
    const [nbSenders, setNbSenders] = React.useState(0);

    useEffect(() => {
        getPresence(row.id).then((res) => {
            if (res.presence.statusCode == 200) {
                setPresence(res.presence.present);
                setAbsence(res.presence.absent);
                setNonRenseigne(res.presence.nonRenseigne);
            }
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
                    <LinkRouter to={'/eventDetails/' + row.id} style={{ textDecoration: "none", float: "left", marginRight: "5px" }}>
                        <GreenButton><EditIcon /></GreenButton>
                    </LinkRouter>
                    <RedButton><DeleteIcon /></RedButton>
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
                                                <p style={{ paddingTop: "3px" }}>T-shirt  bleu clair, pantalon Blanc</p>
                                            </div>
                                            <div>
                                                <DirectionsBusIcon style={{ float: "left", marginRight: "10px" }} />
                                                <p style={{ paddingTop: "3px" }}>{row.transportMode}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right" style={{ verticalAlign: "top" }}>
                                            <div>
                                                <LocationOnIcon style={{ float: "left", marginRight: "10px" }} />
                                                <p style={{ paddingTop: "3px" }}>Lieu de rendez-vous : </p>
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
                        <Box style={{ marginBottom: "10px", float: "right" }}>
                            <GreenButton variant="contained" style={{ display: "inline", marginRight: "10px", width: "200px" }}>
                                <>
                                    <SendIcon style={{ float: "left" }} />
                                    <p style={{ margin: "0px" }}>MESSAGE ({nbSenders})</p>
                                </>
                            </GreenButton>
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
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

class EventTabGestion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            isLoading: true
        }
    }

    componentDidMount() {
        getEventsGeneralInfos().then((res) => {
            this.setState({ events: res.events }, () => {
                this.setState({ isLoading: false })
            })
        });
    }

    render() {
        return (
            !this.state.isLoading ? (
                this.state.events.length > 0 ? (
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
                                {this.state.events.map((row) => (
                                    <Row key={row.id} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <p>Il n'y a aucun évènement actuellement. Créez-en un maintenant !</p>
                )
            ) : ""
        );
    }
};

export default EventTabGestion;