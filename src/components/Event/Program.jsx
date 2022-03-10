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
import { Box } from "@mui/material";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { TableHead } from "@mui/material";
import PlaylistPlayOutlinedIcon from '@mui/icons-material/PlaylistPlayOutlined';
import CommuteOutlinedIcon from '@mui/icons-material/CommuteOutlined';
import WhereToVoteOutlinedIcon from '@mui/icons-material/WhereToVoteOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';

const GreenButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#00AF06",
    '&:hover': {
        backgroundColor: "#009205",
    },
}));

function createData(id, titre, compositeur, arrangeur, instrument, partie) {
    return {
        id,
        titre,
        compositeur,
        arrangeur, 
        instrument, 
        partie
    };
}

const rows = [
    createData(1, 'Ouverture 1812', "Piort Illitch Tchaikovsky", "E. A. Borda", "Saxophone Alto", 1),
    createData(2, 'Lebuinus Ex Daventria', "Peter Kleine Shaars", "", "Saxophone Alto", 2),
    createData(3, 'Waltz no.2', "Dmitri Shostakovich", "Johan de Meil", "Saxophone Alto", 1),
];

class Program extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        return (
            <div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                <div style={{ display: "flex" }}>
                    <p style={{ marginLeft: "20px" }}>Programme - Logistique</p>
                    <div style={{ margin: "auto 10px auto auto" }}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => this.setState({ open: !this.state.open })}
                        >
                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                        {
                            this.props.admin ?
                                (
                                    <GreenButton ><EditIcon /></GreenButton>
                                ) : ""
                        }
                    </div>
                </div>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 0 }}>
                        <Table size="" aria-label="purchases" sx={{
                            [`& .${tableCellClasses.root}`]: {
                                borderBottom: "none"
                            }
                        }}>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left" style={{ width: "30%" }}>
                                        <div>
                                            <CheckroomIcon style={{ float: "left", marginRight: "10px" }} />
                                            <p style={{ paddingTop: "3px" }}>T-shirt  bleu clair, Pantalon Blanc</p>
                                        </div>
                                        <div>
                                            <CommuteOutlinedIcon style={{ float: "left", marginRight: "10px" }} />
                                            <p style={{ paddingTop: "3px" }}>Autocar</p>
                                        </div>
                                    </TableCell>
                                    <TableCell align="left" style={{ width: "30%" }}>
                                        <WhereToVoteOutlinedIcon style={{ float: "left", marginTop: "20px" }} />
                                        <p style={{ paddingTop: "3px", paddingLeft: "50px" }}>Domaine de Beaulieu
                                            <br />01 Domaine de Beaulieu
                                            <br />32000 Auch</p>
                                    </TableCell>
                                    <TableCell align="left" style={{ verticalAlign: "top", width: "30%" }}>
                                        <div>
                                            <EventAvailableOutlinedIcon style={{ float: "left", marginRight: "10px" }} />
                                            <p style={{ paddingTop: "3px" }}>19 juin 2021 - 13h30</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                    <div style={{ marginLeft: "20px" }}>
                        <PlaylistPlayOutlinedIcon style={{ float: "left", marginRight: "10px" }} />
                        <p style={{ paddingTop: "3px" }}>Programme (Date limite de consultation : 17 janvier 2022)</p>
                    </div>
                    <Table aria-label="collapsible table" sx={{
                        [`& .${tableCellClasses.root}`]: {
                            borderBottom: "2px solid #DFDFDF"
                        }
                    }}>
                        <TableHead>
                            <TableRow style={{ backgroundColor: "#1D70B7" }}>
                                <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "25%" }}>Titre</TableCell>
                                <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "25%" }}>Compositeur</TableCell>
                                <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "20%" }}>Arrangeur</TableCell>
                                <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "20%" }}>Instrument</TableCell>
                                <TableCell align="left" style={{ color: "white", fontWeight: "bold", width: "10%" }}>Partie</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((row) => {
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" align="left">
                                                <p style={{ paddingLeft: "10px", margin: "0px" }}>{row.titre}</p>
                                            </TableCell>
                                            <TableCell align="left">
                                                <p style={{ paddingTop: "3px", margin: "0px" }}>{row.compositeur}</p>
                                            </TableCell>
                                            <TableCell align="left">
                                                <p style={{ paddingTop: "3px", margin: "0px" }}>{row.arrangeur}</p>
                                            </TableCell>
                                            <TableCell align="left">
                                                <p style={{ paddingTop: "3px", margin: "0px" }}>{row.instrument}</p>
                                            </TableCell>
                                            <TableCell align="left">
                                                <p style={{ paddingTop: "3px", margin: "0px" }}>{row.partie}</p>
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

export default Program; 