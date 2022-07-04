import React from "react";
import EventTabGestion from "../../components/Event/EventTabGestion";
import { Link as LinkRouter } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { GreenButton } from '../../components/General/StyledComponents/StyledButtons';
import SettingsIcon from '@mui/icons-material/Settings';
import "../../App.css"
import { IconButton } from "@mui/material";

export default function EventPage() {
  return (
    <div className="body">
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <h2 style={{ paddingLeft: "20px", display: "inline" }}>Gestion des évènements</h2>

          <LinkRouter to="/events/settings" style={{ textDecoration: "none" }}>
            <IconButton color="primary" aria-label="settings" component="span"
              style={{ margin: "5px" }}>
              <SettingsIcon style={{ color: "gray", width: "40px", height: "40px" }} />
            </IconButton>
          </LinkRouter>
        </div>
        <LinkRouter to="/add/event" style={{ textDecoration: "none" }}>
          <GreenButton variant="contained" style={{ display: "inline", right: "10%", position: "absolute" }}>
            <AddIcon style={{ marginRight: "20px", display: "inline", verticalAlign: "middle" }} />
            <p style={{ display: "inline", verticalAlign: "middle" }}>Ajouter un évènement</p>
          </GreenButton>
        </LinkRouter>
      </div>
      <EventTabGestion />
    </div>
  );
}
