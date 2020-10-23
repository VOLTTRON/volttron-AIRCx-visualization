// Copyright (c) 2020, Battelle Memorial Institute
// All rights reserved.

// 1.  Battelle Memorial Institute (hereinafter Battelle) hereby grants
//     permission to any person or entity lawfully obtaining a copy of this
//     software and associated documentation files (hereinafter "the Software")
//     to redistribute and use the Software in source and binary forms, with or
//     without modification.  Such person or entity may use, copy, modify, merge,
//     publish, distribute, sublicense, and/or sell copies of the Software, and
//     may permit others to do so, subject to the following conditions:

//     -   Redistributions of source code must retain the above copyright notice,
//         this list of conditions and the following disclaimers.

//     -          Redistributions in binary form must reproduce the above copyright
//         notice, this list of conditions and the following disclaimer in the
//         documentation and/or other materials provided with the distribution.

//     -          Other than as used herein, neither the name Battelle Memorial Institute
//         or Battelle may be used in any form whatsoever without the express
//         written consent of Battelle.

// 2. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//     AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//     IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//     ARE DISCLAIMED. IN NO EVENT SHALL BATTELLE OR CONTRIBUTORS BE LIABLE FOR
//     ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
//     DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
//     SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
//     CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
//     LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
//     OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
//     DAMAGE.

// The views and conclusions contained in the software and documentation are those
// of the authors and should not be interpreted as representing official policies,
// either expressed or implied, of the FreeBSD Project.

// This material was prepared as an account of work sponsored by an agency of the
// United States Government. Neither the United States Government nor the United
// States Department of Energy, nor Battelle, nor any of their employees, nor any
// jurisdiction or organization that has cooperated in the development of these
// materials, makes any warranty, express or implied, or assumes any legal
// liability or responsibility for the accuracy, completeness, or usefulness or
// any information, apparatus, product, software, or process disclosed, or
// represents that its use would not infringe privately owned rights.

// Reference herein to any specific commercial product, process, or service by
// trade name, trademark, manufacturer, or otherwise does not necessarily
// constitute or imply its endorsement, recommendation, or favoring by the
// United States Government or any agency thereof, or Battelle Memorial Institute.
// The views and opinions of authors expressed herein do not necessarily state or
// reflect those of the United States Government or any agency thereof.

// PACIFIC NORTHWEST NATIONAL LABORATORY
// operated by
// BATTELLE for the UNITED STATES DEPARTMENT OF ENERGY
// under Contract DE-AC05-76RL01830

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  withWidth,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { selectMode, setMode } from "controllers/common/action";
import { selectUser } from "controllers/user/action";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { routes } from "routes";
import { ConditionalWrapper } from "utils/utils";
import MuiLink from "./MuiLink";
import styles from "./styles";

class MuiNavigation extends React.Component {
  constructor(props) {
    super(props);

    const { page } = props;
    this.home = page && page.path === "/";
    this.state = {
      open: true,
      windowWidth: window.innerWidth,
    };
  }

  handleChange = (key) => (event, value) => {
    const { mode } = this.props;
    switch (key) {
      case "route":
        if (mode) {
          this.props.setMode({
            ...mode,
            mode: mode.modes.length > 0 ? mode.modes[0] : null,
          });
        }
        break;
      default:
        this.setState({ [key]: value });
    }
  };

  render() {
    const { classes, page, mode, user } = this.props;
    const { open } = this.state;
    const name = page && page.name;
    const temp = routes.filter(
      (route) =>
        !route.hidden &&
        (!route.admin ||
          (route.admin && _.get(user, "scope", "").includes("admin")))
    );
    const indent = !_.isUndefined(_.get(mode, ["mode", "indent"]))
      ? mode.mode.indent
      : page.indent;
    const navWidth = indent ? 200 : 50;
    const indentWidth = indent ? 250 : 50;
    return (
      <Drawer
        className={classes.drawer}
        style={{ width: `${indentWidth - 20}px` }}
        variant="persistent"
        anchor="left"
        open={open}
        PaperProps={{ style: { width: `${navWidth}px`, overflow: "hidden" } }}
      >
        <div className={classes.toolbar} />
        <List component="nav" className={classes.list}>
          {temp.map((route) => {
            const MuiIcon = route.icon;
            const selected = route.name === name;
            return (
              <ListItem
                button
                disableGutters
                className={clsx(
                  selected
                    ? classes.listItemSelected
                    : classes.listItemNotSelected
                )}
                key={`list-item-${route.name}`}
                component={MuiLink}
                to={route.path}
                tabIndex={route.index}
                onClick={this.handleChange("route")}
              >
                {indent ? (
                  <React.Fragment>
                    <ListItemIcon
                      key={`list-item-icon-${route.name}`}
                      className={classes.listItemIcon}
                    >
                      <MuiIcon color={selected ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText
                      key={`list-item-text-${route.name}`}
                      className={clsx(classes.listItemText)}
                      color={selected ? "primary" : "inherit"}
                      primary={
                        <ConditionalWrapper
                          condition={selected}
                          wrapper={(c) => <strong>{c}</strong>}
                        >{`${
                          route.short ? route.short : route.label
                        }`}</ConditionalWrapper>
                      }
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Tooltip title={route.label}>
                      <ListItemIcon key={`list-item-icon-${route.name}`}>
                        <MuiIcon color={selected ? "primary" : "inherit"} />
                      </ListItemIcon>
                    </Tooltip>
                  </React.Fragment>
                )}
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    );
  }
}

MuiNavigation.propTypes = {
  page: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: selectUser(state),
  mode: selectMode(state),
});

const mapActionToProps = {
  setMode,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withWidth()(withStyles(styles)(MuiNavigation)));
