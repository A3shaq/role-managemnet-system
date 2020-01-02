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

const CardWrapper = props => {
  const [jobData, setJobData] = useState([]);
  // setJob

  //   companyDeleteJobs = () => {
  //     props.deleteJobs();
  //   };
  useEffect(() => {
    if (props) {
      setJobData(props.JobsDetails);
    }
    console.log("jobData", jobData);
  }, [props.JobsDetails]);

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  //   console.log("Wrap: ", props);
  //   console.log("props.JobsDetails.title", props.JobsDetails.title);
  console.log("jobData,", props);
  return (
    <div className="">
      {jobData.map((info, index) => {
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
                    Job Title
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {info.title}
                  </Typography>
                </Typography>
                <Typography className={classes.pos} variant="h6">
                  Job Designation
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {info.designation}
                </Typography>
                <Typography className={classes.pos} variant="h6">
                  Job Details
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {info.details}
                </Typography>

                <Typography className={classes.pos} variant="h6">
                  Salary
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {info.salary}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={()=>props.delete(info.jobID)}
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

export default CardWrapper;
