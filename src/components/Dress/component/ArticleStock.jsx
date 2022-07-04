import React from "react";
import { IconButton, Collapse, Grid } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "../../../styles/dress.css";
import { getUsersByDressAndSize } from "../../../GraphQL/queries/DressQueries";

class ArticleStock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            stock: props.stock,
            dressId: props.dressId,
            users: [],
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.stock !== this.state.stock) {
            this.setState({ stock: nextProps.stock });
        } 
        return true;
    }

    openStock = () => {
        var size = this.state.stock.size;
        var sizeValue;
        switch (size) {
            case "XS":
                sizeValue = 0;
                break;
            case "S":
                sizeValue = 1;
                break;
            case "M":
                sizeValue = 2;
                break;
            case "L":
                sizeValue = 3;
                break;
            case "XL":
                sizeValue = 4;
                break;
            case "XXL":
                sizeValue = 5;
                break;
            case "XXXL":
                sizeValue = 6;
                break;
            case "TU":
                sizeValue = 7;
                break;
            default:
                sizeValue = 0;
                break;
        }
        getUsersByDressAndSize(this.state.dressId, sizeValue, this.state.stock.isMale).then((res) => {
            this.setState({ users: res.usersByDressAndSize, open: true });
        })
    }

    closeStock = () => {
        this.setState({ open: false });
    }

    sortArray = (x, y) => {
        if (x.lastName < y.lastName)
            return -1;
        else if (x.lastName > y.lastName)
            return 1;
        return 0;
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={4} md={3} sx={{ paddingLeft: { xs: "0px", md: "40px" }, display: "flex", alignItems: "center" }}>
                        <p className="articleTitle" style={{ fontWeight: this.state.open ? "bold" : "" }}>{this.state.stock.size === "TU" ? "Taille unique" : "Taille " + this.state.stock.size + " Coupe " + (this.state.stock.isMale ? "H" : "F") + " (" + this.state.stock.initialAmount + ") "}</p>
                    </Grid>
                    <Grid item xs={3} md={3} sx={{ paddingLeft: { xs: "0px", md: "10px" }, display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "left" } }}>
                        <p className="articleTitle" style={{ fontWeight: this.state.open ? "bold" : "" }}>{this.state.stock.actualAmount}</p>
                    </Grid>
                    <Grid item xs={3} md={3} sx={{ paddingLeft: { xs: "0px", md: "10px" }, display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "left" } }}>
                        <p className="articleTitle" style={{ fontWeight: this.state.open ? "bold" : "" }}>{this.state.stock.initialAmount - this.state.stock.actualAmount}</p>
                    </Grid>
                    <Grid item xs={2} md={3} style={{ display: "flex", justifyContent: "right", alignItems: "center", paddingRight: "20px" }}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => this.state.open ? this.closeStock() : this.openStock()}
                        >
                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </Grid>
                </Grid>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    {
                        this.state.users.sort(this.sortArray).map((user) => (
                            <Grid container key={user.id}>
                                <Grid item md={6} sx={{ display: { xs: "none", md: "block" } }}>
                                </Grid>
                                <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "left" } }}>
                                    <p>{user.lastName.toUpperCase() + " " + user.firstName}</p>
                                </Grid>
                            </Grid>
                        ))
                    }
                </Collapse>
            </div>
        );
    }
}

export default ArticleStock;