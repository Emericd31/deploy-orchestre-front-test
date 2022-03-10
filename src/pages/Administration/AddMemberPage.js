import React from "react";

import SignupForm from "../../components/User/forms/SignupForm";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MenuComponent from "../../components/MenuComponent";
import "../../App.css";
import { Paper } from "@mui/material";

export default function AddMemberPage() {
  return (
    <div className="body">
      <MenuComponent title="Inscription"></MenuComponent>
      <div style={{ display: "flex", flexDirection: "Column", alignItems: "center", justifyContent: "center" }}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ margin: "20px" }}>
          Créer un compte membre
        </Typography>
        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <Paper style={{ padding: "20px" }}>
            <SignupForm />
          </Paper>
        </div>
      </div>
    </div>
  );
}
