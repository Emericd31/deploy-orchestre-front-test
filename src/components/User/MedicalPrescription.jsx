import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Edit, Delete } from "@mui/icons-material";
import Popup from "../General/Popups/Popup";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

class MedicalPrescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      isSelected: false,
      filename: props.filename,
      extension: props.extension,
      uploadDate: props.uploadDate,
      openPopupConfirmDelete: false,
    };
  }

  downloadFile = () => {
    window.open("http://www.africau.edu/images/default/sample.pdf");
  }

  render() {
    return (
      <>
        <div
          style={{
            padding: 3,
            marginLeft: "2px",
            marginRight: "2px",
            color: "black",
            fontWeight: "bold",
            background: "white",
            color: "black",
            borderBottom: "1px solid gray"
          }}
          elevation={3}
        >
          <Grid item container direction="row" style={{ textAlign: "center" }}>
            <Grid item xs={1} md={2} lg={2} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              {
                this.state.extension === ".pdf" ?
                  (
                    <PictureAsPdfIcon sx={{ fontSize: 30 }} />
                  ) : (
                    <ImageIcon />
                  )
              }
            </Grid>
            <Grid item xs={11} md={8} lg={8} style={{ textAlign: "left" }}>
              <p>{this.state.filename}</p>
            </Grid>

            <Grid item xs={6} md={1} lg={1} style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "90%", marginRight: "10%" }}
                onClick={() => this.downloadFile()}
              >
                <FileDownloadIcon />
              </Button>
            </Grid>
            <Grid item xs={6} md={1} lg={1} style={{ display: "flex", alignItems: "center", paddingRight: "10px" }}>
              <Button
                variant="contained"
                style={{
                  width: "90%",
                  marginLeft: "10%",
                  backgroundColor: "#c62828"
                }}
                onClick={() =>
                  this.setState({ openPopupConfirmDelete: true })
                }
              >
                <Delete />
              </Button>
            </Grid>
          </Grid>
        </div>

        <Popup
          title="Supprimer une ordonnance"
          length="md"
          openPopup={this.state.openPopupConfirmDelete}
          parentCallback={() =>
            this.setState({ openPopupConfirmDelete: false })
          }
        >
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <p>
                Etes-vous de sûr de vouloir supprimer l'ordonnance{" "}
                {'"' +
                  this.state.filename +
                  '"'}
                de vos ordonnances
              </p>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.setState({ openPopupConfirmDelete: false })}
              >
                Annuler
              </Button>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#FF4D4D", color: "white" }}
                onClick={() => this.props.parentCallback(this.state.id)}
              >
                Confirmer
              </Button>
            </Grid>
          </Grid>
        </Popup>
      </>
    );
  }
}

export default MedicalPrescription;
