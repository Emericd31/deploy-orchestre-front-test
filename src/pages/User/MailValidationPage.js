import React, { Component, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { verifyUser } from "../../GraphQL/mutations/UserMutations";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import "../../App.css";

export default function MailValidationPage() {
  const [description, setDescription] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  let params = useParams();
  let token = params.token;

  function verifyMail(token) {
    verifyUser(token).then((res) => {
      if (res.verifyUser.statusCode === 200) {
        setSuccess(true);
        setDescription("Votre compte est maintenant vérifié.");
      } else if (res.verifyUser.statusCode === 405) {
        setSuccess(true);
        setDescription("Votre compte est déjà vérifié.");
      } else {
        setSuccess(false);
        setDescription(res.verifyUser.description);
      }
    });
    return null;
  }

  useEffect(() => {
    verifyMail(token);
  }, [])

  return (
    <div>
      <div className="body">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Validation du compte
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          paragraph
        >
          {description}
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="primary" component={Link} to="/signin">
              Se connecter
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}