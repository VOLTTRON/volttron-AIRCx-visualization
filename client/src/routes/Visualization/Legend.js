import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import filters from "constants/filters";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import styles from "./styles";

class Legend extends React.Component {
  render() {
    const { classes, form } = this.props;
    const filter = filters.parse(_.get(form, "filter", "all"));
    return (
      <div className={classes.legend}>
        {_.concat(filters.values, [
          filters.parse("no-data"),
          filters.parse("outside-range"),
        ])
          .filter((v) => filter.show(v))
          .map((v) => (
            <React.Fragment key={`filter-frag-${v.name}`}>
              <div
                key={`filter-color-${v.name}`}
                className={classes.legendMark}
                style={{ background: v.color }}
              />
              <Typography
                key={`filter-label-${v.name}`}
                className={classes.legendLabel}
              >
                <strong>{v.single}</strong>
              </Typography>
            </React.Fragment>
          ))
          .reduce(
            (p, v, i, a) =>
              _.concat(
                i < a.length - 1
                  ? [
                      <div
                        key={`filter-spacer-${i}`}
                        className={classes.legendSpacer}
                      />,
                    ]
                  : null,
                v,
                p
              ),
            []
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Legend));
