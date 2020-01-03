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

const AllStudentPlatFormCard = props => {
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    if (props) {
      setAllStudents(props.allStudents);
    }
    console.log("allStudents", props.allStudents);
  }, [props.allStudents]);

  const classes = useStyles();

  console.log("props,", props);
  return (
    <div className="">
      {props.allStudents.map((stuInfo, index) => {
        return (
          <div
            className=""
            style={{ margin: "25px 250px ", width: "40%" }}
            key={index}
          >
            <Card className={classes.card} key={index}>
              <CardContent>
                <Typography
                  // className={classes.title}
                  // color="textSecondary"
                  gutterBottom
                >
                  <Typography className={classes.pos} variant="h6">
                    Student Name
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {stuInfo.userName}
                  </Typography>
                  <Typography className={classes.pos} variant="h6">
                    Student Email
                  </Typography>

                  <Typography className={classes.pos} color="textSecondary">
                    {stuInfo.email}
                  </Typography>
                </Typography>
              </CardContent>
              {/* <CardActions> */}
              {/* <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                    // onClick={()=>props.applyNow(info.jobID)}
                >
                  Apply Now
                </Button> */}
              {/* </CardActions> */}
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default AllStudentPlatFormCard;
