import React from "react";
import { Grid } from "@mui/material";
import { Checkbox } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Button } from "@mui/material";
import { Navigate } from 'react-router-dom';
import { confirmProfile, modifyCurrentUserImageDiffusionAuthorization } from '../../../GraphQL/mutations/UserMutations';

class ImageRightForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentAuthorization: false,
            redirect: false,
        }
    }

    componentDidMount = () => {
        this.props.functionCheckCompleted(3, true);
    }

    changeCheck(field, input) {
        this.setState({
            [field]: input,
        });
    }

    completeProfile = () => {
        modifyCurrentUserImageDiffusionAuthorization(this.state.currentAuthorization).then((res) => {
            if (res.modifyCurrentUserImageDiffusionAuthorization.statusCode === 200) {
                confirmProfile().then((res) => {
                    if (res.confirmProfileFilled.statusCode === 200) {
                        localStorage.setItem("Token", res.confirmProfileFilled.message);
                        this.setState({ redirect: true });
                    }
                });
            }
        })
    }

    render() {
        return (
            this.state.redirect ?
                <Navigate to="/profileCompleted" />
                : (
                    <div>
                        <Grid
                            item
                            container
                            direction="row"
                            spacing={3}
                            style={{ textAlign: "center", marginTop: "50px" }}
                        >
                            <Grid item xs={12} md={1} lg={1} style={{ display: "flex", justifyContent: "center" }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.currentExactData}
                                            value={this.state.currentExactData}
                                            onChange={(event, errorState) =>
                                                this.changeCheck(
                                                    "currentAuthorization", !this.state.currentAuthorization
                                                )
                                            }
                                            name="Asthme"
                                            color="primary"
                                        />
                                    }
                                    label=""
                                />

                            </Grid>
                            <Grid item xs={12} md={11} lg={11}>
                                <p style={{ fontWeight: "bold", textAlign: "left" }}>
                                    Dans le cadre des activités de l’association Musicale La Fleurantine des photos et des vidéos peuvent être diffusées.
                                    <br />J'autorise l’association Musicale La Fleurantine à prendre et à diffuser ces photos et vidéos sur tous les moyens de diffusion et de promotion employés.
                                </p>
                            </Grid>
                        </Grid>
                        <div
                            style={{
                                float: "right",
                                marginRight: "10%",
                                marginBottom: "50px",
                                marginTop: "20px",
                            }}
                        >
                            <Button
                                onClick={() => this.props.functionCallbackDecrement()}
                                variant="contained"
                                sx={{
                                    backgroundColor: "#1D70B7"
                                }}
                            >
                                Retour
                            </Button>
                            <Button
                                onClick={() => this.completeProfile()}
                                variant="contained"
                                sx={{
                                    ml: 2,
                                    backgroundColor: "#1D70B7"
                                }}
                            >
                                Terminer
                            </Button>
                        </div>
                    </div>
                )
        );
    }
}

export default ImageRightForm; 