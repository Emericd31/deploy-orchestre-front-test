import React from "react";
import { IconButton, Collapse, Paper } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonalDataForm from "../forms/PersonalDataForm";

class ModifyGeneralDataTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    createPersonalData() {
        return {
            firstname: "Firstname", //this.state.user.firstName,
            lastname: "Lastname", //this.state.user.lastName,
            birthday: "", //this.state.user.birthday,
            birthplace: "Birthplace", //this.state.user.birthPlace,
            address: "Address", //this.state.user.address,
            addressComplement: "AddressComplement", // this.state.user.addressComplement,
            postalCode: "31000", //this.state.user.postalCode,
            city: "City", //this.state.user.city,
            phoneNumber: "0534343434", //this.state.user.phoneNumber,
            mobileNumber: "0634343434", //this.state.user.mobileNumber
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                <Paper elevation={3}>
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
                        </div>
                    </div>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <div style={{ marginLeft: "10px", marginRight: "10px", marginBottom: "20px" }}>
                            <PersonalDataForm
                                isAdmin={true}
                                user={this.createPersonalData()} />
                        </div>
                    </Collapse>
                </Paper>
            </div>
        )
    }
}

export default ModifyGeneralDataTab;