import React from "react";
import MuiCard from "@material-ui/core/Card";
import { CardHeader } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import MuiAvatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Card = styled(MuiCard)`
  margin: 30px;
  min-width: 275px;
`;

const Bull = styled.span.attrs(() => ({ children: "•" }))`
  display: inline-block;
  margin: 0 2px;
  transform: scale(0.8);
`;

const Title = styled(Typography).attrs(() => ({
  color: "textSecondary",
  gutterBottom: true
}))`
  font-size: 14px;
`;

const Secondary = styled(Typography).attrs(() => ({ color: "textSecondary" }))`
  margin-bottom: 12px;
`;

const Avatar = styled(MuiAvatar).attrs(() => ({ "aria-label": "Bot" }))`
  background-color: ${red[500]};
`;

export const SessionStateCard = () => (
  <Card>
    <CardHeader
      avatar={<Avatar>SSM</Avatar>}
      action={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }
      title="BlockStamper"
      subheader="Session42"
    />
    <CardContent>
      <Title>Iteration 1</Title>
      <Typography variant="h5" component="h2">
        Roles:
        <br />
        <Bull /> Bob: Seller
        <br />
        <Bull /> Sam: Provider
        <br />
      </Typography>
      <Typography variant="h5" component="h2">
        Origin:
        <br />
        <Bull /> From: 1<br />
        <Bull /> To: 2<br />
        <Bull /> Role: Buyer
        <br />
        <Bull /> Action: Buy
        <br />
      </Typography>
      <Secondary>Current state: 2</Secondary>
      <Typography variant="h5" component="h2">
        Data:
      </Typography>
      <Typography component="p">
        {JSON.stringify({
          some: "some",
          json: {
            data: "data"
          }
        })}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">History</Button>
    </CardActions>
  </Card>
);

// iteration
/*"State": {
	ssm: "Car dealership",
	session: "deal20181201",
	iteration: 1,
	roles: {
		"Bob": "Buyer",
		"Sam": "Seller"
	},
	current: 2,
	origin: {from: 1, to: 2, role: "Buyer", action: "Buy"}
	public: "Used car for 100 dollars.",
	private: {
		"Bob": "XXXX",
		"Sam": "YYYY"
	}
}*/
