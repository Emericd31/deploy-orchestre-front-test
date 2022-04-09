import React from "react";
import GeneralDataTab from "../../components/User/Account/GeneralDataTab";
import InstrumentsTab from "../../components/User/Account/InstrumentsTab";
import HealthCardTab from "../../components/User/Account/HealthCardTab";
import ImageRightTab from "../../components/User/Account/ImageRightTab";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import { RedButton, OrangeButton } from "../../components/General/StyledComponents/StyledButtons";
import "../../App.css";
import LegualGardiansTab from "../../components/User/Account/LegalGuardiansTab";
import VehiclesTab from "../../components/User/Account/VehiclesTab";
import AdministrationTab from "../../components/User/Account/AdministrationTab";

export default function MyAccouuntPage() {
    const [personalDataOpen, setPersonalDataOpen] = React.useState(false);
    const [personInChargeOpen, setPersonInChargeOpen] = React.useState(false);
    const [instrumentsOpen, setInstrumentsOpen] = React.useState(false);
    const [healthCardOpen, setHealthCardOpen] = React.useState(false);
    const [imageRightOpen, setImageRightOpen] = React.useState(false);
    const [vehicleOpen, setVehicleOpen] = React.useState(false);

    return (
        <div className="body" style={{
            paddingBottom: "20px",
            filter: (personalDataOpen || personInChargeOpen || instrumentsOpen || healthCardOpen || imageRightOpen || vehicleOpen) ? "blur(3px)" : "none"
        }}>
            <div style={{ marginBottom: "20px" }}>
                <p style={{ fontWeight: "bold", fontSize: "18px", display: "inline", marginLeft: "20px" }}>ADMIN - Karine LAFFORGUE</p>
                <div style={{ display: "inline", right: "10%", position: "absolute", cursor: "pointer" }}>
                    <OrangeButton style={{ float: "left", marginRight: "10px" }} ><LockOpenIcon /></OrangeButton>
                    <RedButton><DeleteIcon /></RedButton>
                </div>
            </div>
            <AdministrationTab />
            <GeneralDataTab functionCallback={(value) => setPersonalDataOpen(value)} />
            <LegualGardiansTab functionCallback={(value) => setPersonInChargeOpen(value)} />
            <InstrumentsTab functionCallback={(value) => setInstrumentsOpen(value)} />
            <HealthCardTab functionCallback={(value) => setHealthCardOpen(value)} />
            <VehiclesTab functionCallback={(value) => setVehicleOpen(value)} />
            <ImageRightTab functionCallback={(value) => setImageRightOpen(value)} />
        </div>
    );
}
