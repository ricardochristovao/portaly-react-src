//From dependencies
import React from "react";

//From services
import InitPath from "../../../services/InitPath";

//From Material-ui
import Grid from "@material-ui/core/Grid";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import RemoveIcon from "@material-ui/icons/Remove";
import useStyles from "./style";
import Button from '@material-ui/core/Button';

const TopHeader = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      className={classes.root}
    >
      <Grid item className={classes.hover}>
        <WhatsAppIcon className={classes.icon} />
        <Typography variant="body1" component="span" style={{ marginRight: "20px" }}>
          (31) 2522-2915
        </Typography>
      </Grid>
      <Divider orientation="vertical" flexItem className={classes.divider} />
      <Grid item>
        <AccessTimeIcon className={classes.icon} />
        <Typography variant="body1" component="span">
          Segunda a Sexta
          <RemoveIcon className={classes.svg} /> 8a.m
          <ArrowForwardIcon className={classes.svg} />
          18p.m
        </Typography>
      </Grid>
      <Divider orientation="vertical" style={{ marginLeft: "20px" }} flexItem className={classes.divider} />
      <div className={classes.button}>
        <Button href={`${InitPath}/sobre`} className={classes.link}>
          <Typography variant="body1" component="span" className={classes.text}>Sobre nós</Typography>
        </Button>
      </div>
      <Divider orientation="vertical" flexItem className={classes.divider} />
    </Grid>
  );
};

export default TopHeader;
