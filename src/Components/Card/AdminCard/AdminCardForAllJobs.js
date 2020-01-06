import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const AdminCardForAllJobs = props => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (props) {
      setJobs(props.jobs);
    }
    console.log("jobs", jobs);
  }, [props.jobs]);

  const classes = useStyles();

  console.log("jobs,", props);
  return (
    <div className="">
      {jobs.map((jobInfo, index) => {
        return (
          <div className="" style={{ margin: "25px 250px ", width: "40%" }}>
            <Card className={classes.card} key={index}>
              <CardContent>
                <Typography
                  // className={classes.title}
                  // color="textSecondary"
                  gutterBottom
                >
                  <Typography className={classes.pos} variant="h6">
                    Company Owner
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {jobInfo.userName}
                  </Typography>
                </Typography>
                <Typography className={classes.pos} variant="h6">
                  Job Title
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {jobInfo.title}
                </Typography>

                <Typography className={classes.pos} variant="h6">
                  Job Designation
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {jobInfo.designation}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => props.deleteJobs(jobInfo.jobId)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default AdminCardForAllJobs;
