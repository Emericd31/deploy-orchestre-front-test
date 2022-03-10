import React from "react";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import { Collapse } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';

const GreenButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#00AF06",
    '&:hover': {
        backgroundColor: "#009205",
    },
}));

function createData(id, lastname, firstname, fonction, mail, mobile) {
    return {
        id,
        lastname,
        firstname,
        fonction,
        mail,
        mobile
    };
}

const rows = [
    createData(1, 'DARROMAN', "Maxime", "Président comité des fêtes", "maxime.darroman@gmail.com", "06 34 95 30 98"),
    createData(2, 'BLESZ', "Vincent", "Responsable évènements", "vincent.blesz@fleurance32.fr", "06 34 95 30 98")
];

class ClientContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                <div style={{ display: "flex" }}>
                    <p style={{ marginLeft: "20px" }}>Contacts clients</p>
                    <div style={{ margin: "auto 10px auto auto" }}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => this.setState({ open: !this.state.open })}
                        >
                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                        <GreenButton ><EditIcon /></GreenButton>
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
                                <TableCell align="left" style={{ fontWeight: "bold" }}>Fonction</TableCell>
                                <TableCell align="left" style={{ fontWeight: "bold" }}>Adresse mail</TableCell>
                                <TableCell align="left" style={{ fontWeight: "bold" }}>Téléphone mobile</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((row) => {
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" align="left">
                                                <p style={{ paddingLeft: "10px", margin: "0px" }}>{row.lastname}</p>
                                            </TableCell>
                                            <TableCell align="left">
                                                <p style={{ paddingTop: "3px", margin: "0px" }}>{row.firstname}</p>
                                            </TableCell>
                                            <TableCell align="left">
                                                <p style={{ paddingTop: "3px", margin: "0px" }}>{row.fonction}</p>
                                            </TableCell>
                                            <TableCell align="left">
                                                <p style={{ paddingTop: "3px", margin: "0px" }}>{row.mail}</p>
                                            </TableCell>
                                            <TableCell align="left">
                                                <p style={{ paddingTop: "3px", margin: "0px" }}>{row.mobile}</p>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </Collapse>
            </div>
        );
    }
}

export default ClientContact;