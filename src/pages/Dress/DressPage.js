import React from "react";
import { IconButton, Collapse, Grid } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from '@mui/icons-material/Add';
import { GreenButton } from "../../components/General/StyledComponents/StyledButtons";
import Popup from "../../components/General/Popups/Popup";
import ArticleForm from "../../components/Dress/forms/ArticleForm";
import { getDresses } from "../../GraphQL/queries/DressQueries";
import Article from "../../components/Dress/component/Article";
import "../../styles/dress.css";
import { deleteDress } from "../../GraphQL/mutations/DressMutation";
import ConfirmPopup from "../../components/General/Popups/ConfirmPopup";
import CustomizedSnackbars from "../../components/General/Popups/CustomizedSnackbar";
import { getUsers, getUsersBase } from "../../GraphQL/queries/UserQueries";
import UserStock from "../../components/Dress/component/UserStock";
import update from 'immutability-helper';

class DressPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openByArticles: false,
            currentArticle: null,
            currentUser: null,
            openByMembers: false,
            openPopupAddArticle: false,
            openPopupEditArticle: false,
            openPopupDeleteConfirm: false,
            openNotifDeleteDressError: false,
            openPopupEditUserDress: false,
            dresses: null,
            users: null,
            isLoading: true
        };
    }

    componentDidMount = () => {
        getDresses().then((res) => {
            getUsersBase().then((res2) => {
                this.setState({ dresses: res.dresses, users: res2.users, isLoading: false });
            })
        });
    }

    addArticle = (article) => {
        this.setState({
            openPopupAddArticle: false,
            dresses: [...this.state.dresses, article]
        })
    }

    deleteArticle = () => {
        var article = this.state.currentArticle;
        deleteDress(article.id).then((res) => {
            if (res.deleteDress.statusCode == 200) {
                this.setState({
                    dresses: this.state.dresses.filter(function (
                        dress
                    ) {
                        return dress.id !== article.id;
                    }),
                    openPopupDeleteConfirm: false
                });
            } else {
                this.setState({ openNotifDeleteDressError: true })
            }
        })
    }

    resetNotifOpen = () => {
        this.setState({ openNotifDeleteDressError: false });
    }

    sortUsers = (x, y) => {
        if (x.lastName < y.lastName) {
            return -1;
        } else if (x.lastName > y.lastName) {
            return 1;
        }
        return 0;
    }

    editArticleFunction = (article) => {
        const index = this.state.dresses.findIndex((dress) => dress.id === article.id);
        const updatedDresses = update(this.state.dresses, { $splice: [[index, 1, article]] });  // array.splice(start, deleteCount, item1)
        this.setState({ dresses: updatedDresses, openPopupEditArticle: false });
    }

    render() {
        return (
            !this.state.isLoading ? (
                <div className="body">
                    <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                        <Grid container>
                            <Grid item xs={12} md={6} sx={{
                                display: "flex", justifyContent: { xs: "center", md: "left" }, alignItems: "center",
                                paddingLeft: { xs: "0px", md: "20px" }
                            }}>
                                <h2>Gestion du vestiaire</h2>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs: "center", md: "right" }, alignItems: "center" }}>
                                <GreenButton variant="contained" style={{ display: "inline", height: "40px" }} onClick={() => this.setState({ openPopupAddArticle: true })}>
                                    <AddIcon style={{ marginRight: "20px", display: "inline", verticalAlign: "middle" }} />
                                    <p style={{ display: "inline", verticalAlign: "middle" }}>Ajouter un article</p>
                                </GreenButton>
                            </Grid>
                        </Grid>
                    </div>

                    {/* GESTION DU VESTIAIRE PAR ARTICLE */}
                    <div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                        <div style={{ display: "flex" }}>
                            <p style={{ marginLeft: "20px" }}>Gestion du vestiaire par articles</p>
                            <div style={{ margin: "auto 10px auto auto" }}>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => this.setState({ openByArticles: !this.state.openByArticles })}
                                >
                                    {this.state.openByArticles ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </div>
                        </div>
                        <Collapse in={this.state.openByArticles} timeout="auto" unmountOnExit>
                            <div>
                                {/* EN-TETES */}
                                <Grid container style={{ backgroundColor: "#1D70B7" }} className="articlesTabEntetes">
                                    <Grid item xs={3}>
                                        <p style={{ color: "white", paddingLeft: "20px", fontWeight: "bold" }}>Article</p>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <p style={{ color: "white", paddingLeft: "20px", fontWeight: "bold" }}>Stock</p>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <p style={{ color: "white", paddingLeft: "20px", fontWeight: "bold" }}>Distribués</p>
                                    </Grid>
                                </Grid>
                                {
                                    this.state.dresses.map((dress) => (
                                        <Article key={dress.id}
                                            article={dress}
                                            functionEdit={(article) => this.setState({ currentArticle: article, openPopupEditArticle: true })}
                                            functionDelete={(article) => this.setState({ currentArticle: article, openPopupDeleteConfirm: true })}
                                        />
                                    ))
                                }
                            </div>
                        </Collapse>
                    </div>

                    {/* GESTION DU VESTIAIRE PAR MEMBRE */}
                    <div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                        <div style={{ display: "flex" }}>
                            <p style={{ marginLeft: "20px" }}>Gestion du vestiaire par membres</p>
                            <div style={{ margin: "auto 10px auto auto" }}>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => this.setState({ openByMembers: !this.state.openByMembers })}
                                >
                                    {this.state.openByMembers ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </div>
                        </div>
                        <Collapse in={this.state.openByMembers} timeout="auto" unmountOnExit>
                            <div>
                                {/* EN-TETES */}
                                <Grid container style={{ backgroundColor: "#1D70B7" }} className="articlesTabEntetes">
                                    <Grid item xs={3}>
                                        <p style={{ color: "white", paddingLeft: "20px", fontWeight: "bold" }}>Nom</p>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <p style={{ color: "white", paddingLeft: "20px", fontWeight: "bold" }}>Prénom</p>
                                    </Grid>
                                </Grid>
                                {
                                    this.state.users.sort(this.sortUsers).map((user) => (
                                        <UserStock key={user.id}
                                            user={user}
                                            functionEdit={(user) => this.setState({ currentUser: user, openPopupEditUserDress: true })}
                                        />
                                    ))
                                }
                            </div>
                        </Collapse>
                    </div>

                    {/* POPUPS */}
                    <Popup
                        title="Ajouter un article"
                        length="md"
                        openPopup={this.state.openPopupAddArticle}
                        parentCallback={() =>
                            this.setState({ openPopupAddArticle: false })
                        }
                    >
                        <ArticleForm
                            isEditable={false}
                            functionCallback={(article) => this.addArticle(article)}
                        />
                    </Popup>
                    <Popup
                        title="Modifier un article"
                        length="md"
                        openPopup={this.state.openPopupEditArticle}
                        parentCallback={() =>
                            this.setState({ openPopupEditArticle: false })
                        }
                    >
                        <ArticleForm
                            isEditable={true}
                            article={this.state.currentArticle}
                            editFunction={(article) => this.editArticleFunction(article)}
                            functionCallback={() => this.setState({ openPopupEditArticle: false })}
                        />
                    </Popup>
                    <Popup
                        title="Modifier les emprunts"
                        length="md"
                        openPopup={this.state.openPopupEditUserDress}
                        parentCallback={() =>
                            this.setState({ openPopupEditUserDress: false })
                        }
                    >
                        {/* <ArticleForm
                            isEditable={true}
                            article={this.state.currentArticle}
                            functionCallback={() => this.setState({ openPopupEditUserDress: false })}
                        /> */}
                    </Popup>
                    <ConfirmPopup
                        title={"Supprimer un article du vestiaire"}
                        text={"Voulez vous vraiment supprimer l'article \"" + this.state.currentArticle?.name + "\" des articles du vestiaire ? La suppression entraînera la suppresion des stocks"}
                        openPopup={this.state.openPopupDeleteConfirm}
                        parentCallback={() => this.setState({ openPopupDeleteConfirm: false })}
                        confirmButtonId="confirm-delete-dress"
                        confirmButtonFunction={() => this.deleteArticle()}
                        cancelButtonFunction={() => this.setState({ openPopupDeleteConfirm: false })}
                        buttonDisabled={false}
                    />
                    {
                        this.state.openNotifDeleteDressError ? (
                            <CustomizedSnackbars
                                open={true}
                                timer={5000}
                                message={"Une erreur est survenue lors de la suppression de l'article."}
                                severity={"error"}
                                functionCallback={() => this.resetNotifOpen()}
                            />
                        ) : ""
                    }
                </div>
            ) : ""
        );
    }
}

export default DressPage;