import React from "react";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Grid, IconButton } from "@mui/material";
import { Collapse } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Paper } from "@mui/material";
import affiche from '../../images/affiche_concert.png';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';

const GreenButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#00AF06",
    '&:hover': {
        backgroundColor: "#009205",
    },
}));

class Diffusion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        return (
            <div style={{ backgroundColor: "white", borderRadius: "5px" }}>
                <div style={{ display: "flex" }}>
                    <p style={{ marginLeft: "20px" }}>Informations de diffusion</p>
                    <div style={{ margin: "auto 10px auto auto" }}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => this.setState({ open: !this.state.open })}
                        >
                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                        {
                            this.props.admin ?
                                (
                                    <GreenButton ><EditIcon /></GreenButton>
                                ) : ""
                        }
                    </div>
                </div>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <Grid container direction="row" style={{ marginBottom: "20px" }}>
                        <Grid item lg={4} style={{ paddingLeft: "20px" }}>
                            <Paper style={{ display: "flex", justifyContent: "center" }}>
                                <img src={affiche} />
                            </Paper>
                        </Grid>
                        <Grid item lg={8}>
                            <Grid container direction="column" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                                {
                                    this.props.admin ?
                                        (
                                            <>
                                                <Grid item>
                                                    <p>Description publique de l'évènement</p>
                                                </Grid>
                                                <Grid item>
                                                    <p style={{ border: "1px solid gray", borderRadius: "5px", padding: "5px" }}>
                                                        Après une année blanche, l'harmonie la fleurantine reprend ses habitudes en produisant son traditionnel concert du
                                                        nouvel an le samedi 08 janvier 2022 à 20h30 à l'espace culturel et sportif de Fleurance.
                                                        <br /><br />
                                                        Comme chaque année le groupe fleurantin, sous la direction de Vincent Blesz, met le répertoire viennois à l'honneur
                                                        avec une sélection des airs les plus connus intercalés par des œuvres originales pour orchestre d'harmonie.
                                                        <br /><br />
                                                        C'est également cette formule que vous réserve la lyre Valencienne, Harmonie de Valence d'Agen sous la direction
                                                        de Pierre Baldassaré et Fabien Carrouché, invitée par l'harmonie la fleurantine à assurer la première partie du
                                                        concert.
                                                        <br /><br />
                                                        Venez donc débuter l'année 2022 en musique, accompagné, entre autres, de Johan Strauss, Piotr Ilitch Tchaïkovski,
                                                        Sergei Prokofiev, Giuseppe Verdi et des 108 musiciens qui composent les 2 formations musicales.
                                                        <br /><br />
                                                        Entrée libre
                                                        <br />
                                                        Présentation d'un pass sanitaire valide et port du masque obligatoire.
                                                        <br />
                                                        Ouverture des portes à 19h45</p>
                                                </Grid>
                                            </>
                                        ) : ""
                                }

                                <Grid item>
                                    <p>Informations membres actifs</p>
                                </Grid>
                                <Grid item>
                                    <p style={{ border: "1px solid gray", borderRadius: "5px", padding: "5px" }}>
                                        Déménagement du matériel : 15h
                                        <br />
                                        Montage des lumières : 16h
                                        <br /><br />
                                        RDV à la salle à 19h pour raccord avec Valence d'Agen
                                        <br />
                                        Pas de repas à l'issue du concert
                                    </p>
                                </Grid>
                                {
                                    this.props.admin ?
                                        (
                                            <Grid item>
                                                <div>
                                                    <PublishOutlinedIcon style={{ float: "left", marginRight: "10px" }} />
                                                    <p style={{ paddingTop: "2px" }}>Diffusion au Public, Diffusion aux membres actifs, Diffusion Administration</p>
                                                </div>
                                            </Grid>
                                        ) : ""
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Collapse>
            </div>
        );
    }
}

export default Diffusion; 