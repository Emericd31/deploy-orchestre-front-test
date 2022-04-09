import React from "react";
import CustomizedStepper from "./CustomizedStepper";
import PropTypes from "prop-types";
import clsx from "clsx";
import PersonIcon from "@mui/icons-material/Person";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PersonalDataInitialization from "./InitialProfile/PersonalDataInitialization";
import InstrumentsInitialization from "./InitialProfile/InstrumentsInitialization";
import HealthInitialization from "./InitialProfile/HealthInitialization";
import ImageRightInitialization from "./InitialProfile/ImageRightInitialization";
import { Alert, createTheme } from "@mui/material";

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
    1: <PersonIcon />,
    2: <MusicNoteIcon />,
    3: <LocalHospitalIcon />,
    4: <PhotoCameraIcon />,
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

class ProfilManagementComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      components: [],
      componentsValidity: [],
      nbComponents: 0,
      currentComponentId: 0,
      steps: [],
      errorAlert: null,
      successAlert: null,
      componentComplete: [false, false, false, false],
    };
  }

  initializeFields(fieldNames) {
    let fields = {};
    fieldNames.forEach((field) => {
      fields = {
        ...fields,
        [field]: this.state[field].value,
      };
    });
    return fields;
  }

  initializeComponents() {
    let components = [];

    components.push(<PersonalDataInitialization
      functionCallback={() => this.setState({
        currentComponentId: this.state.currentComponentId + 1
      })
      }
      functionCheckCompleted={(index, bool) => this.setState(prevState => ({
        componentComplete: {
          ...prevState.componentComplete,
          [index]: bool,
        }
      }))}
    ></PersonalDataInitialization>);

    components.push(<InstrumentsInitialization
      functionCallback={() => this.setState({
        currentComponentId: this.state.currentComponentId + 1
      })}
      functionCallbackDecrement={() => this.setState({
        currentComponentId: this.state.currentComponentId - 1
      })}
      functionCheckCompleted={(index, bool) => this.setState(prevState => ({
        componentComplete: {
          ...prevState.componentComplete,
          [index]: bool,
        }
      }))}></InstrumentsInitialization>);

    components.push(<HealthInitialization
      functionCallback={() => this.setState({
        currentComponentId: this.state.currentComponentId + 1
      })}
      functionCallbackDecrement={() => this.setState({
        currentComponentId: this.state.currentComponentId - 1
      })}
      functionCheckCompleted={(index, bool) => this.setState(prevState => ({
        componentComplete: {
          ...prevState.componentComplete,
          [index]: bool,
        }
      }))}></HealthInitialization>);

    components.push(<ImageRightInitialization
      functionCallback={() => console.log("ok")}
      functionCallbackDecrement={() => this.setState({
        currentComponentId: this.state.currentComponentId - 1
      })}
      functionCheckCompleted={(index, bool) => this.setState(prevState => ({
        componentComplete: {
          ...prevState.componentComplete,
          [index]: bool,
        }
      }))}></ImageRightInitialization>);
    this.setState({
      components: components,
      componentsValidity: [false, false, true, false],
      nbComponents: components.length,
      steps: [
        "Informations personnelles",
        "Instrument(s) de musique",
        "Fiche sanitaire",
        "Droit à l'image"
      ],
    });
  }

  incrementCurrentComponentId = () => {
    this.setState({
      currentComponentId: this.state.currentComponentId + 1,
    });
  };

  decrementCurrentComponentId = () => {
    this.setState({
      currentComponentId: this.state.currentComponentId - 1,
    });
  };

  resetCurrentComponentId = () => {
    this.setState({
      currentComponentId: 0,
    });
  };

  checkFieldsValidity(fields, currentComponentId) {
    let componentsValidity = this.state.componentsValidity.slice(); // copy
    componentsValidity[currentComponentId] = true;
    fields.forEach((field) => {
      componentsValidity[currentComponentId] &= this.state[field].isValid;
    });
    this.setState({
      componentsValidity: componentsValidity,
    });
  }

  submitClick = (event, stopCondition) => {
    event.preventDefault();
    if (stopCondition) this.incrementCurrentComponentId();
    else console.log("This is the end");
  };

  componentDidMount() {
    this.initializeComponents();
  }

  render() {
    const {
      components,
      componentsValidity,
      nbComponents,
      currentComponentId,
      steps,
      componentComplete
    } = this.state;
    return (
      <div style={{
        marginTop: "5%",
        marginLeft: "10%",
        marginRight: "10%",
        overflow: "hidden"
      }}>
        <div style={{ marginBottom: "50px " }}>
          {!this.state.componentComplete[this.state.currentComponentId] ?
            (<Alert severity="info" variant="filled">Vos informations doivent être saisies avant de pouvoir accéder à l'application.</Alert>)
            :
            (<Alert severity="success" variant="filled">{steps[this.state.currentComponentId]} saisi.e.s avec succès.</Alert>)
          }
        </div>
        <div>
          <CustomizedStepper
            steps={steps}
            currentStep={currentComponentId}
            completed={componentComplete}
            ColorlibStepIcon={ColorlibStepIcon}
            backgroundGradient={backgroundGradient}
            setCurrent={(index) => this.setState({ currentComponentId: index })}
          />
        </div>
        <form
          onSubmit={(event) =>
            this.submitClick(event, currentComponentId < nbComponents - 1)
          }
        >
          {components[currentComponentId]}
          <div
            style={{
              float: "right",
              marginRight: "10%",
              marginBottom: "50px",
              marginTop: "20px",
            }}
          >
          </div>
        </form>
      </div>
    );
  }
}

export default ProfilManagementComponent;
