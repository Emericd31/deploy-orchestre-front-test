import React from "react";
import EventTabGestion from "../../components/Event/EventTabGestion";
import { Link as LinkRouter } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { GreenButton } from '../../components/General/StyledComponents/StyledComponents'; 
import "../../App.css"

export default function EventPage() {
  return (
    <div className="body">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "20px", display: "inline" }}>Gestion des évènements</h2>
        <LinkRouter to="/add/event" style={{ textDecoration: "none" }}>
          <GreenButton variant="contained" style={{ ddisplay: "inline", right: "10%", position: "absolute" }}>
            <AddIcon style={{ marginRight: "20px" }} />Ajouter un évènement
          </GreenButton>
        </LinkRouter>
      </div>
      <EventTabGestion />
    </div>
  );
}
