import React from "react";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Grid, IconButton } from "@mui/material";
import { Collapse } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import SplitButton from '../../components/General/TextFields/SplitButton'
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';

const GreenButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#00AF06",
    '&:hover': {
        backgroundColor: "#009205",
    },
}));

class GeneralData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventId: props.eventId,
            open: true
        };
    }

    render() {
        return (
            <div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                <div style={{ display: "flex" }}>
                    <p style={{ marginLeft: "20px" }}>Informations générales</p>
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
                    <Grid container direction="row" style={{ paddingLeft: "20px", marginTop: "20px", marginBottom: "20px" }}>
                        {/* First line */}
                        {
                            this.props.admin ?
                                (
                                    <>
                                        <Grid item lg={5} md={6} xs={12}>
                                            <InsertInvitationIcon style={{ float: "left", marginRight: "10px" }} />
                                            <p style={{ marginTop: "2px", marginBottom: "15px" }}>
                                                19 juin 2021 à 13h30 - 20 juin 2021 à 11h30
                                            </p>
                                        </Grid>
                                        <Grid item lg={4} md={6} xs={12}>
                                            <PhoneOutlinedIcon style={{ float: "left", marginRight: "10px" }} />
                                            <p style={{ marginTop: "2px", marginBottom: "15px" }}>
                                                05 53 16 96 55
                                            </p>
                                        </Grid>
                                        <Grid item lg={3} md={6} xs={12}>
                                            <GroupsOutlinedIcon style={{ float: "left", marginRight: "10px" }} />
                                            <p style={{ marginTop: "2px", marginBottom: "15px" }}>
                                                Banda Los Pagayos
                                            </p>
                                        </Grid>
                                    </>
                                ) :
                                (
                                    <>
                                        <Grid item lg={5} md={6} xs={12}>
                                            <InsertInvitationIcon style={{ float: "left", marginRight: "10px" }} />
                                            <p style={{ marginTop: "2px", marginBottom: "15px" }}>
                                                19 juin 2021 à 13h30 - 20 juin 2021 à 11h30
                                            </p>
                                        </Grid>
                                        <Grid item lg={5} md={6} xs={12}>
                                            <HowToRegOutlinedIcon style={{ float: "left", marginRight: "10px" }} />
                                            <p style={{ marginTop: "2px", marginBottom: "15px" }}>
                                                Date limite d'inscription : 01 janvier 2021
                                            </p>
                                        </Grid>
                                        <Grid item lg={2} md={6} xs={12}>
                                            <SplitButton eventId={this.state.eventId}></SplitButton>
                                        </Grid>
                                    </>
                                )
                        }

                        {/* Second line */}
                        {
                            this.props.admin ?
                                (
                                    <>
                                        <Grid item lg={5} md={6} xs={12}>
                                            <div style={{ float: "left", marginRight: "10px", height: "100%" }}>
                                                <LocationOnIcon />
                                            </div>
                                            <p style={{ marginTop: "2px" }}>
                                                Domaine de Beaulieu
                                                <br />01 Domaine de Beaulieu
                                                <br />32000 AUCH
                                            </p>
                                        </Grid>
                                        <Grid item lg={4} md={6} xs={12}>
                                            <PhoneIphoneIcon style={{ float: "left", marginRight: "10px" }} />
                                            <p style={{ marginTop: "2px" }}>
                                                06 34 93 68 71
                                            </p>
                                            <MailOutlineIcon style={{ float: "left", marginRight: "10px" }} />
                                            <p style={{ marginTop: "2px" }}>
                                                06 34 93 68 71
                                            </p>
                                        </Grid>
                                        <Grid item lg={3} md={6} xs={12}>
                                            <EventNoteOutlinedIcon style={{ float: "left", marginRight: "10px" }} />
                                            <p style={{ marginTop: "2px" }}>
                                                Evènement privé
                                            </p>
                                        </Grid>
                                    </>
                                ) : ""
                        }
                    </Grid>
                </Collapse>
            </div>
        );
    }
}

export default GeneralData; 