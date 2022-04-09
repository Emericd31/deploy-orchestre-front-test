import React from "react";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import Popup from "../../General/Popups/Popup";
import { IconButton, Collapse, Grid } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getLegalGuardiansByUser } from '../../../GraphQL/queries/LegalGuardianQueries';
import LegalGuardianForm from '../forms/LegalGuardianForm';
import { PersonsInCharge } from "./PersonsInCharge";
import { GreenButton } from "../../General/StyledComponents/StyledButtons";
import { removeLegalGuardian } from "../../../GraphQL/mutations/LegalGuardianMutations";
import ConfirmPopup from "../../General/Popups/ConfirmPopup";

class LegualGardiansTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopupEdit: false,
            openPopupAdd: false,
            openPopupDeleteConfirm: false,
            openPopupModify: false,
            open: false,
            currentLegalGuardian: null,
            legalGuardians: "",
            loading: true
        }
    }

    componentDidMount = () => {
        getLegalGuardiansByUser().then((res) => {
            this.setState({ legalGuardians: res.legalGuardiansByUser }, () => {
                this.setState({ loading: false });
            })
        })
    }

    handleEditClick() {
        this.setState({ openPopupEdit: true }, () => {
            this.props.functionCallback(true);
        });
    }

    addLegalGuardian = (legalGuardian) => {
        this.setState({
            openPopupAdd: false,
            legalGuardians: [...this.state.legalGuardians, legalGuardian],
        });
    };

    modifyLegalGuardian = (legalGuardian) => {
        var currentLegalGuardians = this.state.legalGuardians;
        currentLegalGuardians.map((currentLegalGuardian) => {
            if (currentLegalGuardian.id == legalGuardian.id) {
                currentLegalGuardian.firstname = legalGuardian.firstname;
                currentLegalGuardian.lastname = legalGuardian.lastname;
                currentLegalGuardian.relationship = legalGuardian.relationship;
                currentLegalGuardian.mobileNumber = legalGuardian.mobileNumber;
                currentLegalGuardian.email = legalGuardian.email;
            }
        });
        this.setState({ legalGuardians: currentLegalGuardians, openPopupModify: false });
    }

    deleteLegalGuardian = (idLegalGuardian) => {
        removeLegalGuardian(idLegalGuardian).then((res) => {
            if (res.removeLegalGuardian.statusCode === 200) {
                this.setState({
                    legalGuardians: this.state.legalGuardians.filter(function (
                        legalGuardian
                    ) {
                        return legalGuardian.id !== idLegalGuardian;
                    }),
                    openPopupDeleteConfirm: false
                });
            }
        });
    }

    render() {
        return (
            !this.state.loading ?
                (<div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                    <div style={{ display: "flex" }}>
                        <p style={{ marginLeft: "20px" }}>Responsable(s) légal(aux)</p>
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
                        <PersonsInCharge editable={false} legalGuardians={this.state.legalGuardians} />
                    </Collapse>

                    <Popup
                        title="Responsable(s) légal(aux)"
                        length="lg"
                        openPopup={this.state.openPopupEdit}
                        parentCallback={() =>
                            this.setState({ openPopupEdit: false }, () => {
                                this.props.functionCallback(false);
                            })
                        }
                    >
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Grid container>
                                <Grid item xs={12} style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                                    <Button variant='contained' onClick={() => this.setState({ openPopupAdd: true })}>Ajouter</Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <PersonsInCharge
                                        functionEdit={(legalGuardian) =>
                                            this.setState({ currentLegalGuardian: legalGuardian, openPopupModify: true })
                                        }
                                        functionDelete={(legalGuardian) =>
                                            this.setState({ currentLegalGuardian: legalGuardian, openPopupDeleteConfirm: true })
                                        }
                                        editable={true}
                                        legalGuardians={this.state.legalGuardians}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Popup>

                    <Popup
                        title="Ajouter un responsable légal"
                        length="md"
                        openPopup={this.state.openPopupAdd}
                        parentCallback={() =>
                            this.setState({ openPopupAdd: false }, () => {
                                this.props.functionCallback(false);
                            })
                        }
                    >
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <LegalGuardianForm
                                parentCallback={(legalGuardian) =>
                                    this.addLegalGuardian(legalGuardian)
                                }></LegalGuardianForm>
                        </div>
                    </Popup >

                    <Popup
                        title="Modifier un responsable légal"
                        length="md"
                        openPopup={this.state.openPopupModify}
                        parentCallback={() =>
                            this.setState({ openPopupModify: false }, () => {
                                this.props.functionCallback(false);
                            })
                        }
                    >
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <LegalGuardianForm
                                isEditable={true}
                                legalGuardian={this.state.currentLegalGuardian}
                                parentCallback={(legalGuardian) =>
                                    this.modifyLegalGuardian(legalGuardian)
                                }></LegalGuardianForm>
                        </div>
                    </Popup>

                    <ConfirmPopup
                        title={"Supprimer un responsable légal"}
                        text={"Voulez vous vraiment supprimer " + this.state.currentLegalGuardian?.firstname + " " + this.state.currentLegalGuardian?.lastname + " de vos responsables légaux ? "}
                        openPopup={this.state.openPopupDeleteConfirm}
                        parentCallback={() => this.setState({ openPopupDeleteConfirm: false })}
                        confirmButtonId="confirm-delete-legal-guardian"
                        confirmButtonFunction={() => this.deleteLegalGuardian(this.state.currentLegalGuardian?.id)}
                        cancelButtonFunction={() => this.setState({ openPopupDeleteConfirm: false })}
                        buttonDisabled={false}
                    />
                </div >) : ""
        );
    }
}

export default LegualGardiansTab;