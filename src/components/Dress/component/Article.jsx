import React from "react";
import { IconButton, Collapse, Grid } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "../../../styles/dress.css";
import ArticleStock from "./ArticleStock";
import ActionButtons from '../../General/Buttons/ActionButtons';

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            article: props.article,
            totalStock: 0,
            actualStock: 0,
        };
    }

    componentDidMount = () => {
        this.getTotalStock();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.someValue!==prevState.someValue){
          return { someState: nextProps.someValue};
       }
       else return null;
     }

    componentDidUpdate = (nextProps) => {
        // console.log(nextProps.article)
        // console.log(this.state.article)
        // if (nextProps.article.name !== this.state.article.name) {
        //     this.setState({ article: nextProps.article });
        // }
        // 
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.article !== this.state.article) {
            this.setState({ article: nextProps.article });
        } 
        return true;
    }

    getTotalStock = () => {
        var result = 0;
        var actualStock = 0;
        this.state.article.dressStocks.forEach(stock => {
            result += stock.initialAmount;
            actualStock += stock.actualAmount;
        });
        this.setState({ totalStock: result, actualStock: actualStock });
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
            <div style={{ backgroundColor: this.state.article.isPersonal ? "#D8CFCF" : "white" }} className={this.state.article.isPersonal ? "" : "article"}>
                <Grid container>
                    <Grid item xs={4} md={3} style={{ paddingLeft: "20px", display: "flex", alignItems: "center" }}>
                        <p className="articleTitle" style={{ fontWeight: this.state.open ? "bold" : "" }}>{this.state.article.name + " (" + this.state.totalStock + ")"}</p>
                    </Grid>
                    <Grid item xs={3} md={3} style={{ paddingLeft: "20px", display: "flex", alignItems: "center" }}>
                        <p className="articleTitle" style={{ fontWeight: this.state.open ? "bold" : "" }}>{this.state.actualStock}</p>
                    </Grid>
                    <Grid item xs={3} md={3} style={{ paddingLeft: "20px", display: "flex", alignItems: "center" }}>
                        <p className="articleTitle" style={{ fontWeight: this.state.open ? "bold" : "" }}>{this.state.totalStock - this.state.actualStock}</p>
                    </Grid>

                    <Grid item xs={12} md={12} lg={3} sx={{ display: "flex", justifyContent: { xs: "center", md: "right", lg: "right" }, alignItems: "center", paddingRight: "20px" }}>
                        <div
                            style={{ marginRight: this.state.article.isPersonal ? "60px" : "0px" }}>
                            <ActionButtons
                                functionEdit={() =>
                                    this.props.functionEdit(this.state.article)
                                }
                                functionDelete={() =>
                                    this.props.functionDelete(this.state.article)
                                } />
                        </div>
                        {
                            !this.state.article.isPersonal ? (
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    style={{ marginLeft: "30px" }}
                                    onClick={() => this.setState({ open: !this.state.open })}
                                >
                                    {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>) : ""
                        }
                    </Grid>

                </Grid>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{ backgroundColor: "#F8F9FA", borderTop: "2px solid #DFDFDF" }}>
                    <div style={{ marginBottom: "20px", marginLeft: "20px" }}>
                        {
                            this.state.article.dressStocks.sort(this.sortArray).map((dressStock) => (
                                <ArticleStock key={dressStock.id} stock={dressStock} dressId={this.state.article.id} />
                            ))
                        }
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default Article;