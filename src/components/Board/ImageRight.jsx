import React from "react";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import Popup from "../General/Popups/Popup";
import { IconButton, Collapse } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getImageRight } from "../../GraphQL/queries/UserQueries";

const GreenButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#00AF06",
    '&:hover': {
        backgroundColor: "#009205",
    },
}));

class ImageRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopupEdit: false,
            open: false,
            imageRight: "",
            loading: true
        }
    }

    componentDidMount() {
        getImageRight().then((res) => {
            var authorization = res.currentUser.imageDiffusionAuthorization ? "AUTORISEE" : "NON AUTORISEE";
            this.setState({ imageRight: authorization }, () => {
                this.setState({ loading: false });
            })
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
                            <p>Diffusion des images : {this.state.imageRight}</p>
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
                        </div>
                    </Popup>
                </div>) : ""
        );
    }
}

export default ImageRight;