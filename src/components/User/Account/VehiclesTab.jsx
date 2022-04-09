import React from "react";
import Popup from "../../General/Popups/Popup";
import { IconButton, Collapse, Grid, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { GreenButton } from "../../General/StyledComponents/StyledButtons";
import "../../../styles/myaccount.css";
import { VehiclesArray } from "./VehiclesArray";
import ConfirmPopup from "../../General/Popups/ConfirmPopup";
import VehicleForm from "../forms/VehicleForm";
import { getMyVehicles } from "../../../GraphQL/queries/VehicleQueries";
import { removeVehicle } from "../../../GraphQL/mutations/VehicleMutation";

class VehiclesTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openPopupEdit: false,
            openPopupAdd: false,
            openPopupDeleteConfirm: false,
            openPopupModify: false,
            loading: true,
            currentVehicle: null,
            vehicles: []
        }
    }

    componentDidMount() {
        getMyVehicles().then((res) => {
            this.setState({ vehicles: res.vehiclesByUser }, () => {
                this.setState({ loading: false });
            })
        })
    }

    handleEditClick() {
        this.setState({ openPopupEdit: true }, () => {
            this.props.functionCallback(true);
        });
    }

    addVehicle = (vehicle) => {
        this.setState({
            openPopupAdd: false,
            vehicles: [...this.state.vehicles, vehicle],
        });
    };

    deleteVehicle = (idVehicle) => {
        removeVehicle(idVehicle).then((res) => {
            if (res.removeVehicle.statusCode === 200) {
                this.setState({
                    vehicles: this.state.vehicles.filter(function (
                        vehicle
                    ) {
                        return vehicle.id !== idVehicle;
                    }),
                    openPopupDeleteConfirm: false
                });
            }
        });
    }

    modifyVehicle = (vehicle) => {
        var currentVehicles = this.state.vehicles;
        currentVehicles.map((currentVehicle) => {
            if (currentVehicle.id == vehicle.id) {
                currentVehicle.marque = vehicle.marque;
                currentVehicle.modele = vehicle.modele;
                currentVehicle.puissance = vehicle.puissance;
                currentVehicle.immatriculation = vehicle.immatriculation;
            }
        });
        this.setState({ vehicles: currentVehicles, openPopupModify: false });
    }

    render() {
        return (
            !this.state.loading ?
                (<div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                    <div style={{ display: "flex" }}>
                        <p style={{ marginLeft: "20px" }}>Véhicule(s) personnel(s)</p>
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
                        <div>
                            <VehiclesArray
                                editable={false}
                                vehicles={this.state.vehicles}
                            />
                        </div>
                    </Collapse>

                    <Popup
                        title="Véhicule(s) personnel(s)"
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
                                    <VehiclesArray
                                        functionEdit={(vehicle) =>
                                            this.setState({ currentVehicle: vehicle, openPopupModify: true })
                                        }
                                        functionDelete={(vehicle) =>
                                            this.setState({ currentVehicle: vehicle, openPopupDeleteConfirm: true })
                                        }
                                        editable={true}
                                        vehicles={this.state.vehicles}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Popup>

                    <Popup
                        title="Ajouter un véhicule personnel"
                        length="md"
                        openPopup={this.state.openPopupAdd}
                        parentCallback={() =>
                            this.setState({ openPopupAdd: false }, () => {
                                this.props.functionCallback(false);
                            })
                        }
                    >
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <VehicleForm
                                parentCallback={(vehicle) =>
                                    this.addVehicle(vehicle)
                                }></VehicleForm>
                        </div>
                    </Popup >

                    <Popup
                        title="Modifier un véhicule personnel"
                        length="md"
                        openPopup={this.state.openPopupModify}
                        parentCallback={() =>
                            this.setState({ openPopupModify: false }, () => {
                                this.props.functionCallback(false);
                            })
                        }
                    >
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <VehicleForm
                                isEditable={true}
                                vehicle={this.state.currentVehicle}
                                parentCallback={(vehicle) =>
                                    this.modifyVehicle(vehicle)
                                }></VehicleForm>
                        </div>
                    </Popup>

                    <ConfirmPopup
                        title={"Supprimer un véhicule personnel"}
                        text={"Voulez vous vraiment supprimer la " + this.state.currentVehicle?.marque + " " + this.state.currentVehicle?.modele + " dont l'immatriculation est : " + this.state.currentVehicle?.immatriculation + " de vos véhicules personnels ? "}
                        openPopup={this.state.openPopupDeleteConfirm}
                        parentCallback={() => this.setState({ openPopupDeleteConfirm: false })}
                        confirmButtonId="confirm-delete-vehicle"
                        confirmButtonFunction={() => this.deleteVehicle(this.state.currentVehicle?.id)}
                        cancelButtonFunction={() => this.setState({ openPopupDeleteConfirm: false })}
                        buttonDisabled={false}
                    />
                </div>) : ""
        )
    }
}

export default VehiclesTab;