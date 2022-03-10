import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { blue } from '@mui/material/colors';

export default function Popup(props) {
  // length : xs | sm | md | lg | xs
  const { title, children, openPopup, length, closable } = props;

  const primaryButton = {
    color: "#ffffff",
    background: "red",
    opacity: "0.7",
    borderColor: "#f6b93b",
    float: "right",
    marginLeft: "50px",
  };

  const crossIcon = {
    color: "white",
  };

  return (
    <Dialog open={openPopup} fullWidth={true} maxWidth={length} PaperProps={{
      style: {
        backgroundColor: "#ffffff",
        boxShadow: 'none',
      },
    }}>
      <DialogTitle>
        <div>
          {title}
          {closable !== "false" ? (
            <Button
              style={primaryButton}
              variant="contained"
              color="inherit"
              onClick={() => props.parentCallback("")}
            >
              <CloseIcon sx={{ color: blue[100] }} />
            </Button>) : ""
          }
        </div>
      </DialogTitle>
      <DialogContent dividers >{children}</DialogContent>
    </Dialog>
  );
}
