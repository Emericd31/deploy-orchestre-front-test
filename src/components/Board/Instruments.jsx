import React from "react";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Popup from "../General/Popups/Popup";
import { IconButton, Collapse } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getInstrumentsByUser } from "../../GraphQL/queries/InstrumentQueries";

const GreenButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#00AF06",
    '&:hover': {
        backgroundColor: "#009205",
    },
}));

function createData(id, type, marque, modele, serie, formation) {
    return {
        id,
        type,
        marque,
        modele,
        serie,
        formation
    };
}

const rows = [
    createData(1, 'Clarinette', "SELMER", "E-418", "S-48001", "Harmonie La Fleurantine"),
    createData(2, 'Saxophone Alto', "YAMAHA", "YAS-280", "Y-201 334", "Banda Los Pagayos")
];

class Instruments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopupEdit: false,
            open: false,
            loading: true,
            instruments: ""
        }
    }

    componentDidMount() {
        getInstrumentsByUser().then((res) => {
            this.setState({ instruments: res.instrumentsByUser }, () => {
                this.setState({ loading: false });
            })
        })
    }

    handleEditClick() {
        this.setState({ openPopupEdit: true }, () => {
            this.props.functionCallback(true);
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
                        <Table size="" aria-label="purchases" sx={{
                            [`& .${tableCellClasses.root}`]: {
                                borderBottom: "2px solid #DFDFDF"
                            }
                        }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" style={{ fontWeight: "bold", paddingLeft: "30px" }}>Type d'instrument</TableCell>
                                    <TableCell align="left" style={{ fontWeight: "bold" }}>Marque</TableCell>
                                    <TableCell align="left" style={{ fontWeight: "bold" }}>Modèle</TableCell>
                                    <TableCell align="left" style={{ fontWeight: "bold" }}>N° de série</TableCell>
                                    <TableCell align="left" style={{ fontWeight: "bold" }}>Formation associée</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.instruments.map((instrument) => {
                                        return (
                                            <TableRow key={instrument.id}>
                                                <TableCell component="th" align="left">
                                                    <p style={{ paddingLeft: "10px", margin: "0px" }}>{instrument.type.type}</p>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <p style={{ paddingTop: "3px", margin: "0px" }}>{instrument.marque}</p>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <p style={{ paddingTop: "3px", margin: "0px" }}>{instrument.model}</p>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <p style={{ paddingTop: "3px", margin: "0px" }}>{instrument.serialNumber}</p>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <p style={{ paddingTop: "3px", margin: "0px" }}>{instrument.musicalFormation}</p>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
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
                        </div>
                    </Popup>
                </div>) : ""
        );
    }
}

export default Instruments;