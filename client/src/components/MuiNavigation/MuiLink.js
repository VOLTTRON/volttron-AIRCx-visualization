import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

class MuiLink extends React.Component {
  render() {
    return <Button component={Link} {...this.props}></Button>;
  }
}

export default MuiLink;
