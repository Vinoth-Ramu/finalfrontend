//import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import axios from "axios";
import jwt from "jsonwebtoken";
import { Grid } from "@mui/material";

export default function App(props) {
  const [productList, setProductList] = useState([]);

  useEffect(async () => {
    const token = localStorage.getItem("token");
    var decodedToken = jwt.decode(token);

    if (decodedToken.exp * 1000 <= Date.now()) {
      props.history.push("/");
    } else {
      var response = await axios.get("http://localhost:3001/roomDetails/get", {
        headers: {
          "access-token": token,
        },
      });
      setProductList(response.data);
    }
  });
  const [counter, setCounter] = React.useState(0);
  const [CardOne_ButtonValue, CardOne_setButtonValue] =
    React.useState("Add to Cart");

  const CardOne_handleIncrement = () => {
    if (CardOne_ButtonValue === "Add to Cart") {
      CardOne_setButtonValue("Remove From Cart");
      setCounter(counter + 1);
    } else if (CardOne_ButtonValue === "Remove From Cart") {
      CardOne_setButtonValue("Add to Cart");
      setCounter(counter - 1);
    }
  };

  return (
    <>
      <div className="header-tag">
        <Badge color="secondary" badgeContent={counter}>
          <ShoppingCartIcon size="large" />
        </Badge>
      </div>
      <div>
        <Grid>
          {productList.map((row) => (
            <Grid item>
              <div className="big-bg">
                <div className="main-div">
                  <div className="little-div">
                    <Card sx={{ minWidth: 400, borderRadius: "16px" }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Free
                        </Typography>
                        <Typography variant="h5" component="div"></Typography>
                        <Typography
                          sx={{ mb: 1.5 }}
                          variant="h4"
                          display="inline"
                        >
                          <b>{row.price}</b>
                          <Typography variant="subtitle1" display="inline">
                            /Day
                          </Typography>
                          <hr />
                        </Typography>
                        <Typography variant="body2" align="center">
                          {row.amenities}
                          <br />
                          <br />
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{ borderRadius: "20px", height: "40px" }}
                          onClick={() => CardOne_handleIncrement()}
                        >
                          {CardOne_ButtonValue}
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}