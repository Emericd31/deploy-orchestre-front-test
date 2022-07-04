import React from "react";
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { addDress, editDress, editStocks } from "../../../GraphQL/mutations/DressMutation";
import CustomizedSnackbars from "../../General/Popups/CustomizedSnackbar";

/**
 * Formulaire d'ajout ou de modification d'un article
 * 
 * Props : 
 * parentCallback(article) : function, fonction prenant en paramètre un objet article
 *    qui sera appelée après les actions du formulaire
 * isEditable : booléen, true si c'est une modification, false si c'est un ajout
 * article : object, objet contenant les informations d'un article
 */
class ArticleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditable: this.props.isEditable ?? false,
            currentArticle: this.props.isEditable ? this.props.article : null,
            articleName: this.props.isEditable ? this.props.article.name : "",
            isPersonal: this.props.isEditable ? this.props.article.isPersonal : false,

            xsCoupeHAmount: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "XS" && dress.isMale)?.initialAmount ?? 0 : 0,
            xsCoupeHMinimalStock: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "XS" && dress.isMale)?.minimalStock ?? 0 : 0,
            xsCoupeFAmount: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "XS" && !dress.isMale)?.initialAmount ?? 0 : 0,
            xsCoupeFMinimalStock: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "XS" && !dress.isMale)?.minimalStock ?? 0 : 0,

            sCoupeHAmount: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "S" && dress.isMale)?.initialAmount ?? 0 : 0,
            sCoupeHMinimalStock: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "S" && dress.isMale)?.minimalStock ?? 0 : 0,
            sCoupeFAmount: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "S" && !dress.isMale)?.initialAmount ?? 0 : 0,
            sCoupeFMinimalStock: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "S" && !dress.isMale)?.minimalStock ?? 0 : 0,

            mCoupeHAmount: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "M" && dress.isMale)?.initialAmount ?? 0 : 0,
            mCoupeHMinimalStock: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "M" && dress.isMale)?.minimalStock ?? 0 : 0,
            mCoupeFAmount: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "M" && !dress.isMale)?.initialAmount ?? 0 : 0,
            mCoupeFMinimalStock: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "M" && !dress.isMale)?.minimalStock ?? 0 : 0,

            lCoupeHAmount: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "L" && dress.isMale)?.initialAmount ?? 0 : 0,
            lCoupeHMinimalStock: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "L" && dress.isMale)?.minimalStock ?? 0 : 0,
            lCoupeFAmount: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "L" && !dress.isMale)?.initialAmount ?? 0 : 0,
            lCoupeFMinimalStock: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "L" && !dress.isMale)?.minimalStock ?? 0 : 0,

            xlCoupeHAmount: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "XL" && dress.isMale)?.initialAmount ?? 0 : 0,
            xlCoupeHMinimalStock: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "XL" && dress.isMale)?.minimalStock ?? 0 : 0,
            xlCoupeFAmount: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "XL" && !dress.isMale)?.initialAmount ?? 0 : 0,
            xlCoupeFMinimalStock: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "XL" && !dress.isMale)?.minimalStock ?? 0 : 0,

            xxlCoupeHAmount: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "XXL" && dress.isMale)?.initialAmount ?? 0 : 0,
            xxlCoupeHMinimalStock: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "XXL" && dress.isMale)?.minimalStock ?? 0 : 0,
            xxlCoupeFAmount: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "XXL" && !dress.isMale)?.initialAmount ?? 0 : 0,
            xxlCoupeFMinimalStock: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "XXL" && !dress.isMale)?.minimalStock ?? 0 : 0,

            xxxlCoupeHAmount: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "XXXL" && dress.isMale)?.initialAmount ?? 0 : 0,
            xxxlCoupeHMinimalStock: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "XXXL" && dress.isMale)?.minimalStock ?? 0 : 0,
            xxxlCoupeFAmount: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "XXXL" && !dress.isMale)?.initialAmount ?? 0 : 0,
            xxxlCoupeFMinimalStock: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "XXXL" && !dress.isMale)?.minimalStock ?? 0 : 0,

            tuAmount: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "TU")?.initialAmount ?? 0 : 0,
            tuMinimalStock: this.props.isEditable ? this.props.article.dressStocks.find(dress => dress.size == "TU")?.minimalStock ?? 0 : 0,
            areFieldsValid: false,
            hasBeenModified: false,

            openNotifAddDressError: false,
            openNotifEditStockError: false
        };
    }

    componentDidMount = () => {
    }

    updateField(field, input, errorState) {
        if (this.props.isEditable) {
            switch (field) {
                case "xsCoupeHAmount":
                    input = this.testStock("XS", true, input);
                    break;
                case "xsCoupeFAmount":
                    input = this.testStock("XS", false, input);
                    break;
                case "sCoupeHAmount":
                    input = this.testStock("S", true, input);
                    break;
                case "sCoupeFAmount":
                    input = this.testStock("S", false, input);
                    break;
                case "mCoupeHAmount":
                    input = this.testStock("M", true, input);
                    break;
                case "mCoupeFAmount":
                    input = this.testStock("M", false, input);
                    break;
                case "lCoupeHAmount":
                    input = this.testStock("L", true, input);
                    break;
                case "lCoupeFAmount":
                    input = this.testStock("L", false, input);
                    break;
                case "xlCoupeHAmount":
                    input = this.testStock("XL", true, input);
                    break;
                case "xlCoupeFAmount":
                    input = this.testStock("XL", false, input);
                    break;
                case "xxlCoupeHAmount":
                    input = this.testStock("XXL", true, input);
                    break;
                case "xxlCoupeFAmount":
                    input = this.testStock("XXL", false, input);
                    break;
                case "xxxlCoupeHAmount":
                    input = this.testStock("XXXL", true, input);
                    break;
                case "xxxlCoupeFAmount":
                    input = this.testStock("XXXL", false, input);
                    break;
            }
        }

        this.setState(
            {
                [field]: input < 0 ? 0 : input
            }, () => {
                if (this.props.isEditable) {
                    this.hasBeenModified()
                }
            }
        );
    }

    testStock = (size, isMale, input) => {
        var article = this.props.article.dressStocks.find(dress => dress.size == size && dress.isMale == isMale);
        if (input < (article.initialAmount - article.actualAmount)) {
            input = article.initialAmount - article.actualAmount;
        }
        return input;
    }

    updateTextField(field, input, errorState) {
        this.setState(
            {
                [field]: input
            }, () => {
                if (this.props.isEditable) {
                    this.hasBeenModified()
                }
            }
        );
    }

    changeCheck(field, input) {
        this.setState({
            [field]: input,
        }, () => {
            if (this.props.isEditable) {
                this.hasBeenModified()
            }
        });
    }

    addArticle = () => {
        addDress(this.state.articleName, this.state.isPersonal).then((res) => {
            if (res.addDress.statusCode == 200) {
                const newArticle = {
                    id: res.addDress.id,
                    name: this.state.articleName,
                    isPersonal: this.state.isPersonal,
                    dressStocks: [
                        {
                            id: 1,
                            isMale: true,
                            size: "XS",
                            minimalStock: parseInt(this.state.xsCoupeHMinimalStock),
                            initialAmount: parseInt(this.state.xsCoupeHAmount),
                            actualAmount: parseInt(this.state.xsCoupeHAmount)
                        },
                        {
                            id: 2,
                            isMale: false,
                            size: "XS",
                            minimalStock: parseInt(this.state.xsCoupeFMinimalStock),
                            initialAmount: parseInt(this.state.xsCoupeFAmount),
                            actualAmount: parseInt(this.state.xsCoupeFAmount)
                        },
                        {
                            id: 3,
                            isMale: true,
                            size: "S",
                            minimalStock: parseInt(this.state.sCoupeHMinimalStock),
                            initialAmount: parseInt(this.state.sCoupeHAmount),
                            actualAmount: parseInt(this.state.sCoupeHAmount)
                        },
                        {
                            id: 4,
                            isMale: false,
                            size: "S",
                            minimalStock: parseInt(this.state.sCoupeFMinimalStock),
                            initialAmount: parseInt(this.state.sCoupeFAmount),
                            actualAmount: parseInt(this.state.sCoupeFAmount)
                        },
                        {
                            id: 5,
                            isMale: true,
                            size: "M",
                            minimalStock: parseInt(this.state.mCoupeHMinimalStock),
                            initialAmount: parseInt(this.state.mCoupeHAmount),
                            actualAmount: parseInt(this.state.mCoupeHAmount)
                        },
                        {
                            id: 6,
                            isMale: false,
                            size: "M",
                            minimalStock: parseInt(this.state.mCoupeFMinimalStock),
                            initialAmount: parseInt(this.state.mCoupeFAmount),
                            actualAmount: parseInt(this.state.mCoupeFAmount)
                        },
                        {
                            id: 7,
                            isMale: true,
                            size: "L",
                            minimalStock: parseInt(this.state.lCoupeHMinimalStock),
                            initialAmount: parseInt(this.state.lCoupeHAmount),
                            actualAmount: parseInt(this.state.lCoupeHAmount)
                        },
                        {
                            id: 8,
                            isMale: false,
                            size: "L",
                            minimalStock: parseInt(this.state.lCoupeFMinimalStock),
                            initialAmount: parseInt(this.state.lCoupeFAmount),
                            actualAmount: parseInt(this.state.lCoupeFAmount)
                        },
                        {
                            id: 9,
                            isMale: true,
                            size: "XL",
                            minimalStock: parseInt(this.state.xlCoupeHMinimalStock),
                            initialAmount: parseInt(this.state.xlCoupeHAmount),
                            actualAmount: parseInt(this.state.xlCoupeHAmount)
                        },
                        {
                            id: 10,
                            isMale: false,
                            size: "XL",
                            minimalStock: parseInt(this.state.xlCoupeFMinimalStock),
                            initialAmount: parseInt(this.state.xlCoupeFAmount),
                            actualAmount: parseInt(this.state.xlCoupeFAmount)
                        },
                        {
                            id: 11,
                            isMale: true,
                            size: "XXL",
                            minimalStock: parseInt(this.state.xxlCoupeHMinimalStock),
                            initialAmount: parseInt(this.state.xxlCoupeHAmount),
                            actualAmount: parseInt(this.state.xxlCoupeHAmount)
                        },
                        {
                            id: 12,
                            isMale: false,
                            size: "XXL",
                            minimalStock: parseInt(this.state.xxlCoupeFMinimalStock),
                            initialAmount: parseInt(this.state.xxlCoupeFAmount),
                            actualAmount: parseInt(this.state.xxlCoupeFAmount)
                        },
                        {
                            id: 13,
                            isMale: true,
                            size: "XXXL",
                            minimalStock: parseInt(this.state.xxxlCoupeHMinimalStock),
                            initialAmount: parseInt(this.state.xxxlCoupeHAmount),
                            actualAmount: parseInt(this.state.xxxlCoupeHAmount)
                        },
                        {
                            id: 14,
                            isMale: false,
                            size: "XXXL",
                            minimalStock: parseInt(this.state.xxxlCoupeFMinimalStock),
                            initialAmount: parseInt(this.state.xxxlCoupeFAmount),
                            actualAmount: parseInt(this.state.xxxlCoupeFAmount)
                        },
                        {
                            id: 15,
                            isMale: true,
                            size: "TU",
                            minimalStock: parseInt(this.state.tuMinimalStock),
                            initialAmount: parseInt(this.state.tuAmount),
                            actualAmount: parseInt(this.state.tuAmount)
                        },
                    ]
                }
                if (!this.state.isPersonal) {
                    var initialAmountTab = [];
                    initialAmountTab.push(parseInt(this.state.xsCoupeHAmount), parseInt(this.state.sCoupeHAmount),
                        parseInt(this.state.mCoupeHAmount), parseInt(this.state.lCoupeHAmount), parseInt(this.state.xlCoupeHAmount),
                        parseInt(this.state.xxlCoupeHAmount), parseInt(this.state.xxxlCoupeHAmount),
                        parseInt(this.state.xsCoupeFAmount), parseInt(this.state.sCoupeFAmount), parseInt(this.state.mCoupeFAmount),
                        parseInt(this.state.lCoupeFAmount), parseInt(this.state.xlCoupeFAmount), parseInt(this.state.xxlCoupeFAmount),
                        parseInt(this.state.xxxlCoupeFAmount), parseInt(this.state.tuAmount));
                    var actualAmountTab = initialAmountTab;
                    var minimalStockTab = [];
                    minimalStockTab.push(parseInt(this.state.xsCoupeHMinimalStock), parseInt(this.state.sCoupeHMinimalStock),
                        parseInt(this.state.mCoupeHMinimalStock), parseInt(this.state.lCoupeHMinimalStock), parseInt(this.state.xlCoupeHMinimalStock),
                        parseInt(this.state.xxlCoupeHMinimalStock), parseInt(this.state.xxxlCoupeHMinimalStock),
                        parseInt(this.state.xsCoupeFMinimalStock), parseInt(this.state.sCoupeFMinimalStock),
                        parseInt(this.state.mCoupeFMinimalStock), parseInt(this.state.lCoupeFMinimalStock),
                        parseInt(this.state.xlCoupeFMinimalStock), parseInt(this.state.xxlCoupeFMinimalStock),
                        parseInt(this.state.xxxlCoupeFMinimalStock), parseInt(this.state.tuMinimalStock));

                    editStocks(res.addDress.id, initialAmountTab, minimalStockTab, actualAmountTab).then((res2) => {
                        if (res2.editStocks.statusCode == 200) {
                            this.props.functionCallback(newArticle);
                        } else {
                            this.setState({ openNotifEditStockError: true });
                        }
                    })
                } else {
                    this.props.functionCallback(newArticle);
                }
            } else {
                this.setState({ openNotifAddDressError: true });
            }
        })
    }

    editArticle = () => {
        if (this.props.article.name !== this.state.articleName) {
            editDress(this.props.article.id, this.state.articleName, this.state.isPersonal).then((res) => {
                if (res.editDress.statusCode !== 200) {
                    this.setState({ openNotifAddDressError: true });
                }
            });
        }

        var xsH = this.props.article.dressStocks.find(dress => dress.size == "XS" && dress.isMale);
        var xsF = this.props.article.dressStocks.find(dress => dress.size == "XS" && !dress.isMale);
        var sH = this.props.article.dressStocks.find(dress => dress.size == "S" && dress.isMale);
        var sF = this.props.article.dressStocks.find(dress => dress.size == "S" && !dress.isMale);
        var mH = this.props.article.dressStocks.find(dress => dress.size == "M" && dress.isMale);
        var mF = this.props.article.dressStocks.find(dress => dress.size == "M" && !dress.isMale);
        var lH = this.props.article.dressStocks.find(dress => dress.size == "L" && dress.isMale);
        var lF = this.props.article.dressStocks.find(dress => dress.size == "L" && !dress.isMale);
        var xlH = this.props.article.dressStocks.find(dress => dress.size == "XL" && dress.isMale);
        var xlF = this.props.article.dressStocks.find(dress => dress.size == "XL" && !dress.isMale);
        var xxlH = this.props.article.dressStocks.find(dress => dress.size == "XXL" && dress.isMale);
        var xxlF = this.props.article.dressStocks.find(dress => dress.size == "XXL" && !dress.isMale);
        var xxxlH = this.props.article.dressStocks.find(dress => dress.size == "XXXL" && dress.isMale);
        var xxxlF = this.props.article.dressStocks.find(dress => dress.size == "XXXL" && !dress.isMale);
        var tu = this.props.article.dressStocks.find(dress => dress.size == "TU");
        const newArticle = {
            id: this.props.article.id,
            name: this.state.articleName,
            isPersonal: this.state.isPersonal,
            dressStocks: [
                {
                    id: 1,
                    isMale: true,
                    size: "XS",
                    minimalStock: parseInt(this.state.xsCoupeHMinimalStock),
                    initialAmount: parseInt(this.state.xsCoupeHAmount),
                    actualAmount: parseInt(Math.abs(xsH.initialAmount - xsH.actualAmount - this.state.xsCoupeHAmount))
                },
                {
                    id: 2,
                    isMale: false,
                    size: "XS",
                    minimalStock: parseInt(this.state.xsCoupeFMinimalStock),
                    initialAmount: parseInt(this.state.xsCoupeFAmount),
                    actualAmount: parseInt(Math.abs(xsF.initialAmount - xsF.actualAmount - this.state.xsCoupeFAmount))
                },
                {
                    id: 3,
                    isMale: true,
                    size: "S",
                    minimalStock: parseInt(this.state.sCoupeHMinimalStock),
                    initialAmount: parseInt(this.state.sCoupeHAmount),
                    actualAmount: parseInt(Math.abs(sH.initialAmount - sH.actualAmount - this.state.sCoupeHAmount))
                },
                {
                    id: 4,
                    isMale: false,
                    size: "S",
                    minimalStock: parseInt(this.state.sCoupeFMinimalStock),
                    initialAmount: parseInt(this.state.sCoupeFAmount),
                    actualAmount: parseInt(Math.abs(sF.initialAmount - sF.actualAmount - this.state.sCoupeFAmount))
                },
                {
                    id: 5,
                    isMale: true,
                    size: "M",
                    minimalStock: parseInt(this.state.mCoupeHMinimalStock),
                    initialAmount: parseInt(this.state.mCoupeHAmount),
                    actualAmount: parseInt(Math.abs(mH.initialAmount - mH.actualAmount - this.state.mCoupeHAmount))
                },
                {
                    id: 6,
                    isMale: false,
                    size: "M",
                    minimalStock: parseInt(this.state.mCoupeFMinimalStock),
                    initialAmount: parseInt(this.state.mCoupeFAmount),
                    actualAmount: parseInt(Math.abs(mF.initialAmount - mF.actualAmount - this.state.mCoupeFAmount))
                },
                {
                    id: 7,
                    isMale: true,
                    size: "L",
                    minimalStock: parseInt(this.state.lCoupeHMinimalStock),
                    initialAmount: parseInt(this.state.lCoupeHAmount),
                    actualAmount: parseInt(Math.abs(lH.initialAmount - lH.actualAmount - this.state.lCoupeHAmount))
                },
                {
                    id: 8,
                    isMale: false,
                    size: "L",
                    minimalStock: parseInt(this.state.lCoupeFMinimalStock),
                    initialAmount: parseInt(this.state.lCoupeFAmount),
                    actualAmount: parseInt(Math.abs(lF.initialAmount - lF.actualAmount - this.state.lCoupeFAmount))
                },
                {
                    id: 9,
                    isMale: true,
                    size: "XL",
                    minimalStock: parseInt(this.state.xlCoupeHMinimalStock),
                    initialAmount: parseInt(this.state.xlCoupeHAmount),
                    actualAmount: parseInt(Math.abs(xlH.initialAmount - xlH.actualAmount - this.state.xlCoupeHAmount))
                },
                {
                    id: 10,
                    isMale: false,
                    size: "XL",
                    minimalStock: parseInt(this.state.xlCoupeFMinimalStock),
                    initialAmount: parseInt(this.state.xlCoupeFAmount),
                    actualAmount: parseInt(Math.abs(xlF.initialAmount - xlF.actualAmount - this.state.xlCoupeFAmount))
                },
                {
                    id: 11,
                    isMale: true,
                    size: "XXL",
                    minimalStock: parseInt(this.state.xxlCoupeHMinimalStock),
                    initialAmount: parseInt(this.state.xxlCoupeHAmount),
                    actualAmount: parseInt(Math.abs(xxlH.initialAmount - xxlH.actualAmount - this.state.xxlCoupeHAmount))
                },
                {
                    id: 12,
                    isMale: false,
                    size: "XXL",
                    minimalStock: parseInt(this.state.xxlCoupeFMinimalStock),
                    initialAmount: parseInt(this.state.xxlCoupeFAmount),
                    actualAmount: parseInt(Math.abs(xxlF.initialAmount - xxlF.actualAmount - this.state.xxlCoupeFAmount))
                },
                {
                    id: 13,
                    isMale: true,
                    size: "XXXL",
                    minimalStock: parseInt(this.state.xxxlCoupeHMinimalStock),
                    initialAmount: parseInt(this.state.xxxlCoupeHAmount),
                    actualAmount: parseInt(Math.abs(xxxlH.initialAmount - xxxlH.actualAmount - this.state.xxxlCoupeHAmount))
                },
                {
                    id: 14,
                    isMale: false,
                    size: "XXXL",
                    minimalStock: parseInt(this.state.xxxlCoupeFMinimalStock),
                    initialAmount: parseInt(this.state.xxxlCoupeFAmount),
                    actualAmount: parseInt(Math.abs(xxxlF.initialAmount - xxxlF.actualAmount - this.state.xxxlCoupeFAmount))
                },
                {
                    id: 15,
                    isMale: true,
                    size: "TU",
                    minimalStock: parseInt(this.state.tuMinimalStock),
                    initialAmount: parseInt(this.state.tuAmount),
                    actualAmount: parseInt(Math.abs(tu.initialAmount - tu.actualAmount - this.state.tuAmount))
                },
            ]
        }
        var initialAmountTab = [];
        initialAmountTab.push(parseInt(this.state.xsCoupeHAmount), parseInt(this.state.sCoupeHAmount),
            parseInt(this.state.mCoupeHAmount), parseInt(this.state.lCoupeHAmount),
            parseInt(this.state.xlCoupeHAmount), parseInt(this.state.xxlCoupeHAmount),
            parseInt(this.state.xxxlCoupeHAmount),
            parseInt(this.state.xsCoupeFAmount), parseInt(this.state.sCoupeFAmount),
            parseInt(this.state.mCoupeFAmount), parseInt(this.state.lCoupeFAmount),
            parseInt(this.state.xlCoupeFAmount), parseInt(this.state.xxlCoupeFAmount),
            parseInt(this.state.xxxlCoupeFAmount),
            parseInt(this.state.tuAmount));
        var actualAmountTab = [];
        actualAmountTab.push(parseInt(newArticle.dressStocks.find(dress => dress.size == "XS" && dress.isMale)?.actualAmount),
            parseInt(newArticle.dressStocks.find(dress => dress.size == "S" && dress.isMale)?.actualAmount),
            parseInt(newArticle.dressStocks.find(dress => dress.size == "M" && dress.isMale)?.actualAmount),
            parseInt(newArticle.dressStocks.find(dress => dress.size == "L" && dress.isMale)?.actualAmount),
            parseInt(newArticle.dressStocks.find(dress => dress.size == "XL" && dress.isMale)?.actualAmount),
            parseInt(newArticle.dressStocks.find(dress => dress.size == "XXL" && dress.isMale)?.actualAmount),
            parseInt(newArticle.dressStocks.find(dress => dress.size == "XXXL" && dress.isMale)?.actualAmount),

            parseInt(newArticle.dressStocks.find(dress => dress.size == "XS" && !dress.isMale)?.actualAmount),
            parseInt(newArticle.dressStocks.find(dress => dress.size == "S" && !dress.isMale)?.actualAmount),
            parseInt(newArticle.dressStocks.find(dress => dress.size == "M" && !dress.isMale)?.actualAmount),
            parseInt(newArticle.dressStocks.find(dress => dress.size == "L" && !dress.isMale)?.actualAmount),
            parseInt(newArticle.dressStocks.find(dress => dress.size == "XL" && !dress.isMale)?.actualAmount),
            parseInt(newArticle.dressStocks.find(dress => dress.size == "XXL" && !dress.isMale)?.actualAmount),
            parseInt(newArticle.dressStocks.find(dress => dress.size == "XXXL" && !dress.isMale)?.actualAmount),
            parseInt(newArticle.dressStocks.find(dress => dress.size == "TU")?.actualAmount))
        var minimalStockTab = [];
        minimalStockTab.push(parseInt(this.state.xsCoupeHMinimalStock), parseInt(this.state.sCoupeHMinimalStock),
            parseInt(this.state.mCoupeHMinimalStock), parseInt(this.state.lCoupeHMinimalStock),
            parseInt(this.state.xlCoupeHMinimalStock), parseInt(this.state.xxlCoupeHMinimalStock),
            parseInt(this.state.xxxlCoupeHMinimalStock),
            parseInt(this.state.xsCoupeFMinimalStock), parseInt(this.state.sCoupeFMinimalStock),
            parseInt(this.state.mCoupeFMinimalStock), parseInt(this.state.lCoupeFMinimalStock),
            parseInt(this.state.xlCoupeFMinimalStock), parseInt(this.state.xxlCoupeFMinimalStock),
            parseInt(this.state.xxxlCoupeFMinimalStock),
            parseInt(this.state.tuMinimalStock));

        editStocks(this.props.article.id, initialAmountTab, minimalStockTab, actualAmountTab).then((res2) => {
            if (res2.editStocks.statusCode == 200) {
                this.props.editFunction(newArticle);
            } else {
                this.setState({ openNotifEditStockError: true });
            }
        })
    }

    hasBeenModified() {
        var xsH = this.props.article.dressStocks.find(dress => dress.size == "XS" && dress.isMale);
        var xsF = this.props.article.dressStocks.find(dress => dress.size == "XS" && !dress.isMale);
        var sH = this.props.article.dressStocks.find(dress => dress.size == "S" && dress.isMale);
        var sF = this.props.article.dressStocks.find(dress => dress.size == "S" && !dress.isMale);
        var mH = this.props.article.dressStocks.find(dress => dress.size == "M" && dress.isMale);
        var mF = this.props.article.dressStocks.find(dress => dress.size == "M" && !dress.isMale);
        var lH = this.props.article.dressStocks.find(dress => dress.size == "L" && dress.isMale);
        var lF = this.props.article.dressStocks.find(dress => dress.size == "L" && !dress.isMale);
        var xlH = this.props.article.dressStocks.find(dress => dress.size == "XL" && dress.isMale);
        var xlF = this.props.article.dressStocks.find(dress => dress.size == "XL" && !dress.isMale);
        var xxlH = this.props.article.dressStocks.find(dress => dress.size == "XXL" && dress.isMale);
        var xxlF = this.props.article.dressStocks.find(dress => dress.size == "XXL" && !dress.isMale);
        var xxxlH = this.props.article.dressStocks.find(dress => dress.size == "XXXL" && dress.isMale);
        var xxxlF = this.props.article.dressStocks.find(dress => dress.size == "XXXL" && !dress.isMale);
        var tu = this.props.article.dressStocks.find(dress => dress.size == "TU");

        var hasBeenModified = (
            this.state.articleName !== this.props.article.name ||
            this.state.isPersonal !== this.props.article.isPersonal ||

            // HOMMES
            parseInt(xsH.initialAmount) !== parseInt(this.state.xsCoupeHAmount) ||
            parseInt(xsH.minimalStock) !== parseInt(this.state.xsCoupeHMinimalStock) ||

            parseInt(sH.initialAmount) !== parseInt(this.state.sCoupeHAmount) ||
            parseInt(sH.minimalStock) !== parseInt(this.state.sCoupeHMinimalStock) ||

            parseInt(mH.initialAmount) !== parseInt(this.state.mCoupeHAmount) ||
            parseInt(mH.minimalStock) !== parseInt(this.state.mCoupeHMinimalStock) ||

            parseInt(lH.initialAmount) !== parseInt(this.state.lCoupeHAmount) ||
            parseInt(lH.minimalStock) !== parseInt(this.state.lCoupeHMinimalStock) ||

            parseInt(xlH.initialAmount) !== parseInt(this.state.xlCoupeHAmount) ||
            parseInt(xlH.minimalStock) !== parseInt(this.state.xlCoupeHMinimalStock) ||

            parseInt(xxlH.initialAmount) !== parseInt(this.state.xxlCoupeHAmount) ||
            parseInt(xxlH.minimalStock) !== parseInt(this.state.xxlCoupeHMinimalStock) ||

            parseInt(xxxlH.initialAmount) !== parseInt(this.state.xxxlCoupeHAmount) ||
            parseInt(xxxlH.minimalStock) !== parseInt(this.state.xxxlCoupeHMinimalStock) ||

            // FEMMES
            parseInt(xsF.initialAmount) !== parseInt(this.state.xsCoupeFAmount) ||
            parseInt(xsF.minimalStock) !== parseInt(this.state.xsCoupeFMinimalStock) ||

            parseInt(sF.initialAmount) !== parseInt(this.state.sCoupeFAmount) ||
            parseInt(sF.minimalStock) !== parseInt(this.state.sCoupeFMinimalStock) ||

            parseInt(mF.initialAmount) !== parseInt(this.state.mCoupeFAmount) ||
            parseInt(mF.minimalStock) !== parseInt(this.state.mCoupeFMinimalStock) ||

            parseInt(lF.initialAmount) !== parseInt(this.state.lCoupeFAmount) ||
            parseInt(lF.minimalStock) !== parseInt(this.state.lCoupeFMinimalStock) ||

            parseInt(xlF.initialAmount) !== parseInt(this.state.xlCoupeFAmount) ||
            parseInt(xlF.minimalStock) !== parseInt(this.state.xlCoupeFMinimalStock) ||

            parseInt(xxlF.initialAmount) !== parseInt(this.state.xxlCoupeFAmount) ||
            parseInt(xxlF.minimalStock) !== parseInt(this.state.xxlCoupeFMinimalStock) ||

            parseInt(xxxlF.initialAmount) !== parseInt(this.state.xxxlCoupeFAmount) ||
            parseInt(xxxlF.minimalStock) !== parseInt(this.state.xxxlCoupeFMinimalStock) ||

            // TU
            parseInt(tu.initialAmount) !== parseInt(this.state.tuAmount) ||
            parseInt(tu.minimalStock) !== parseInt(this.state.tuMinimalStock)
        );
        this.setState({ hasBeenModified: hasBeenModified });
    }

    resetNotifOpen = () => {
        this.setState({ openNotifAddDressError: false, openNotifEditStockError: false });
    }

    render() {
        return (
            <div>
                {/* ICONES  */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "50%",
                        marginRight: "1%",
                        marginBottom: "3%",
                    }}
                >
                    {
                        this.props.isEditable ? (
                            <EditIcon color="primary" style={{ fontSize: 60 }} />
                        ) : (
                            <CheckroomIcon color="primary" style={{ fontSize: 60 }} />
                        )
                    }
                </div>

                {/* FORMULAIRE */}
                <Grid item container direction="row">
                    <Grid item container md={12} lg={6} spacing={1}>

                        {/* NOM ARTICLE */}
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <p>Article</p>
                        </Grid>

                        <Grid item xs={8} style={{ display: "flex", alignItems: "center" }}>
                            <BriefedTextField
                                id={"article-name-field"}
                                required={true}
                                label="Nom"
                                type="text"
                                name="Nom"
                                value={this.state.articleName}
                                saveField={(input, errorState) =>
                                    this.updateTextField("articleName", input, errorState)
                                }
                            />
                        </Grid>

                        {/* ARTICLE PERSONNEL */}
                        <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isPersonal}
                                        value={this.state.isPersonal}
                                        onChange={(event, errorState) =>
                                            this.changeCheck(
                                                "isPersonal", !this.state.isPersonal
                                            )
                                        }
                                        name="IsPersonal"
                                        color="primary"
                                    />
                                }
                                label=""
                            />
                        </Grid>

                        <Grid item xs={10} style={{ display: "flex", alignItems: "center" }}>
                            <p>Article personnel</p>
                        </Grid>

                        {/* EN-TETES */}
                        <Grid item xs={4}>
                            <p>Tailles</p>
                        </Grid>
                        <Grid item xs={4}>
                            <p>Quantité</p>
                        </Grid>
                        <Grid item xs={4}>
                            <p>Stock mini.</p>
                        </Grid>

                        {/* XS COUPE H */}
                        <Grid item xs={4}>
                            <p>XS coupe H</p>
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="xs-coupe-h-amount"
                                value={this.state.xsCoupeHAmount}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("xsCoupeHAmount", input.target.value, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="xs-coupe-h-minimal-stock"
                                value={this.state.xsCoupeHMinimalStock}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("xsCoupeHMinimalStock", input.target.value, errorState)
                                }
                            />
                        </Grid>

                        {/* XS COUPE F */}
                        <Grid item xs={4}>
                            <p>XS coupe F</p>
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="xs-coupe-f-amount"
                                value={this.state.xsCoupeFAmount}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("xsCoupeFAmount", input.target.value, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="xs-coupe-f-minimal-stock"
                                value={this.state.xsCoupeFMinimalStock}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("xsCoupeFMinimalStock", input.target.value, errorState)
                                }
                            />
                        </Grid>

                        {/* S COUPE H */}
                        <Grid item xs={4}>
                            <p>S coupe H</p>
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="s-coupe-h-amount"
                                value={this.state.sCoupeHAmount}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("sCoupeHAmount", input.target.value, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="s-coupe-h-minimal-stock"
                                value={this.state.sCoupeHMinimalStock}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("sCoupeHMinimalStock", input.target.value, errorState)
                                }
                            />
                        </Grid>

                        {/* S COUPE F */}
                        <Grid item xs={4}>
                            <p>S coupe F</p>
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="s-coupe-f-amount"
                                value={this.state.sCoupeFAmount}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("sCoupeFAmount", input.target.value, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="s-coupe-f-minimal-stock"
                                value={this.state.sCoupeFMinimalStock}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("sCoupeFMinimalStock", input.target.value, errorState)
                                }
                            />
                        </Grid>

                        {/* M COUPE H */}
                        <Grid item xs={4}>
                            <p>M coupe H</p>
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="m-coupe-h-amount"
                                value={this.state.mCoupeHAmount}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("mCoupeHAmount", input.target.value, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="m-coupe-h-minimal-stock"
                                value={this.state.mCoupeHMinimalStock}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("mCoupeHMinimalStock", input.target.value, errorState)
                                }
                            />
                        </Grid>

                        {/* M COUPE F */}
                        <Grid item xs={4}>
                            <p>M coupe F</p>
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="m-coupe-f-amount"
                                value={this.state.mCoupeFAmount}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("mCoupeFAmount", input.target.value, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="m-coupe-f-minimal-stock"
                                value={this.state.mCoupeFMinimalStock}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("mCoupeFMinimalStock", input.target.value, errorState)
                                }
                            />
                        </Grid>

                        {/* L COUPE H */}
                        <Grid item xs={4}>
                            <p>L coupe H</p>
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="l-coupe-h-amount"
                                value={this.state.lCoupeHAmount}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("lCoupeHAmount", input.target.value, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="l-coupe-h-minimal-stock"
                                value={this.state.lCoupeHMinimalStock}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("lCoupeHMinimalStock", input.target.value, errorState)
                                }
                            />
                        </Grid>

                        {/* L COUPE F */}
                        <Grid item xs={4}>
                            <p>L coupe F</p>
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="l-coupe-f-amount"
                                value={this.state.lCoupeFAmount}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("lCoupeFAmount", input.target.value, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="l-coupe-f-minimal-stock"
                                value={this.state.lCoupeFMinimalStock}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("lCoupeFMinimalStock", input.target.value, errorState)
                                }
                            />
                        </Grid>

                        {/* XL COUPE H */}
                        <Grid item xs={4}>
                            <p>XL coupe H</p>
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="xl-coupe-h-amount"
                                value={this.state.xlCoupeHAmount}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("xlCoupeHAmount", input.target.value, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="xl-coupe-h-minimal-stock"
                                value={this.state.xlCoupeHMinimalStock}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("xlCoupeHMinimalStock", input.target.value, errorState)
                                }
                            />
                        </Grid>

                        {/* XL COUPE F */}
                        <Grid item xs={4}>
                            <p>XL coupe F</p>
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="xl-coupe-f-amount"
                                value={this.state.xlCoupeFAmount}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("xlCoupeFAmount", input.target.value, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="xl-coupe-f-minimal-stock"
                                value={this.state.xlCoupeFMinimalStock}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("xlCoupeFMinimalStock", input.target.value, errorState)
                                }
                            />
                        </Grid>

                        {/* XXL COUPE H */}
                        <Grid item xs={4}>
                            <p>XXL coupe H</p>
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="xxl-coupe-h-amount"
                                value={this.state.xxlCoupeHAmount}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("xxlCoupeHAmount", input.target.value, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="xxl-coupe-h-minimal-stock"
                                value={this.state.xxlCoupeHMinimalStock}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("xxlCoupeHMinimalStock", input.target.value, errorState)
                                }
                            />
                        </Grid>

                        {/* XXL COUPE F */}
                        <Grid item xs={4}>
                            <p>XXL coupe F</p>
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="xxl-coupe-f-amount"
                                value={this.state.xxlCoupeFAmount}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("xxlCoupeFAmount", input.target.value, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="xxl-coupe-f-minimal-stock"
                                value={this.state.xxlCoupeFMinimalStock}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("xxlCoupeFMinimalStock", input.target.value, errorState)
                                }
                            />
                        </Grid>

                        {/* XXXL COUPE H */}
                        <Grid item xs={4}>
                            <p>XXXL coupe H</p>
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="xxxl-coupe-h-amount"
                                value={this.state.xxxlCoupeHAmount}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("xxxlCoupeHAmount", input.target.value, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="xxxl-coupe-h-minimal-stock"
                                value={this.state.xxxlCoupeHMinimalStock}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("xxxlCoupeHMinimalStock", input.target.value, errorState)
                                }
                            />
                        </Grid>

                        {/* XXXL COUPE F */}
                        <Grid item xs={4}>
                            <p>XXXL coupe F</p>
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="xxxl-coupe-f-amount"
                                value={this.state.xxxlCoupeFAmount}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("xxxlCoupeFAmount", input.target.value, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="xxxl-coupe-f-minimal-stock"
                                value={this.state.xxxlCoupeFMinimalStock}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("xxxlCoupeFMinimalStock", input.target.value, errorState)
                                }
                            />
                        </Grid>

                        {/* T.U */}
                        <Grid item xs={4}>
                            <p>T.U</p>
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="tu-amount"
                                value={this.state.tuAmount}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("tuAmount", input.target.value, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                name="tu-minimal-stock"
                                value={this.state.tuMinimalStock}
                                disabled={this.state.isPersonal}
                                onChange={(input, errorState) =>
                                    this.updateField("tuMinimalStock", input.target.value, errorState)
                                }
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {/* BOUTONS */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        marginRight: "1%",
                    }}
                >
                    {
                        this.props.isEditable ? (
                            <Button
                                disabled={!this.state.hasBeenModified}
                                style={{ marginTop: "30px", textAlign: "center" }}
                                variant="contained"
                                color="primary"
                                onClick={() => this.editArticle()}
                                type="submit"
                            >
                                Modifier
                            </Button>
                        ) : (
                            <Button
                                disabled={this.state.articleName == ""}
                                style={{ marginTop: "30px", textAlign: "center" }}
                                variant="contained"
                                color="primary"
                                onClick={() => this.addArticle()}
                                type="submit"
                            >
                                Ajouter
                            </Button>
                        )
                    }
                </div>
                {
                    this.state.openNotifAddDressError ? (
                        <CustomizedSnackbars
                            open={true}
                            timer={5000}
                            message={"Impossible d'ajouter ou modifier le vêtement suivant, vérifiez que le nom saisi ne soit pas déjà utilisé."}
                            severity={"error"}
                            functionCallback={() => this.resetNotifOpen()}
                        />
                    ) : ""
                }
                {
                    this.state.openNotifEditStockError ? (
                        <CustomizedSnackbars
                            open={true}
                            timer={5000}
                            message={"Une erreur est survenue lors de l'édition des stocks."}
                            severity={"error"}
                            functionCallback={() => this.resetNotifOpen()}
                        />
                    ) : ""
                }
            </div>
        );
    }
}

export default ArticleForm;
