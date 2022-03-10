import React from "react";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import { Collapse } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import { TableHead } from "@mui/material";
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

const GreenButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#00AF06",
    boxShadow: "1px 2px #BFBFBF60",
    '&:hover': {
        backgroundColor: "#009205",
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

function createData(id, checked, nom, instrument, responseDate, button) {
    return {
        id,
        checked,
        nom,
        instrument,
        responseDate,
        button
    };
}

const rows = [
    createData(0, true, "DARROMAN Maxime", "Saxophone Alto", "Samedi 15 janvier 2022 - 10h05", <GreenButton><PersonAddOutlinedIcon /></GreenButton>),
    createData(1, true, "LAFFORGUE Karine", "Euphonium", "Jeudi 13 janvier 2022 - 9h35", <GreenButton><PersonAddOutlinedIcon /></GreenButton>),
    createData(2, true, "BLESZ Vincent", "Trompette Sib", "Jeudi 13 janvier 2022 - 9h35", <GreenButton><PersonAddOutlinedIcon /></GreenButton>),
    createData(3, true, "DANFLOUS Vanessa", "Saxophone Alto", "Jeudi 13 janvier 2022 - 9h35", <GreenButton><PersonAddOutlinedIcon /></GreenButton>),
    createData(4, true, "LAFFONT Martine", "Saxophone Alto", "Jeudi 13 janvier 2022 - 9h35", <GreenButton><PersonAddOutlinedIcon /></GreenButton>),
    createData(5, true, "HEIMEL Titouan", "Soubassophone", "Jeudi 13 janvier 2022 - 9h35", <GreenButton><PersonAddOutlinedIcon /></GreenButton>),
];

class Presences extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            allChecked: true,
            persons: rows
        };
    }

    changeCheck(field, input) {
        this.setState({
            [field]: input,
        });
        var newPersons = this.state.persons; 
        newPersons.map((person) => {
            person.checked = input; 
        }); 
        this.setState({ persons: newPersons }); 
    }

    changeCheckPerson(index) {
        var newPersons = this.state.persons; 
        newPersons[index].checked = !newPersons[index].checked; 
        this.setState({ persons: newPersons }); 
    }

    render() {
        return (
            <div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                <div style={{ display: "flex" }}>
                    <p style={{ marginLeft: "20px" }}>Présences</p>
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
                    <Box style={{ paddingTop: "10px", marginLeft: "20px", marginBottom: "20px" }}>
                        <Button variant="contained" style={{ display: "inline", marginRight: "10px", width: "200px" }}>
                            <>
                                <PersonAddOutlinedIcon style={{ float: "left" }} />
                                <p style={{ margin: "0px" }}>PRESENTS : 21</p>
                            </>
                        </Button>
                        <GrayButton variant="contained" style={{ display: "inline", marginRight: "10px", width: "200px" }}>
                            <>
                                <PersonRemoveOutlinedIcon style={{ float: "left" }} />
                                <p style={{ margin: "0px" }}>ABSENTS : 11</p>
                            </>
                        </GrayButton>
                        <GrayButton variant="contained" style={{ display: "inline", width: "220px", marginRight: "20px" }}>
                            <>
                                <ManageAccountsOutlinedIcon style={{ float: "left" }} />
                                <p style={{ margin: "0px" }}>A RENSEIGNER : 10</p>
                            </>
                        </GrayButton>
                        <div style={{ display: "inline" }}>
                            <HowToRegOutlinedIcon style={{ marginRight: "10px", display: "inline", position: "relative", top: "8px" }} />
                            <p style={{ display: "inline", position: "relative", top: "3px" }}>Date limite d'inscription : 01 janvier 2021</p>
                        </div>
                    </Box>
                    <Table aria-label="collapsible table" sx={{
                        [`& .${tableCellClasses.root}`]: {
                            borderBottom: "2px solid #DFDFDF",
                            paddingTop: "5px",
                            paddingBottom: "5px"
                        }
                    }}>
                        <TableHead>
                            <TableRow style={{ backgroundColor: "#1D70B7" }}>
                                <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "5%" }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.allChecked}
                                                value={this.state.allChecked}
                                                onChange={(event, errorState) =>
                                                    this.changeCheck(
                                                        "allChecked", !this.state.allChecked
                                                    )
                                                }
                                                style={{ color: "white" }}
                                                name="AllChecked"
                                            />
                                        }
                                        label=""
                                    />
                                </TableCell>
                                <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "25%" }}>NOM Prénom</TableCell>
                                <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "25%" }}>Instrument</TableCell>
                                <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "35%" }}>Date de réponse</TableCell>
                                <TableCell align="right" style={{ color: "white", fontWeight: "bold", width: "10%" }}>
                                    <GreenButton style={{ width: "100%" }}>
                                        <SendOutlinedIcon />
                                    </GreenButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.persons.map((row) => {
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" align="left">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={row.checked}
                                                            value={row.checked}
                                                            onChange={(event, errorState) =>
                                                                this.changeCheckPerson(
                                                                    row.id
                                                                )
                                                            }
                                                            color="primary"
                                                            name="checked"
                                                        />
                                                    }
                                                    label=""
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <p style={{ paddingTop: "3px", margin: "0px" }}>{row.nom}</p>
                                            </TableCell>
                                            <TableCell align="left">
                                                <p style={{ paddingTop: "3px", margin: "0px" }}>{row.instrument}</p>
                                            </TableCell>
                                            <TableCell align="left">
                                                <p style={{ paddingTop: "3px", margin: "0px" }}>{row.responseDate}</p>
                                            </TableCell>
                                            <TableCell align="right">
                                                <p style={{ paddingTop: "3px", margin: "0px" }}>{row.button}</p>
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

export default Presences; 