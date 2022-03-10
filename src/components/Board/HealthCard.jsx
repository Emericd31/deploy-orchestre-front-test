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

const GreenButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#00AF06",
    '&:hover': {
        backgroundColor: "#009205",
    },
}));

class HealthCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopupEdit: false,
            open: false
        }
    }

    handleEditClick() {
        this.setState({ openPopupEdit: true }, () => {
            this.props.functionCallback(true);
        });
    }

    render() {
        return (
            <div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                <div style={{ display: "flex" }}>
                    <p style={{ marginLeft: "20px" }}>Fiche sanitaire</p>
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
                    <p>Mon contenu</p>
                </Collapse>
                
                <Popup
                    title="Fiche sanitaire"
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
            </div>
        );
    }
}

export default HealthCard;