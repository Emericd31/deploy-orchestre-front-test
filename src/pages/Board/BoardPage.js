import React from "react";
import { getPersonalData } from '../../GraphQL/queries/UserQueries';
import Calendar from '../../components/General/TextFields/Calendar';
import SplitButton from "../../components/General/TextFields/SplitButton";
import { getEventsGeneralInfos } from "../../GraphQL/queries/EventQueries";
import { getDayNumbersMonthLettersYearNumbers, getHours } from "../../Helpers/DateGestion";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { GreenButton } from "../../components/General/StyledComponents/StyledButtons";
import "../../App.css";
import "../../styles/board.scss";
import { Grid, TextField } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";
import { getActualities } from "../../GraphQL/queries/ActualityQueries";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import frLocale from "date-fns/locale/fr";

class BoardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            actualites: [],
            events: [],
            currentDate: new Date(),
            loading: true
        }
    }

    componentDidMount() {
        getActualities().then((res) => {
            this.setState({ actualites: res.actualities });
        })
        getPersonalData().then((res) => {
            this.setState({ firstName: res.currentUser.firstName, lastName: res.currentUser.lastName }, () => {
                getEventsGeneralInfos().then((res) => {
                    this.setState({ events: res.events }, () => {
                        this.setState({ loading: false })
                    })
                });
            })
        });
    }

    isMoreRecent(eventDate) {
        var dateEvent = new Date(eventDate);
        return dateEvent > this.state.currentDate;
    }

    compareDate(a, b) {
        var date1 = new Date(a.startDate);
        var date2 = new Date(b.startDate);
        return date1 > date2 ? 1 : date1 < date2 ? -1 : 0;
    }

    setCurrentDate(newDate) {
        this.setState({ currentDate: newDate });
    }

    render() {
        return (
            (!this.state.loading /*&& this.state.actualites.length !== 0*/) ?
                (
                    <div className="body">
                        <h1 style={{ fontWeight: "bold", fontSize: "18px", marginLeft: "20px", marginBottom: "20px" }}>Bonjour, {this.state.firstName + " " + this.state.lastName.toUpperCase()}</h1>
                        <div className="actuBox">
                            <h2>Actualités</h2>
                            <div className="actuBoxContent">
                                {
                                    this.state.actualites.length === 0 ? (
                                        <p>Rien de nouveau, revenez plus tard !</p>
                                    ) : (
                                        <div className="listActus">
                                            {
                                                this.state.actualites.map(function (actu, i) {
                                                    return (
                                                        <div className="actu" key={actu.id}>
                                                            <h3>{actu.title}</h3>
                                                            <p>{actu.content}</p>
                                                            {
                                                                actu.textLink !== "" ? (
                                                                    <LinkRouter to={"/" + actu.link} replace={true} style={{ textDecoration: "none" }}>
                                                                        <GreenButton style={{ float: "right", bottom: "40px", right: "5px", marginBottom: "10px" }}>{actu.textLink}</GreenButton>
                                                                    </LinkRouter>
                                                                ) : ""
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="nextEvents">
                            <h2>Prochains évènements</h2>
                            <div className="grid">
                                <div className="item-one">
                                    <div className="calendar">
                                        <Calendar style={{ width: "25%" }} callBack={(newValue) => this.setCurrentDate(newValue)} />
                                    </div>
                                    <div className="calendarMobile">
                                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                                            <MobileDatePicker
                                                sx={{ width: "80%" }}
                                                label=""
                                                value={this.state.currentDate}
                                                onChange={(newValue) => {
                                                    this.setCurrentDate(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} fullWidth  />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                                {
                                    this.state.events.length > 0 ? (
                                        <>
                                            <div className="item-two" sx={{ overflowX: "hidden" }}>
                                                <Grid className="entetes" container style={{ paddingLeft: "20px" }}>
                                                    <Grid item lg={4} md={6} xs={12}>
                                                        <p>Intitulé</p>
                                                    </Grid>
                                                    <Grid item lg={3} md={6} xs={12}>
                                                        <p>Lieu</p>
                                                    </Grid>
                                                    <Grid item lg={3} md={6} xs={12}>
                                                        <p>Date</p>
                                                    </Grid>
                                                    <Grid item lg={2} md={6} xs={12}>
                                                        <p>Statut</p>
                                                    </Grid>
                                                </Grid>
                                                {
                                                    this.state.events.filter(event => this.isMoreRecent(event.startDate)).sort((a, b) => this.compareDate(a, b)).map(event => {
                                                        return (
                                                            <Grid className="eventItem" container key={event.id} style={{ alignItems:"baseline"}}>
                                                                <Grid item lg={4} md={6} xs={12} component={LinkRouter} to={'/eventDetails/' + event.id} sx={{ textDecoration: "none", color: "black" }}>
                                                                    <p className="eventItemTitre" style={{ paddingLeft: "10px", marginTop: "10px", marginBottom: "0px" }}>{event.entitled}</p>
                                                                </Grid>
                                                                <Grid item lg={3} md={6} xs={12} component={LinkRouter} to={'/eventDetails/' + event.id} style={{ textDecoration: "none", color: "black" }}>
                                                                    <p className="eventItemInfo" style={{ paddingLeft: "10px", marginTop:"10px", marginBottom: "0px" }}>{event.city}</p>
                                                                </Grid>
                                                                <Grid item lg={3} md={6} xs={12} component={LinkRouter} to={'/eventDetails/' + event.id} style={{ textDecoration: "none", color: "black" }}>
                                                                    <p className="eventItemInfo" style={{ paddingLeft: "10px", marginTop:"10px", marginBottom: "0px" }}>{getDayNumbersMonthLettersYearNumbers(event.startDate) + " - " + getHours(event.startDate)}</p>
                                                                </Grid>
                                                                <Grid item lg={2} md={6} xs={12} sx={{ height: {xs: "50px"}, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                    <SplitButton eventId={event.id}></SplitButton>
                                                                </Grid>
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <LinkRouter to="/events" className="item-three">
                                                <p style={{ display: "inline" }}>Voir tous les évènements</p>
                                                <ArrowForwardIcon style={{ position: "relative", top: "5px", left: "5px", fontSize: "20px" }} />
                                            </LinkRouter>
                                        </>
                                    ) : (
                                        <div className="item-two">
                                            <p>Il n'y a aucun évènement pour le moment, revenez plus tard !</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ) : ""
        )
    }
}

export default BoardPage; 