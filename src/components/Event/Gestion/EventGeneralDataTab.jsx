import React from "react";
import { IconButton, Collapse, Paper } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ModifyGeneralDataForm from "../forms/ModifyGeneralDataForm";

class EventGeneralDataTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventTypes: props.eventTypes,
            eventType: props.event.eventType,
            isLoading: true,
            open: false
        }
    }

    componentDidMount() {
        if (!this.state.eventTypes.find((eventType) => eventType.value == this.state.eventType)) {
            this.setState({
                eventType: "Autres",
                isLoading: false
            })
        } else {
            this.setState({
                isLoading: false
            })
        }
    }

    render() {
        return (
            !this.state.isLoading ? (
                <div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                    <Paper elevation={3}>
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
                            </div>
                        </div>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                                <ModifyGeneralDataForm
                                    event={this.props.event}
                                    musicalFormations={this.props.musicalFormations}
                                    eventTypes={this.state.eventTypes}
                                    eventType={this.state.eventType}
                                    functionCallback={(event) => this.props.functionCallback(event)}
                                />
                            </div>
                        </Collapse>
                    </Paper>
                </div>
            ) : ""
        )
    }
}

export default EventGeneralDataTab