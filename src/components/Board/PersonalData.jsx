import React from "react";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import { Grid, IconButton, Collapse } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from '@mui/icons-material/Edit';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Popup from "../General/Popups/Popup";
import { getPersonalData } from '../../GraphQL/queries/UserQueries';
import { getDayNumbersMonthLettersYearNumbers } from '../../Helpers/DateGestion';

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
            openPopupEdit: false,
            open: true,
            loading: true,
            user: ""
        };
    }

    componentDidMount = () => {
        getPersonalData().then((res) => {
            this.setState({ user: res.currentUser }, () => {
                this.setState({ loading: false });
            });
        })
    };

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
                        <p style={{ marginLeft: "20px" }}>Informations personnelles</p>
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
                        <Grid container direction="row" style={{ paddingLeft: "20px", marginTop: "20px" }}>
                            {/* First line */}
                            <Grid item lg={4} md={6} xs={12}>
                                <BadgeOutlinedIcon style={{ float: "left", marginRight: "10px" }} />
                                <p style={{ marginTop: "2px", marginBottom: "15px" }}>
                                    {this.state.user.firstName + " " + this.state.user.lastName}
                                </p>
                            </Grid>
                            <Grid item lg={4} md={6} xs={12}>
                                <PhoneOutlinedIcon style={{ float: "left", marginRight: "10px" }} />
                                <p style={{ marginTop: "2px", marginBottom: "15px" }}>
                                    {[this.state.user.phoneNumber.slice(0, 2), this.state.user.phoneNumber.slice(2, 4), this.state.user.phoneNumber.slice(4, 6), this.state.user.phoneNumber.slice(6, 8), this.state.user.phoneNumber.slice(8, 10)].join(' ')}
                                </p>
                            </Grid>
                            <Grid item lg={4} md={6} xs={12}>
                                <InsertInvitationIcon style={{ float: "left", marginRight: "10px" }} />
                                <p style={{ marginTop: "2px", marginBottom: "15px" }}>
                                    {getDayNumbersMonthLettersYearNumbers(this.state.user.birthday)}
                                </p>
                            </Grid>

                            {/* Second line */}
                            <Grid item lg={4} md={6} xs={12}>
                                <div style={{ float: "left", marginRight: "10px", height: "100%" }}>
                                    <LocationOnIcon />
                                </div>
                                <p style={{ marginTop: "2px" }}>
                                    {this.state.user.address + " " + this.state.user.addressComplement}
                                    <br />{this.state.user.postalCode + " " + this.state.user.city}
                                </p>
                            </Grid>
                            <Grid item lg={4} md={6} xs={12}>
                                <PhoneIphoneIcon style={{ float: "left", marginRight: "10px" }} />
                                <p style={{ marginTop: "2px" }}>
                                    {[this.state.user.mobileNumber.slice(0, 2), this.state.user.mobileNumber.slice(2, 4), this.state.user.mobileNumber.slice(4, 6), this.state.user.mobileNumber.slice(6, 8), this.state.user.mobileNumber.slice(8, 10)].join(' ')}
                                </p>
                            </Grid>
                            <Grid item lg={4} md={6} xs={12}>
                                <MailOutlineIcon style={{ float: "left", marginRight: "10px" }} />
                                <p style={{ marginTop: "2px" }}>
                                    {this.state.user.email}
                                </p>
                            </Grid>
                        </Grid>
                    </Collapse>

                    <Popup
                        title="Informations personnelles"
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

export default GeneralData; 