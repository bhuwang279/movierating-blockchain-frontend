import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, withStyles } from "@material-ui/core/styles";
import React from "react";
import roboto from "typeface-roboto"
import robotoCondensed from "typeface-roboto-condensed"

const styles = createStyles({
  "@global": {
    "@import": "url('https://rsms.me/inter/inter.css')",
    '@font-face': [roboto,robotoCondensed],
  }
});

const Baseline = withStyles(styles, {
  name: "Baseline"
})(() => <CssBaseline />);
Baseline.displayName = "Baseline";

export default Baseline;
