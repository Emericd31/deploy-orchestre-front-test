import React from "react";
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
import Popup from "../../General/Popups/Popup";
import { getPersonalData } from '../../../GraphQL/queries/UserQueries';
import { getDayNumbersMonthLettersYearNumbers } from '../../../Helpers/DateGestion';
import { GreenButton } from "../../General/StyledComponents/StyledButtons";
import PersonalDataForm from "../forms/PersonalDataForm";

class GeneralDataTab extends React.Component {
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

    createPersonalData() {
        return {
            firstname: this.state.user.firstName,
            lastname: this.state.user.lastName,
            birthday: this.state.user.birthday,
            birthplace: this.state.user.birthPlace,
            address: this.state.user.address,
            addressComplement: this.state.user.addressComplement,
            postalCode: this.state.user.postalCode,
            city: this.state.user.city,
            phoneNumber: this.state.user.phoneNumber,
            mobileNumber: this.state.user.mobileNumber
        }
    }

    updatePersonalData(user) {
        this.setState(prevState => ({
            user: {                   // object that we want to update
                ...prevState.user,    // keep all other key-value pairs
                firstName: user.firstname,
                lastName: user.lastname,
                birthday: user.birthday,
                birthPlace: user.birthplace,
                address: user.address,
                addressComplement: user.addressComplement,
                postalCode: user.postalCode,
                city: user.city,
                phoneNumber: user.phoneNumber,
                mobileNumber: user.mobileNumber      // update the value of specific key
            }, 
            openPopupEdit: false
        }))
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
                                    {this.state.user.phoneNumber !== "" ? ([this.state.user.phoneNumber.slice(0, 2), this.state.user.phoneNumber.slice(2, 4), this.state.user.phoneNumber.slice(4, 6), this.state.user.phoneNumber.slice(6, 8), this.state.user.phoneNumber.slice(8, 10)].join(' ')) : ("non renseigné")}
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
                                    {this.state.user.mobileNumber !== "" ? ([this.state.user.mobileNumber.slice(0, 2), this.state.user.mobileNumber.slice(2, 4), this.state.user.mobileNumber.slice(4, 6), this.state.user.mobileNumber.slice(6, 8), this.state.user.mobileNumber.slice(8, 10)].join(' ')) : ("non renseigné")}
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
                        <div>
                            <PersonalDataForm functionCallback={(user) => {
                                this.updatePersonalData(user);
                                this.props.functionCallback(false);
                            }}
                                user={this.createPersonalData()} />
                        </div>
                    </Popup>
                </div>) : ""
        );
    }
}

export default GeneralDataTab; 