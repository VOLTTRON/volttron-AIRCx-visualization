import { createMuiTheme } from "@material-ui/core/styles";
import {
  background,
  error,
  lightest,
  primary,
  secondary
} from "constants/palette";

const typography = {
  useNextVariants: true,
  fontFamily: ['"Roboto"', "sans-serif"].join(",")
};

const overrides = {
  MuiCssBaseline: {
    "@global": {
      body: {
        // backgroundImage: 'url("/images/background-lg.png")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        backgroundAttachment: "fixed",
        fontFamily: "'Roboto', sans-serif",
        overflowY: "hidden"
      }
    }
  },
  MuiButtonBase: {
    root: {
      disableRipple: true
    }
  },
  MuiStepIcon: {
    root: {
      "&$completed": {
        color: secondary
      },
      "&$active": {
        color: secondary
      }
    },
    active: {},
    completed: {}
  },
  MuiList: {
    root: {
      width: "100%"
    },
    padding: {
      paddingTop: "0",
      paddingBottom: "0",
      marginTop: "3px"
    }
  },
  MuiExpansionPanelSummary: {
    root: {
      padding: "0 16px 0 16px"
    }
  },
  MuiExpansionPanelDetails: {
    root: {
      padding: "0"
    }
  }
};

const appBar = {
  height: "48px"
};

const palette = {
  type: "light",
  primary: {
    main: primary,
    contrastText: lightest
  },
  secondary: {
    main: secondary,
    contrastText: lightest
  },
  error: {
    main: error,
    contrastText: lightest
  },
  background: {
    paper: lightest,
    default: background
  }
};

const mixins = {
  toolbar: {
    minHeight: 48,
    "@media (min-width:0px) and (orientation: landscape)": {
      minHeight: 48
    },
    "@media (min-width:600px)": {
      minHeight: 48
    }
  }
};

const name = "Yellow Orange Science Blue Spectacled Bear";

const theme = createMuiTheme({
  mixins,
  typography,
  overrides,
  appBar,
  palette,
  name
});

export default theme;
