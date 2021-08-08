import React, { useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";

import { useStyles } from "./css/Dashboard.css";
import { ClippedDrawer } from "./NavBar";
import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import RefreshIcon from "@material-ui/icons/Refresh";

import axios from "./utils/axios";
import useInterval from "./utils/poll";
import { Fab } from "@material-ui/core";

// In milliseconds make it null to disable polling
const pollFreq = 600000;

export function Dashboard() {
  const classes = useStyles();
  const [available, setAvailable] = useState<Boolean[]>(
    _.fill(Array<Boolean>(16), true)
  );
  const [lastRun, setLastRun] = useState<Date>(new Date());
  const [loading, setLoading] = useState<Boolean>(false);

  async function getAvailability() {
    let slots = _.fill(Array<Boolean>(16), false);
    _.fill(slots, true, 3, 8);
    for (let slotNum = 1; slotNum < 17; slotNum++) {
      try {
        setLastRun(new Date());
        let result = await axios.post(`/queries/${slotNum + 1}/results`);
        slots[slotNum] =
          result.data["rows"][0]["occupied"] === 1 ? false : true;
      } catch {
        console.log("Cannot get data from api");
      }
    }
    setAvailable(slots);
    setLoading(false);
  }

  useInterval(() => {
    getAvailability();
  }, pollFreq);

  return (
    <>
      <ClippedDrawer />
      <main className={classes.content}>
        {loading ? (
          <Container className={classes.gridContainer}>
            <CircularProgress />
          </Container>
        ) : (
          <Grid container xs={12} spacing={3} className={classes.gridContainer}>
            {available.map((isAvailable, slotNum) => {
              return (
                <Grid item>
                  <Card
                    className={
                      isAvailable
                        ? classes.parkingCardAvailable
                        : classes.parkingCardNotAvailable
                    }
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          className={
                            isAvailable
                              ? classes.avatarAvailable
                              : classes.avatarNotAvailable
                          }
                        >
                          {isAvailable ? <CheckIcon /> : <CloseIcon />}
                        </Avatar>
                      }
                      title={
                        <Typography variant="h6" className={classes.whiteColor}>
                          Parking Slot {slotNum + 1}
                        </Typography>
                      }
                    />
                    <CardMedia
                      className={classes.media}
                      image={
                        isAvailable
                          ? "static/blank_parking_space.jpg"
                          : "static/parking_showoff.jpg"
                      }
                      title="Parking photo"
                    />
                    <CardActions disableSpacing>
                      <Typography className={classes.whiteColor}>
                        {`Last Updated: ${lastRun.toLocaleDateString("en-Us", {
                          hour12: true,
                          day: "2-digit",
                          month: "short",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`}
                      </Typography>
                      {/* <IconButton aria-label="share">
                      <RefreshIcon className={classes.whiteColor} />
                    </IconButton> */}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
        <Fab
          onClick={async () => {
            setLoading(true);
            await getAvailability();
            toast.success("Refreshed");
          }}
          disabled={loading as boolean}
          className={classes.fab}
          color="primary"
          aria-label="refresh"
        >
          <RefreshIcon />
        </Fab>
      </main>
    </>
  );
}
