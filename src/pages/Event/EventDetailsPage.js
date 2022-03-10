import React from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import GeneralData from "../../components/Event/GeneralData";
import ClientContact from "../../components/Event/ClientContact";
import Program from "../../components/Event/Program";
import Presences from "../../components/Event/Presences";
import Diffusion from "../../components/Event/Diffusion";
import { Navigate } from 'react-router-dom';
import { Link } from "@mui/material";
import { useParams } from "react-router-dom";
import "../../App.css"

export default function EventDetailsPage(props) {
    const [redirect, setRedirect] = React.useState(false);
    const { eventId } = useParams();

    return (
        redirect ?
            (
                <Navigate to="/eventsGestion" />
            ) : (
                <div className="body" style={{ paddingBottom: "20px" }}>
                    <div style={{ marginBottom: "20px" }}>
                        <p style={{ fontWeight: "bold", fontSize: "18px", display: "inline", marginLeft: "20px" }}>ADMIN - Mariage - Auch (32) - 19 juin 2021</p>
                        <div component={Link} href={props.admin ? "/eventsGestion" : "/events"} style={{ display: "inline", right: "10%", position: "absolute", cursor: "pointer" }}
                            onClick={() => { setRedirect(true) }}>
                            <ArrowBackIosIcon style={{ float: "left", marginTop: "3px", marginRight: "10px", fontSize: "20px" }} />
                            <p style={{ display: "inline", fontSize: "18px", fontWeight: "bold" }}>Liste des évènements ...</p>
                        </div>
                    </div>
                    {props.admin ? (
                        <>
                            <GeneralData eventId={eventId} admin={true} />
                            <ClientContact />
                            <Program admin={true} />
                            <Presences />
                            <Diffusion admin={true} />
                        </>) : (
                        <>
                            <GeneralData eventId={eventId} admin={false} />
                            <Program admin={false} />
                            <Diffusion admin={false} />
                        </>)
                    }
                </div>
            )
    );
}
