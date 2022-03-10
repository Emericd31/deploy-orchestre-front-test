import React from "react";
import MenuComponent from "../../components/MenuComponent";
import ProfilManagementComponent from "../../components/User/ProfilManagementComponent";

import PropTypes from "prop-types";
import clsx from "clsx";
import { createTheme } from "@mui/material";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ExposureIcon from "@mui/icons-material/Exposure";
import FlipToFrontIcon from "@mui/icons-material/FlipToFront";
import PowerIcon from "@mui/icons-material/Power";
import { AppBar } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const backgroundGradient =
  "linear-gradient( 135deg, #11bbdd 0%, #1976d2 50%, #050055 100%)";

const useColorlibStepIconStyles = createTheme({
  root: {
    backgroundColor: "#bbb",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage: backgroundGradient,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.5)",
  },
  completed: {
    backgroundImage: backgroundGradient,
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PowerIcon />,
    2: <ContactSupportIcon />,
    3: <ExposureIcon />,
    4: <FlipToFrontIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

class NewProfilPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="root">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Compléter son profil
            </Typography>
          </Toolbar>
        </AppBar>
        <ProfilManagementComponent />
      </div>
    );
  }
}

export default NewProfilPage;
