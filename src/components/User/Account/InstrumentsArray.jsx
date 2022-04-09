import React from "react";
import ActionButtons from "../../General/Buttons/ActionButtons";
import { Grid } from "@mui/material";

export function InstrumentsArray(props) {
    return (
        props.instruments.length > 0 ? (
            <div>
                <Grid container className="tabHeader" >
                    <Grid item lg={props.editable ? 2 : 3} xs={12}>
                        <p className="titleTab">Type d'instrument</p>
                    </Grid>
                    <Grid item lg={2} xs={12}>
                        <p className="titleTab">Marque</p>
                    </Grid>
                    <Grid item lg={2} xs={12}>
                        <p className="titleTab">Modèle</p>
                    </Grid>
                    <Grid item lg={2} xs={12}>
                        <p className="titleTab">N° de série</p>
                    </Grid>
                    <Grid item lg={props.editable ? 2 : 3} xs={12}>
                        <p className="titleTab">Formation associée</p>
                    </Grid>
                </Grid>
                {
                    props.instruments.map((instrument, i, { length }) => {
                        return (
                            <React.Fragment key={instrument.id}>
                                <Grid container
                                    className="tabContent"
                                    style={{ borderBottom: (length - 1 !== i) ? "2px solid #DFDFDF" : "" }}
                                >
                                    <Grid item lg={0} md={0} xs={6} sx={{ display: { lg: 'none', xs: 'block' }, backgroundColor: "#1D70B7", color: "white" }}>
                                        <p className="contentTab">Type d'instrument</p>
                                    </Grid>
                                    <Grid item lg={props.editable ? 2 : 3} xs={6}>
                                        <p className="contentTab">{instrument.type.type}</p>
                                    </Grid>
                                    <Grid item lg={0} md={0} xs={6} sx={{ display: { lg: 'none', xs: 'block' }, backgroundColor: "#1D70B7", color: "white" }}>
                                        <p className="contentTab">Marque</p>
                                    </Grid>
                                    <Grid item lg={2} xs={6}>
                                        <p className="contentTab">{instrument.marque}</p>
                                    </Grid>
                                    <Grid item lg={0} md={0} xs={6} sx={{ display: { lg: 'none', xs: 'block' }, backgroundColor: "#1D70B7", color: "white" }}>
                                        <p className="contentTab">Modèle</p>
                                    </Grid>
                                    <Grid item lg={2} xs={6}>
                                        <p className="contentTab">{instrument.model}</p>
                                    </Grid>
                                    <Grid item lg={0} md={0} xs={6} sx={{ display: { lg: 'none', xs: 'block' }, backgroundColor: "#1D70B7", color: "white" }}>
                                        <p className="contentTab">N° de série</p>
                                    </Grid>
                                    <Grid item lg={2} xs={6}>
                                        <p className="contentTab">{instrument.serialNumber}</p>
                                    </Grid>
                                    <Grid item lg={0} md={0} xs={6} sx={{ display: { lg: 'none', xs: 'block' }, backgroundColor: "#1D70B7", color: "white" }}>
                                        <p className="contentTab">Formation associée</p>
                                    </Grid>
                                    <Grid item lg={props.editable ? 2 : 3} xs={6}>
                                        <p className="contentTab">{instrument.musicalFormation}</p>
                                    </Grid>
                                    {
                                        props.editable ? (
                                            <>
                                                <Grid item lg={2} xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: { xs: "10px", md: "0px" } }}>
                                                    <ActionButtons
                                                        functionEdit={() =>
                                                            props.functionEdit(instrument)
                                                        }
                                                        functionDelete={() =>
                                                            props.functionDelete(instrument)
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
                <p>Vous n'avez ajouté aucun instrument pour le moment</p>
            </div>
        )
    )
}