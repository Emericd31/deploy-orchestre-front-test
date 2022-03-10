import React from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { common } from "@mui/material/colors";
import { Button } from "@mui/material";
import { Link } from "@mui/material";

export default function ProfileCompletedPage() {
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <div style={{ width: "40%", minWidth: "250px", padding: "40px", display: "flex", flexDirection:"column", alignItems: "center", backgroundColor: "#2F7D31", borderRadius: "30px", boxShadow: "20px 10px 10px gray" }}>
                    <CheckCircleOutlineIcon sx={{ color: common.white, fontSize: 50 }} />
                    <p align="center" style={{color: "white", marginTop: "25px"}}>Profil complété avec succès</p>
                    <Button variant="contained" component={Link} href="/board" style={{ width:"200px", boxShadow: "10px 5px 5px rgba(24, 118, 210, 0.5)" }}>Accueil</Button>
                </div>
            </div>
        </div>
    );
}
