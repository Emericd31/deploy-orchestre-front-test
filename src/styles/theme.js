export const colors = {
  gray_background_primary: "#E2E2E2",
  gray_background_secondary: "#C2C2C2",
  gray_background_ternary: "#D2E5EF",
  light_background_text: "#363537",
  dark_background_text: "white",
  light_secondary_text: "gray",
  dark_secondary_text: "lightgray",
  sii_dark_blue_primary: "#0059A3",
  sii_dark_blue_secondary: "#37408D",
  sii_blue: "#35B7FF",
  sii_light_blue_primary: "#53A2DA",
  sii_light_blue_secondary: "#2A86C4",
  sii_light_blue_ternary: "#E1EBEB",
  sii_black: "#1E1E1E",
  sii_gray: "#707070",
  sii_dark_grey: "#404040",
  sii_light_grey: "#A0A0A0",
  black_background: "#282C34",
  sii_pink: "#E84654",
  white: "#FFFFFF",
  black: "#000000",
  sii_green: "#86BC25",
  sii_light_green: "#BEF1B9",
  sii_light_pale_green: "#A0DE97",
  sii_orange: "#f3995b",
  sii_purple: "#75519b",
  turqoise: "#2F6A64",
  sii_pale_pink: "#F4ACAC",
  sii_pale_red: "#B55757",
  dark_red: "#7E0404",
  sii_pale_purple: "#D2ACF4",
  dark_purple: "#5A076E",
  sii_pale_yellow: "#AA712E",
  sii_brown: "#9C8055",
};

export const lightTheme = {
  body: colors.gray_background_primary,
  text: colors.light_background_text,
  secondary_text: colors.light_secondary_text,
  toggleBorder: colors.white,
  gradient: "linear-gradient(#39598A, #79D7ED)",
  addButton: {
    textColor: colors.white,
    backgroundColor: colors.sii_dark_blue_primary,
    hoverBackground: colors.sii_light_blue_secondary,
    hoverTextColor: colors.white,
    disabledBackgroundColor: colors.gray_background_secondary,
    disabledTextColor: colors.sii_gray,
  },
  modifyButton: {
    textColor: colors.white,
    backgroundColor: colors.gray_background_primary,
    hoverBackground: colors.gray_background_secondary,
    hoverTextColor: colors.black,
  },
  sortButton: {
    textColor: colors.black,
    backgroundColor: colors.sii_light_blue_primary,
    hoverBackground: colors.sii_light_blue_secondary,
    hoverTextColor: colors.black,
  },
  deleteButton: {
    textColor: colors.black,
    backgroundColor: colors.sii_light_blue_primary,
    hoverBackground: colors.sii_light_blue_secondary,
    hoverTextColor: colors.black,
  },
  exportButton: {
    textColor: colors.black,
    backgroundColor: colors.sii_light_blue_primary,
    hoverBackground: colors.sii_light_blue_secondary,
    hoverTextColor: colors.black,
  },
  cancelButton: {
    textColor: colors.white,
    backgroundColor: "#1E1E1E",
    hoverBackground: colors.black_background,
    hoverTextColor: colors.black,
  },
  confirmButton: {
    textColor: colors.white,
    backgroundColor: "#1E1E1E",
    hoverBackground: colors.black_background,
    hoverTextColor: colors.black,
  },
  exportCsvOrTxtButton: {
    textColor: colors.white,
    backgroundColor: "#1E1E1E",
    hoverBackground: colors.black_background,
    hoverTextColor: colors.black,
  },
  appBar: {
    backgroundColor: colors.sii_dark_blue_primary,
    textColor: colors.white,
    searchBarbackgroundColor: "#F5F5F5",
  },
  menu_left: {
    backgroundColor: colors.white,
  },
  table_head: {
    backgroundColor: colors.sii_dark_blue_primary,
    textColor: colors.white,
    borderColor: "grey",
  },
  table_row: {
    backgroundColor: colors.white,
    textColor: colors.black,
    borderColor: "grey",
  },
  table_cell: {
    backgroundColor: colors.sii_light_blue_ternary,
    textColor: colors.black,
    borderColor: "grey",
  },
  table_cell_scan: {
    backgroundColor: "#CDE5F4",
    textColor: colors.black,
    borderColor: "grey",
  },
  popup: {
    backgroundColor: colors.gray_background_primary,
    titleColor: colors.black,
    textColor: colors.black,
  },
  paper: {
    backgroundColor: colors.white,
  },
  date_picker: {
    backgroundColor: colors.white,
    weekDay: colors.light_secondary_text,
    resetBtn: colors.light_secondary_text,
    iconArrow: colors.light_secondary_text,
    flipperButton: colors.white,
    resetBtnHover: colors.gray_background_primary,
    selected_day: colors.gray_background_primary,
    selected_day_extremity: "#4285f4",
  },
  textField: {
    borderColor: colors.sii_dark_blue_primary,
    disabledBorderColor: colors.gray_background_primary,
    errorBorderColor: colors.sii_pink,
    inputText: colors.black,
    helperText: colors.sii_pink,
    labelText: colors.black,
  },
  card: {
    backgroundColor: colors.gray_background_primary,
  },
  cardDatasourceType: {
    backgroundColor: colors.white,
  },
  attributes_categories: {
    regexBackgroundColor: "linear-gradient(#74D0F1, #318CE7)",
    dictionaryBackgroundColor: "linear-gradient(#FFCB60, #DE9816)",
    draggingColorRegex: "orange",
    draggingColorDictionary: "blue",
    addBackgroundColor: colors.white,
    boxShadowColor: colors.sii_gray,
    addTextColor: colors.sii_gray,
    cardBackgroundColor: colors.gray_background_primary,
    cardTextColor: colors.sii_gray,
    cardTypeBackgroundDictionaryColor: colors.sii_brown,
    cardTypeBackgroundRegexColor: colors.sii_dark_blue_primary,
  },
  attribute_item: {
    regexBackgroundColor: "linear-gradient(#318CE7, #74D0F1)",
    dictionaryBackgroundColor: "linear-gradient(#DE9816, #FFCB60)",
  },
  information_popup: {
    backgroundColor: colors.white,
    color: colors.black,
    borderColor: colors.black,
  },
  stepper: {
    textColor: colors.black,
  },
  dividerWithText: {
    color: colors.sii_gray,
  },
  bubbleText: {
    color: colors.black,
  },
  bubbleDatasources: {
    backgroundColor: colors.sii_light_pale_green,
  },
  bubbleAttributes: {
    backgroundColor: colors.sii_pale_pink,
  },
  bubbleData: {
    backgroundColor: colors.sii_pale_purple,
  },
  popover: {
    backgroundColor: colors.gray_background_primary,
    textColor: colors.black,
  },
  link: {
    color: colors.black,
  },
  paper_include: "#87CEEB",
  paper_exclude: colors.sii_light_blue_primary,
  icons: {
    menu_icon: {
      backgroundColor: colors.sii_gray,
    },
    done_icon: {
      backgroundColor: colors.sii_green,
    },
    filter_list_icon: {
      backgroundColor: colors.sii_gray,
    },
    search_icon: {
      backgroundColor: colors.sii_gray,
    },
    edit_icon: {
      backgroundColor: colors.sii_dark_blue_primary,
    },
    delete_icon: {
      backgroundColor: colors.sii_dark_blue_primary,
    },
    delete_icon_on_blue_background: {
      backgroundColor: colors.white,
    },
    power_settings: {
      backgroundColor: colors.sii_dark_blue_primary,
    },
    close_icon: {
      backgroundColor: colors.sii_pink,
    },
    clear_icon: {
      backgroundColor: colors.sii_pink,
    },
    check_icon: {
      backgroundColor: colors.sii_green,
    },
    help_icon: {
      backgroundColor: colors.black,
    },
    keyboard_arrow_up_and_down_icon: {
      backgroundColor: colors.black,
    },
  },
  jobs: {
    inProgressBackground: "radial-gradient(circle, #74D0F1 10%, #318CE7)",
    stoppedBackground: "radial-gradient(circle, #E35C5C 10%, #F11712)",
    notStartedBackground: "radial-gradient(circle, #FFE000 10%, #799F0C)",
    finishedBackground: "radial-gradient(circle, #FE3FF6 10%, #A804A1)",
  },
  report: {
    databaseBackground: colors.gray_background_secondary,
    tableBackground: colors.gray_background_secondary,
  },
  datasourceScanRatioInfo: {
    deltaplaneFrontColors: [
      colors.sii_light_blue_primary,
      colors.sii_pale_red,
      colors.sii_pale_yellow,
      colors.sii_light_green,
      colors.sii_dark_blue_primary,
    ],
    deltaplaneBackColor: colors.sii_gray,
  },
  attributeClassifications: {
    public: colors.sii_dark_blue_secondary,
    private: colors.sii_pale_red,
    sensitive: colors.sii_pale_yellow,
  }, 
  scanComponent: {
    backgroundColor: colors.white, 
  },
  upcomingJobsDrawer: {
    handleColor: colors.sii_dark_blue_primary,
    backgroundColor: colors.gray_background_ternary,
    scanColor: colors.sii_dark_blue_primary,
    catalogingColor: colors.turqoise,
  }
};

export const darkTheme = {
  body: colors.black_background,
  text: "#FAFAFA",
  secondary_text: colors.dark_secondary_text,
  toggleBorder: "#6B8096",
  gradient: "linear-gradient(#091236, #1E215D)",
  addButton: {
    textColor: colors.white,
    backgroundColor: colors.sii_dark_blue_primary,
    hoverBackground: colors.sii_blue,
    hoverTextColor: colors.black,
    disabledBackgroundColor: "#5c5b5b",
    disabledTextColor: "#6B8096",
  },
  modifyButton: {
    textColor: colors.white,
    backgroundColor: "#1E1E1E",
    hoverBackground: colors.black_background,
    hoverTextColor: colors.black,
  },
  sortButton: {
    textColor: colors.black,
    backgroundColor: "#35B7FF",
    hoverBackground: "#9E55FC",
    hoverTextColor: colors.black,
  },
  deleteButton: {
    textColor: colors.white,
    backgroundColor: colors.black,
    hoverBackground: colors.black_background,
    hoverTextColor: colors.black,
  },
  exportButton: {
    textColor: colors.white,
    backgroundColor: colors.black,
    hoverBackground: colors.black_background,
    hoverTextColor: colors.black,
  },
  cancelButton: {
    textColor: colors.white,
    backgroundColor: colors.sii_dark_blue_primary,
    hoverBackground: colors.sii_blue,
    hoverTextColor: colors.black,
    disabledBackgroundColor: "#5c5b5b",
    disabledTextColor: "#6B8096",
  },
  confirmButton: {
    textColor: colors.white,
    backgroundColor: colors.sii_dark_blue_primary,
    hoverBackground: colors.sii_blue,
    hoverTextColor: colors.black,
    disabledBackgroundColor: "#5c5b5b",
    disabledTextColor: "#6B8096",
  },
  exportCsvOrTxtButton: {
    textColor: colors.white,
    backgroundColor: colors.sii_dark_blue_primary,
    hoverBackground: colors.sii_blue,
    hoverTextColor: colors.black,
    disabledBackgroundColor: "#5c5b5b",
    disabledTextColor: "#6B8096",
  },
  appBar: {
    backgroundColor: colors.sii_black,
    textColor: colors.white,
    searchBarbackgroundColor: colors.gray_background_secondary,
  },
  menu_left: {
    backgroundColor: colors.black,
  },
  table_head: {
    backgroundColor: "#1E1E1E",
    textColor: colors.white,
    borderColor: "#2d2d2d",
  },
  table_row: {
    backgroundColor: "#2d2d2d",
    textColor: colors.white,
    borderColor: "grey",
  },
  table_cell: {
    backgroundColor: colors.sii_dark_grey,
    textColor: colors.white,
    borderColor: "grey",
  },
  table_cell_scan: {
    backgroundColor: "#994B4B",
    textColor: colors.white,
    borderColor: "grey",
  },
  popup: {
    backgroundColor: "#2d2d2d",
    titleColor: colors.dark_background_text,
    textColor: colors.white,
  },
  paper: {
    backgroundColor: colors.light_background_text,
  },
  date_picker: {
    backgroundColor: colors.light_background_text,
    weekDay: colors.dark_secondary_text,
    resetBtn: colors.dark_secondary_text,
    iconArrow: colors.dark_secondary_text,
    flipperButton: "#4285f4",
    resetBtnHover: colors.black_background,
    selected_day: colors.sii_gray,
    selected_day_extremity: "#4285f4",
  },
  textField: {
    borderColor: colors.white,
    disabledBorderColor: colors.light_background_text,
    errorBorderColor: colors.sii_pink,
    inputText: colors.white,
    helperText: colors.sii_pink,
    labelText: colors.white,
  },
  card: {
    backgroundColor: colors.light_background_text,
  },
  cardDatasourceType: {
    backgroundColor: colors.sii_gray,
  },
  attributes_categories: {
    regexBackgroundColor: "linear-gradient(#1E7FCB, #3A8EBA)",
    dictionaryBackgroundColor: "linear-gradient(#AD4F09, #DF6D14)",
    draggingColorRegex: "linear-gradient(#00CCCB, #3A8EBA)",
    draggingColorDictionary: "blue",
    addBackgroundColor: colors.light_background_text,
    boxShadowColor: colors.black,
    addTextColor: colors.white,
    cardBackgroundColor: colors.black_background,
    cardBoxShadowColor: "green",
    cardTextColor: colors.white,
    cardTypeBackgroundDictionaryColor: colors.sii_brown,
    cardTypeBackgroundRegexColor: colors.sii_dark_blue_primary,
  },
  attribute_item: {
    regexBackgroundColor: "linear-gradient(#1E7FCB, #3A8EBA)",
    dictionaryBackgroundColor: "linear-gradient(#AD4F09, #DF6D14)",
  },
  information_popup: {
    backgroundColor: colors.black_background,
    color: colors.white,
    borderColor: colors.white,
  },
  stepper: {
    textColor: colors.white,
  },
  dividerWithText: {
    color: "lightgrey",
  },
  bubbleText: {
    color: colors.white,
  },
  bubbleDatasources: {
    backgroundColor: colors.turqoise,
  },
  bubbleAttributes: {
    backgroundColor: colors.dark_red,
  },
  bubbleData: {
    backgroundColor: colors.dark_purple,
  },
  popover: {
    backgroundColor: colors.black_background,
    textColor: colors.white,
  },
  link: {
    color: colors.white,
  },
  paper_include: colors.sii_orange,
  paper_exclude: colors.sii_light_green,
  icons: {
    menu_icon: {
      backgroundColor: colors.gray_background_primary,
    },
    done_icon: {
      backgroundColor: colors.sii_green,
    },
    filter_list_icon: {
      backgroundColor: colors.gray_background_primary,
    },
    search_icon: {
      backgroundColor: colors.gray_background_primary,
    },
    edit_icon: {
      backgroundColor: colors.sii_light_blue_primary,
    },
    delete_icon: {
      backgroundColor: colors.sii_light_blue_primary,
    },
    delete_icon_on_blue_background: {
      backgroundColor: colors.white,
    },
    power_settings: {
      backgroundColor: colors.sii_light_blue_primary,
    },
    close_icon: {
      backgroundColor: colors.sii_pink,
    },
    clear_icon: {
      backgroundColor: colors.sii_pink,
    },
    check_icon: {
      backgroundColor: colors.sii_green,
    },
    help_icon: {
      backgroundColor: colors.white,
    },
    keyboard_arrow_up_and_down_icon: {
      backgroundColor: colors.white,
    },
  },
  jobs: {
    inProgressBackground: "radial-gradient(circle, #318CE7 10%, #74D0F1)",
    stoppedBackground: "radial-gradient(circle, #FE2323 10%, #E23D28)",
    notStartedBackground: "radial-gradient(circle, #799F0C 10%, #FFE000)",
    finishedBackground: "radial-gradient(circle, #A804A1 10%, #FE3FF6)",
  },
  report: {
    databaseBackground: colors.sii_gray,
    tableBackground: colors.light_background_text,
  },
  datasourceScanRatioInfo: {
    deltaplaneFrontColors: [
      colors.sii_light_blue_primary,
      colors.sii_pale_red,
      colors.sii_pale_yellow,
      colors.sii_light_green,
      colors.sii_dark_blue_primary,
    ],
    deltaplaneBackColor: colors.sii_gray,
  },
  attributeClassifications: {
    public: colors.sii_dark_blue_secondary,
    private: colors.sii_pale_red,
    sensitive: colors.sii_pale_yellow,
  }, 
  scanComponent: {
    backgroundColor: "#828282", 
  },
  upcomingJobsDrawer: {
    handleColor: colors.sii_black,
    backgroundColor: colors.sii_dark_grey,
    scanColor: colors.sii_dark_blue_primary,
    catalogingColor: colors.turqoise,
  }
};

export const themeList = { light: lightTheme, dark: darkTheme };
