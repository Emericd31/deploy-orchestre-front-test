import React, { useEffect } from "react";
import GeneralDataTab from "../../components/User/Account/GeneralDataTab";
import InstrumentsTab from "../../components/User/Account/InstrumentsTab";
import HealthCardTab from "../../components/User/Account/HealthCardTab";
import ImageRightTab from "../../components/User/Account/ImageRightTab";
import "../../App.css";
import LegualGardiansTab from "../../components/User/Account/LegalGuardiansTab";
import VehiclesTab from "../../components/User/Account/VehiclesTab";
import AdministrationTab from "../../components/User/Account/AdministrationTab";
import { getPersonalData } from "../../GraphQL/queries/UserQueries";
import LoginTab from "../../components/User/Account/LoginTab";

export default function MyAccouuntPage() {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [user, setUser] = React.useState([]);
    const [personalDataOpen, setPersonalDataOpen] = React.useState(false);
    const [personInChargeOpen, setPersonInChargeOpen] = React.useState(false);
    const [instrumentsOpen, setInstrumentsOpen] = React.useState(false);
    const [healthCardOpen, setHealthCardOpen] = React.useState(false);
    const [imageRightOpen, setImageRightOpen] = React.useState(false);
    const [vehicleOpen, setVehicleOpen] = React.useState(false);

    useEffect(() => {
        getPersonalData().then((res) => {
            setUser(res.currentUser);
            setIsLoaded(true);
        });
    }, []);

    return (
        isLoaded ? (
            <div className="body" style={{
                paddingBottom: "20px",
                filter: (personalDataOpen || personInChargeOpen || instrumentsOpen || healthCardOpen || imageRightOpen || vehicleOpen) ? "blur(3px)" : "none"
            }}>
                <div style={{ marginBottom: "20px" }}>
                    <p style={{ fontWeight: "bold", fontSize: "18px", display: "inline", marginLeft: "20px" }}>{user.lastName + " " + user.firstName}</p>
                </div>
                <AdministrationTab />
                <LoginTab />
                <GeneralDataTab functionCallback={(value) => setPersonalDataOpen(value)} />
                <LegualGardiansTab functionCallback={(value) => setPersonInChargeOpen(value)} />
                <InstrumentsTab functionCallback={(value) => setInstrumentsOpen(value)} />
                <HealthCardTab functionCallback={(value) => setHealthCardOpen(value)} />
                <VehiclesTab functionCallback={(value) => setVehicleOpen(value)} />
                <ImageRightTab functionCallback={(value) => setImageRightOpen(value)} />
            </div>
        ) : ""
    );
}
