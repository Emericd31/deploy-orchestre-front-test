import React from "react";
import PersonalData from "../../components/Board/PersonalData";
import PersonInCharge from "../../components/Board/PersonInCharge";
import Instruments from "../../components/Board/Instruments";
import HealthCard from "../../components/Board/HealthCard";
import ImageRight from "../../components/Board/ImageRight";
import Administration from "../../components/Board/Administration";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import { RedButton, OrangeButton } from "../../components/General/StyledComponents/StyledComponents";
import "../../App.css";

export default function EventDetailsPageGestion() {
    const [personalDataOpen, setPersonalDataOpen] = React.useState(false);
    const [personInChargeOpen, setPersonInChargeOpen] = React.useState(false);
    const [instrumentsOpen, setInstrumentsOpen] = React.useState(false);
    const [healthCardOpen, setHealthCardOpen] = React.useState(false);
    const [imageRightOpen, setImageRightOpen] = React.useState(false);

    return (
        <div className="body" style={{
            paddingBottom: "20px",
            filter: (personalDataOpen || personInChargeOpen || instrumentsOpen || healthCardOpen || imageRightOpen) ? "blur(3px)" : "none"
        }}>
            <div style={{ marginBottom: "20px" }}>
                <p style={{ fontWeight: "bold", fontSize: "18px", display: "inline", marginLeft: "20px" }}>ADMIN - Karine LAFFORGUE</p>
                <div style={{ display: "inline", right: "10%", position: "absolute", cursor: "pointer" }}>
                    <OrangeButton style={{ float: "left", marginRight: "10px" }} ><LockOpenIcon /></OrangeButton>
                    <RedButton><DeleteIcon /></RedButton>
                </div>
            </div>
            <Administration />
            <PersonalData functionCallback={(value) => setPersonalDataOpen(value)} />
            <PersonInCharge functionCallback={(value) => setPersonInChargeOpen(value)} />
            <Instruments functionCallback={(value) => setInstrumentsOpen(value)} />
            <HealthCard functionCallback={(value) => setHealthCardOpen(value)} />
            <ImageRight functionCallback={(value) => setImageRightOpen(value)} />
        </div>
    );
}
