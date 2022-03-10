import React from "react";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme } from "@mui/material";
import SignInForm from '../../components/User/forms/SignInForm'

const theme = createTheme();

export default function LoginPage() {
  return (
    <div style={{ height: '100vh', display: "flex", flexDirection: "Column", alignItems: "center", justifyContent: "center" }}>
      <Avatar>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" style={{ margin: "20px" }}>
        Connexion
      </Typography>
      <SignInForm />
      {/* <Link key={"forgot-password-link"} href="signup">
        mot de passe oublié
      </Link> */}
    </div>
  );
}
