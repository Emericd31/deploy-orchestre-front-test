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
import { getLegalGuardiansByUser } from '../../GraphQL/queries/LegalGuardianQueries';

const GreenButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#00AF06",
    '&:hover': {
        backgroundColor: "#009205",
    },
}));

function createData(id, lastname, firstname, parente, mail, mobile) {
    return {
        id,
        lastname,
        firstname,
        parente,
        mail,
        mobile
    };
}

const rows = [
    createData(1, 'MOLES', "Claude", "Père", "claude.moles@live.fr", "06 34 95 30 98"),
];

class PersonInCharge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopupEdit: false,
            open: false,
            legalGuardians: "",
            loading: true
        }
    }

    componentDidMount = () => {
        getLegalGuardiansByUser().then((res) => {
            this.setState({ legalGuardians : res.legalGuardiansByUser }, () => {
                this.setState({ loading : false }); 
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
                        <p style={{ marginLeft: "20px" }}>Responsable(s) légal(aux)</p>
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
                                    <TableCell align="left" style={{ fontWeight: "bold", paddingLeft: "30px" }}>Nom</TableCell>
                                    <TableCell align="left" style={{ fontWeight: "bold" }}>Prénom</TableCell>
                                    <TableCell align="left" style={{ fontWeight: "bold" }}>Parenté</TableCell>
                                    <TableCell align="left" style={{ fontWeight: "bold" }}>Adresse mail</TableCell>
                                    <TableCell align="left" style={{ fontWeight: "bold" }}>Téléphone mobile</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.legalGuardians.map((legalGuardian) => {
                                        return (
                                            <TableRow key={legalGuardian.id}>
                                                <TableCell component="th" align="left">
                                                    <p style={{ paddingLeft: "10px", margin: "0px" }}>{legalGuardian.lastname}</p>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <p style={{ paddingTop: "3px", margin: "0px" }}>{legalGuardian.firstname}</p>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <p style={{ paddingTop: "3px", margin: "0px" }}>{legalGuardian.relationship}</p>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <p style={{ paddingTop: "3px", margin: "0px" }}>{legalGuardian.email}</p>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <p style={{ paddingTop: "3px", margin: "0px" }}>{[legalGuardian.mobileNumber.slice(0, 2), legalGuardian.mobileNumber.slice(2,4), legalGuardian.mobileNumber.slice(4, 6), legalGuardian.mobileNumber.slice(6, 8), legalGuardian.mobileNumber.slice(8, 10)].join(' ')}</p>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Collapse>

                    <Popup
                        title="Responsable(s) légal(aux)"
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

export default PersonInCharge;