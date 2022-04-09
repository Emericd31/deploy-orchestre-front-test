import React from "react";
import { IconButton, Collapse } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getMyRights } from "../../../GraphQL/queries/UserQueries";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import { isAdmin, hasRight } from "../../../Helpers/RightsGestion";

class AdministrationTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopupEdit: false,
            open: false,
            rights: "",
            loading: true
        }
    }

    componentDidMount() {
        getMyRights().then((res) => {
            this.setState({ rights: res.myRights }, () => {
                this.setState({ loading: false });
            });
        })
    }

    handleEditClick() {
        this.setState({ openPopupEdit: true }, () => {
            this.props.functionCallback(true);
        });
    }

    render() {
        return (
            !this.state.loading ? (
                isAdmin(this.state.rights) ? (
                    <div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                        <div style={{ display: "flex" }}>
                            <p style={{ marginLeft: "20px" }}>Administration</p>
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
                            <div style={{ marginBottom: "20px", marginLeft: "20px" }}>
                                <div style={{ marginBottom: "10px" }}>
                                    <ManageAccountsOutlinedIcon style={{ marginRight: "15px", fontSize: "25px", position: "relative", top: "5px", left: "5px" }} />
                                    <Chip avatar={<DoneIcon />} label="Membres du bureau" style={{ marginRight: "10px" }} />
                                    <Chip avatar={<DoneIcon />} label="Membres du conseil d'administration" style={{ marginRight: "10px" }} />
                                    <Chip avatar={<DoneIcon />} label="Membres actifs" style={{ marginRight: "10px" }} />
                                </div>
                                <div>
                                    <LockOpenIcon style={{ marginRight: "15px", fontSize: "25px", position: "relative", top: "5px", left: "5px" }} />
                                    {
                                        hasRight("manage_events") ? (
                                            <Chip avatar={<DoneIcon />} label="Gestion des évènements" style={{ marginRight: "10px" }} />
                                        ) : ""
                                    }
                                    {
                                        hasRight("manage_members") ? (
                                            <Chip avatar={<DoneIcon />} label="Gestion des membres" style={{ marginRight: "10px" }} />
                                        ) : ""
                                    }
                                    {
                                        hasRight("manage_sinisters") ? (
                                            <Chip avatar={<DoneIcon />} label="Gestion des sinistres" style={{ marginRight: "10px" }} />
                                        ) : ""
                                    }
                                    {
                                        hasRight("manage_partitions") ? (
                                            <Chip avatar={<DoneIcon />} label="Gestion des partitions" style={{ marginRight: "10px" }} />
                                        ) : ""
                                    }
                                </div>
                            </div>
                        </Collapse>
                    </div>
                ) : ""
            ) : ""
        );
    }
}

export default AdministrationTab; 