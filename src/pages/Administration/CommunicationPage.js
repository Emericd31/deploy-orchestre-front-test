import React from "react";
import BriefedTextField from "../../components/General/TextFields/BriefedTextField";
import { Checkbox, FormControlLabel, TextField, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import { getMusicalFormations } from "../../GraphQL/queries/EventQueries";
import { getEventNames } from "../../GraphQL/queries/EventQueries";
import { getUsers } from "../../GraphQL/queries/UserQueries";
import SendIcon from '@mui/icons-material/SendOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Autocomplete } from "@mui/material";
import "../../App.css";
import "../../styles/communication.css";
import { GreenButton } from "../../components/General/StyledComponents/StyledComponents";

class CommunicationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            musicalFormations: [],
            events: [],
            users: [], 
            musicalFormation: "",
            event: "",
            presences: [
                {
                    id: 0,
                    value: "Présent"
                },
                {
                    id: 1,
                    value: "Absent"
                },
                {
                    id: 2,
                    value: "Non renseigné"
                }
            ],
            presence: "",
            checkNotification: false,
            checkEmail: false,
            checkActualites: false,
            checkButton: false
        }
    }

    updateField(field, input, errorState) {
        this.setState({
            [field]: input,
        }, () => {
            // this.checkRequiredFields();
        });
    }

    updateSelect(field, input) {
        this.setState({
            [field]: input,
        }, () => {
            // this.checkRequiredFields();
        });
    }

    changeCheck(field, input) {
        this.setState({
            [field]: input,
        });
    }

    componentDidMount() {
        getEventNames().then((res) => {
            this.setState({ events: res.eventNames.resultat });
        })

        getMusicalFormations().then((res) => {
            this.setState({ musicalFormations: res.musicalFormations });
        });

        getUsers().then((res) => {
            this.setState({ users: res.users });
        })
    }

    render() {
        return (
            (this.state.musicalFormations.length !== 0 &&
                this.state.events.length !== 0 &&
                this.state.users.length !== 0) ? (
                <div className="body">
                    <h1 style={{ fontWeight: "bold", fontSize: "18px", marginLeft: "20px", marginBottom: "20px" }}>Envoyer un message</h1>
                    <div className="messageBox">
                        <div className="line-1">
                            <div className="item-1"><h2>Destinataires</h2></div>
                            <div className="item-2">
                                <FormControl fullWidth size="small">
                                    <InputLabel id="musical_formation_label">
                                        Par formation musicale
                                    </InputLabel>
                                    <Select
                                        id="type"
                                        labelId="musical_formation_label"
                                        label="Par formation musicale"
                                        value={this.state.musicalFormation}
                                        onChange={(event) =>
                                            this.updateSelect("musicalFormation", event.target.value)
                                        }
                                    >
                                        {this.state.musicalFormations.map((musicalFormation) => (
                                            <MenuItem key={musicalFormation.id} value={musicalFormation.id}>
                                                {musicalFormation.value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="item-3">
                                <FormControl fullWidth size="small">
                                    <InputLabel id="event_label">
                                        Par évènement
                                    </InputLabel>
                                    <Select
                                        id="type"
                                        labelId="event_label"
                                        label="Par évènement"
                                        value={this.state.event}
                                        onChange={(event) =>
                                            this.updateSelect("event", event.target.value)
                                        }
                                    >
                                        {this.state.events.map((event, index) => (
                                            <MenuItem key={event.item1} value={event.item2}>
                                                {event.item2}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="item-4">
                                <FormControl fullWidth size="small">
                                    <InputLabel id="presence_label">
                                        Par présence
                                    </InputLabel>
                                    <Select
                                        id="type"
                                        labelId="presence_label"
                                        label="Par présence"
                                        value={this.state.presence}
                                        onChange={(event) =>
                                            this.updateSelect("presence", event.target.value)
                                        }
                                    >
                                        {this.state.presences.map((presence) => (
                                            <MenuItem key={presence.id} value={presence.id}>
                                                {presence.value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="line-2">
                            <div className="item-1">
                                <Autocomplete
                                    multiple
                                    id="checkboxes-tags-demo"
                                    options={this.state.users}
                                    size="small"
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.firstName + " " + option.lastName}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props} 
                                        key={option.id}>
                                            <Checkbox
                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.firstName + " " + option.lastName}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Destinataires" placeholder="" />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="line-3">
                            <div className="item-1">
                                <h2>Diffusion</h2>
                            </div>
                            <div className="item-2">
                                <FormControlLabel
                                    style={{ float: "left" }}
                                    control={
                                        <Checkbox
                                            checked={this.state.checkActualites}
                                            onChange={() =>
                                                this.changeCheck(
                                                    "checkActualites",
                                                    !this.state.checkActualites
                                                )
                                            }
                                            name="checkedA"
                                            color="primary"
                                        />
                                    }
                                    label="Actualités"
                                />
                            </div>
                            <div className="item-3">
                                <FormControlLabel
                                    style={{ float: "left" }}
                                    control={
                                        <Checkbox
                                            checked={this.state.checkNotification}
                                            onChange={() =>
                                                this.changeCheck(
                                                    "checkNotification",
                                                    !this.state.checkNotification
                                                )
                                            }
                                            name="checkedA"
                                            color="primary"
                                        />
                                    }
                                    label="Notification"
                                /></div>
                            <div className="item-4">
                                <FormControlLabel
                                    style={{ float: "left" }}
                                    control={
                                        <Checkbox
                                            checked={this.state.checkEmail}
                                            onChange={() =>
                                                this.changeCheck(
                                                    "checkEmail",
                                                    !this.state.checkEmail
                                                )
                                            }
                                            name="checkedA"
                                            color="primary"
                                        />
                                    }
                                    label="E-mail"
                                /></div>
                        </div>
                        <div className="line-4">
                            <div className="item-1">
                                <h2>Titre</h2>
                            </div>
                            <div className="item-2">
                                <BriefedTextField
                                    id={"intitule-field"}
                                    label="Titre du message"
                                    type="text"
                                    name="text"
                                    value={this.state.intitule}
                                    saveField={(input, errorState) =>
                                        this.updateField("intitule", input, errorState)
                                    }
                                />
                            </div>
                        </div>
                        <div className="line-5">
                            <div className="item-1"><h2>Message</h2></div>
                            <div className="item-2">
                                <TextField
                                    style={{ width: "100%", height: "250px" }}
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={9}
                                    variant="outlined"
                                    placeholder="Contenu du message..."
                                    value={this.state.diffusionPublicDescription}
                                    onChange={(event, errorState) =>
                                        this.updateField(
                                            "diffusionPublicDescription",
                                            event.target.value,
                                            errorState
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="line-6">
                            <div className="item-1">
                                <FormControlLabel
                                    style={{ float: "left" }}
                                    control={
                                        <Checkbox
                                            checked={this.state.checkButton}
                                            onChange={() =>
                                                this.changeCheck(
                                                    "checkButton",
                                                    !this.state.checkButton
                                                )
                                            }
                                            name="checkedA"
                                            color="primary"
                                        />
                                    }
                                    label="Bouton"
                                />
                            </div>
                            <div className="item-2">
                                <BriefedTextField
                                    id={"intitule-field"}
                                    label="Texte"
                                    type="text"
                                    name="text"
                                    disabled={!this.state.checkButton}
                                    value={this.state.intitule}
                                    saveField={(input, errorState) =>
                                        this.updateField("intitule", input, errorState)
                                    }
                                />
                            </div>
                            <div className="item-3">
                                <LinkIcon style={{ float: "right", marginTop: "9px", marginRight: "20px" }} />
                            </div>
                            <div className="item-4">
                                <BriefedTextField
                                    id={"intitule-field"}
                                    label="Lien"
                                    type="text"
                                    name="text"
                                    disabled={!this.state.checkButton}
                                    value={this.state.intitule}
                                    saveField={(input, errorState) =>
                                        this.updateField("intitule", input, errorState)
                                    }
                                />
                            </div>
                            <div className="item-5">
                                <GreenButton variant="contained" style={{ display: "inline", marginRight: "10px", width: "100%", height: "100%" }}>
                                    <>
                                        <SendIcon style={{ float: "left" }} />
                                        <p style={{ margin: "0px" }}>Envoyer</p>
                                    </>
                                </GreenButton>
                            </div>
                        </div>
                    </div>
                    <h1 style={{ fontWeight: "bold", fontSize: "18px", marginLeft: "20px", marginBottom: "20px" }}>Messages envoyés</h1>
                </div>
            ) : ""
        )
    }
}

export default CommunicationPage; 