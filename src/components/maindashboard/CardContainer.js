import React from 'react'
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((muiBaseTheme) => ({
    card: {
        maxWidth: 300,
        width: 230,
        margin: "auto",
        marginLeft: '130',
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    media: {
        paddingTop: "56.25%"
    },
    content: {
        textAlign: "center",
        padding: muiBaseTheme.spacing.unit * 3
    },
    divider: {
        margin: `${muiBaseTheme.spacing.unit * 3}px 0`
    },
    container: {
        display: "flex",
        flexDirection: "row",
        spaceBetween: '1'
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },
    avatar: {
        display: "inline-block",
        border: "2px solid white",
        "&:not(:first-of-type)": {
            marginLeft: -muiBaseTheme.spacing.unit
        }
    }
}));


export default function CardContainer(props) {
    const classes = styles();
    return (
        <div>
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <Typography
                            className={"MuiTypography--heading"}
                            variant={"h6"}
                            gutterBottom
                        >
                            Student Count
                        </Typography>

                        <Divider className={classes.divider} light />
                        <h1>{props.studentcount}</h1>
                    </CardContent>
                </Card>

                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <Typography
                            className={"MuiTypography--heading"}
                            variant={"h6"}
                            gutterBottom
                        >
                            Staff Count
                        </Typography>

                        <Divider className={classes.divider} light />
                        <h1>{props.staffcount}</h1>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
