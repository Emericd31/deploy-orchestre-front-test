import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import Popup from "../../General/Popups/Popup";
import { IconButton, Collapse, FormControlLabel, Grid, Checkbox } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getImageRight } from "../../../GraphQL/queries/UserQueries";
import { GreenButton } from "../../General/StyledComponents/StyledButtons";
import { modifyCurrentUserImageDiffusionAuthorization } from "../../../GraphQL/mutations/UserMutations";

class ImageRightTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopupEdit: false,
            currentAuthorization: false,
            open: false,
            imageRight: "",
            loading: true
        }
    }

    componentDidMount() {
        getImageRight().then((res) => {
            var authorization = res.currentUser.imageDiffusionAuthorization ? "AUTORISEE" : "NON AUTORISEE";
            this.setState({ imageRight: authorization, currentAuthorization: res.currentUser.imageDiffusionAuthorization }, () => {
                this.setState({ loading: false });
            })
        });
    }

    changeCheck(field, input) {
        modifyCurrentUserImageDiffusionAuthorization(input).then((res) => {
            if (res.modifyCurrentUserImageDiffusionAuthorization.statusCode === 200) {
                this.setState({
                    [field]: input
                });
            }
        });
    }

    handleEditClick() {
        this.setState({ openPopupEdit: true }, () => {
            this.props.functionCallback(true);
        });
    }

    render() {
        return (
            !this.state.loading ?
                (<div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                    <div style={{ display: "flex" }}>
                        <p style={{ marginLeft: "20px" }}>Droit à l'image</p>
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
                        <div style={{ margin: "20px" }}>
                            <p>Diffusion des images : {this.state.currentAuthorization ? "AUTORISEE" : "NON AUTORISEE"}</p>
                        </div>
                    </Collapse>

                    <Popup
                        title="Droit à l'image"
                        length="lg"
                        openPopup={this.state.openPopupEdit}
                        parentCallback={() =>
                            this.setState({ openPopupEdit: false }, () => {
                                this.props.functionCallback(false);
                            })
                        }
                    >
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Grid
                                item
                                container
                                direction="row"
                                spacing={3}
                            >
                                <Grid item xs={12} md={1} lg={1} style={{ display: "flex", justifyContent: "center" }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.currentAuthorization}
                                                value={this.state.currentAuthorization}
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
                        </div>
                    </Popup>
                </div>) : ""
        );
    }
}

export default ImageRightTab;