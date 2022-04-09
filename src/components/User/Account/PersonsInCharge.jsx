import React from "react";
import ActionButtons from "../../General/Buttons/ActionButtons";
import { Grid } from "@mui/material";

export function PersonsInCharge(props) {
    return (
        props.legalGuardians.length > 0 ? (
            <div>
                <Grid container className="tabHeader" >
                    <Grid item lg={props.editable ? 1 : 2} xs={12}>
                        <p className="titleTab">Nom</p>
                    </Grid>
                    <Grid item lg={props.editable ? 1 : 2} xs={12}>
                        <p className="titleTab">Prénom</p>
                    </Grid>
                    <Grid item lg={2} xs={12}>
                        <p className="titleTab">Parenté</p>
                    </Grid>
                    <Grid item lg={3} xs={12}>
                        <p className="titleTab">Email</p>
                    </Grid>
                    <Grid item lg={3} xs={12}>
                        <p className="titleTab">Téléphone</p>
                    </Grid>
                </Grid>
                {
                    props.legalGuardians.map((legalGuardian, i, { length }) => {
                        return (
                            <React.Fragment key={legalGuardian.id}>
                                <Grid container
                                    className="tabContent"
                                    style={{ borderBottom: (length - 1 !== i) ? "2px solid #DFDFDF" : "" }}
                                >
                                    <Grid item lg={0} md={0} xs={6} sx={{ display: { lg: 'none', xs: 'block' }, backgroundColor: "#1D70B7", color: "white" }}>
                                        <p className="contentTab">Nom</p>
                                    </Grid>
                                    <Grid item lg={props.editable ? 1 : 2} xs={6}>
                                        <p className="contentTab">{legalGuardian.lastname}</p>
                                    </Grid>
                                    <Grid item lg={0} md={0} xs={6} sx={{ display: { lg: 'none', xs: 'block' }, backgroundColor: "#1D70B7", color: "white" }}>
                                        <p className="contentTab">Prénom</p>
                                    </Grid>
                                    <Grid item lg={props.editable ? 1 : 2} xs={6}>
                                        <p className="contentTab">{legalGuardian.firstname}</p>
                                    </Grid>
                                    <Grid item lg={0} md={0} xs={6} sx={{ display: { lg: 'none', xs: 'block' }, backgroundColor: "#1D70B7", color: "white" }}>
                                        <p className="contentTab">Parenté</p>
                                    </Grid>
                                    <Grid item lg={2} xs={6}>
                                        <p className="contentTab">{legalGuardian.relationship}</p>
                                    </Grid>
                                    <Grid item lg={0} md={0} xs={6} sx={{ display: { lg: 'none', xs: 'block' }, backgroundColor: "#1D70B7", color: "white" }}>
                                        <p className="contentTab">Email</p>
                                    </Grid>
                                    <Grid item lg={3} xs={6}>
                                        <p className="contentTab" style={{ overflowWrap: "break-word", fontSize: "16px" }}>{legalGuardian.email}</p>
                                    </Grid>
                                    <Grid item lg={0} md={0} xs={6} sx={{ display: { lg: 'none', xs: 'block' }, backgroundColor: "#1D70B7", color: "white", borderRadius: !props.editable && (length - 1 === i) ? "0px 0px 0px 5px" : "" }}>
                                        <p className="contentTab">Téléphone</p>
                                    </Grid>
                                    <Grid item lg={3} xs={6}>
                                        <p className="contentTab">{legalGuardian.mobileNumber}</p>
                                    </Grid>
                                    {
                                        props.editable ? (
                                            <>
                                                <Grid item lg={2} xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: { xs: "10px", md: "0px" } }}>
                                                    <ActionButtons
                                                        functionEdit={() =>
                                                            props.functionEdit(legalGuardian)
                                                        }
                                                        functionDelete={() =>
                                                            props.functionDelete(legalGuardian)
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
                <p>Vous n'avez ajouté aucun responsable légal pour le moment</p>
            </div>
        )
    )
}