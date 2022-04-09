import React from "react";
import ActionButtons from "../../General/Buttons/ActionButtons";
import { Grid } from "@mui/material";

export function VehiclesArray(props) {
    return (
        props.vehicles.length > 0 ? (
            <div>
                <Grid container className="tabHeader" >
                    <Grid item lg={4} xs={12}>
                        <p className="titleTab">Marque et modèle</p>
                    </Grid>
                    <Grid item lg={props.editable ? 3 : 4} xs={12}>
                        <p className="titleTab">Puissance Fiscale (CV)</p>
                    </Grid>
                    <Grid item lg={props.editable ? 3 : 4} xs={12}>
                        <p className="titleTab">Immatriculation</p>
                    </Grid>
                </Grid>
                {
                    props.vehicles.map((vehicle, i, { length }) => {
                        return (
                            <React.Fragment key={vehicle.id}>
                                <Grid container
                                    className="tabContent"
                                    style={{ borderBottom: (length - 1 !== i) ? "2px solid #DFDFDF" : "" }}
                                >
                                    <Grid item lg={0} md={0} xs={6} sx={{ display: { lg: 'none', xs: 'block' }, backgroundColor: "#1D70B7", color: "white" }}>
                                        <p className="contentTab">Marque et modèle</p>
                                    </Grid>
                                    <Grid item lg={4} xs={6}>
                                        <p className="contentTab">{vehicle.marque + " " + vehicle.modele}</p>
                                    </Grid>
                                    <Grid item lg={0} md={0} xs={6} sx={{ display: { lg: 'none', xs: 'block' }, backgroundColor: "#1D70B7", color: "white" }}>
                                        <p className="contentTab">Puissance Fiscale (CV)</p>
                                    </Grid>
                                    <Grid item lg={props.editable ? 3 : 4} xs={6}>
                                        <p className="contentTab">{vehicle.puissance}</p>
                                    </Grid>
                                    <Grid item lg={0} md={0} xs={6} sx={{ display: { lg: 'none', xs: 'block' }, backgroundColor: "#1D70B7", color: "white" }}>
                                        <p className="contentTab">Immatriculation</p>
                                    </Grid>
                                    <Grid item lg={props.editable ? 3 : 4} xs={6}>
                                        <p className="contentTab">{vehicle.immatriculation}</p>
                                    </Grid>
                                    {
                                        props.editable ? (
                                            <>
                                                <Grid item lg={2} xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: { xs: "10px", md: "0px" } }}>
                                                    <ActionButtons
                                                        functionEdit={() =>
                                                            props.functionEdit(vehicle)
                                                        }
                                                        functionDelete={() =>
                                                            props.functionDelete(vehicle)
                                                        } />
                                                </Grid>
                                            </>
                                        ) : ""
                                    }
                                </Grid>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        ) : (
            <div style={{ width: "100%", textAlign: "center" }}>
                <p>Vous n'avez ajouté aucun véhicule pour le moment</p>
            </div>
        )
    )
}