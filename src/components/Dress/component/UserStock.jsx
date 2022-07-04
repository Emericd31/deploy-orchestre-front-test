import React from "react";
import { IconButton, Collapse, Grid } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "../../../styles/dress.css";
import ActionButtons from '../../General/Buttons/ActionButtons';
import { getDressByUser } from "../../../GraphQL/queries/DressQueries";
import CheckroomIcon from '@mui/icons-material/Checkroom';

class UserStock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            user: props.user,
            dresses: []
        };
    }

    componentDidMount = () => {
    }

    handleTab = () => {
        if (this.state.open) {
            this.setState({ open: false });
        } else {
            getDressByUser(this.state.user.id).then((res) => {
                this.setState({ dresses: res.dressByUser, open: true });
            })
        }
    }

    sortArray = (x, y) => {
        if (x.size === y.size) {
            if (x.isMale > y.isMale)
                return -1;
            else
                return 1;
        }

        if (x.size === "XS")
            return -1;

        if (x.size === "S" && y.size !== "XS")
            return -1;

        if (x.size === "M" && y.size !== "XS" && y.size !== "S")
            return -1;

        if (x.size === "L" && y.size !== "XS" && y.size !== "S" && y.size !== "M")
            return -1;

        if (x.size === "XL" && y.size !== "XS" && y.size !== "S" && y.size !== "M" && y.size !== "L")
            return -1;

        if (x.size === "XXL" && y.size !== "XS" && y.size !== "S" && y.size !== "M" && y.size !== "L" && y.size !== "XL")
            return -1;

        if (x.size === "XXXL" && y.size !== "XS" && y.size !== "S" && y.size !== "M" && y.size !== "L" && y.size !== "XL" && y.size !== "XXL")
            return -1;

        return 0;
    }

    render() {
        return (
            <div style={{ backgroundColor: "white" }} className="article">
                <Grid container>
                    <Grid item xs={4} md={3} style={{ paddingLeft: "20px", display: "flex", alignItems: "center" }}>
                        <p className="articleTitle" style={{ fontWeight: this.state.open ? "bold" : "" }}>{this.state.user.lastName}</p>
                    </Grid>
                    <Grid item xs={3} md={3} style={{ paddingLeft: "20px", display: "flex", alignItems: "center" }}>
                        <p className="articleTitle" style={{ fontWeight: this.state.open ? "bold" : "" }}>{this.state.user.firstName}</p>
                    </Grid>

                    <Grid item xs={5} md={6} lg={6} sx={{ display: "flex", justifyContent: { xs: "center", md: "right", lg: "right" }, alignItems: "center", paddingRight: "20px", paddingTop: { xs: "10px", md: "0px" } }}>
                        <div>
                            <ActionButtons
                                functionEdit={() =>
                                    this.props.functionEdit(this.state.user)
                                }
                                isNotDeletable={true} />
                        </div>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            style={{ marginLeft: "20px" }}
                            onClick={() => this.handleTab()}
                        >
                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </Grid>

                </Grid>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{ backgroundColor: "#F8F9FA" /*, borderTop: "2px solid #DFDFDF"*/ }}>
                    <div style={{ /*marginBottom: "20px", marginLeft: "20px"*/ }}>
                        {
                            (this.state.dresses.length > 0) ? (
                                <CheckroomIcon color="primary" style={{ marginTop: "20px", marginLeft: "20px", fontSize: "30" }} />
                            ) : ""
                        }
                        {
                            this.state.dresses.map((dress) => (
                                <p key={dress.dress.name + dress.size + dress.isMale} style={{ paddingLeft: "20px" }}>
                                    {dress.dress.name + " : " + dress.amount + " x " + dress.size + " coupe " + (dress.isMale ? "H" : "F")}
                                </p>
                            ))
                        }
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default UserStock;