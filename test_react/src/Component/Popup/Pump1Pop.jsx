import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

import greenlightoff from "../img/Off_Green.png";
import redlightoff from "../img/Off_Red.png";
import greenlighton from "../img/On_Green.png";
import redlighton from "../img/On_Red.png";
import "./PumpPop.css";
import io from "socket.io-client";
let socket;
const CONNECTION_PORT = "localhost:5000/";

function PumpPop(props) {
  const [modeSet, setModeSet] = useState(null);
  const [mode, setMode] = useState();
  const [feedback, setFeedback] = useState(false);
  const [fault, setFault] = useState(false);
  const [speed, setSpeed] = useState([]);
  const [speedSet, setSpeedSet] = useState([]);
  const [time, setTime] = useState([]);

  /// Connect
  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);
  ///State
  useEffect(() => {
    ////
    socket.on(`ns=3;s="${props.on}"."MODE"`, (data) => {
      if (data === 2) {
        setMode("AUTO");
      } else if (data === 1) {
        setMode("MAN");
      }
      else if (data === 3) {
        setMode("SERVICE");
      }
    });
    ////
    socket.on(`ns=3;s="${props.on}"."FEEDBACK"`, (data) => {
      setFeedback(data);
    });
    ////
    socket.on(`ns=3;s="${props.on}"."FAULT"`, (data) => {
      setFault(data);
    });
    ////
    socket.on(`ns=3;s="${props.on}"."Speed"`, (data) => {
      setSpeed(data);
    });

  // 
  socket.on(`ns=3;s="${props.on}"."RUNNINGTIME"`, (data) => {
    setTime(data);
  });
});

  ///Mode
  const btnSetMode = async (e) => {
    socket.emit(`${props.emit}_MODE`, modeSet);
  };
  ///Set Start
  const btnStartClick = async () => {
    await socket.emit("Button", `"${props.emit}"."START"`);
  };
  ///Set Stop
  const btnStopClick = async () => {
    await socket.emit("Button", `"${props.emit}"."STOP"`);
  };
  const btnResetClick = async () => {
    await socket.emit("Button", `"${props.emit}"."RESET"`);
  };

  const btnSetSpeed = async () => {
    await socket.emit(`SetSpeed_${props.emit}`, speedSet);
  };

  return (
    <Container className="pumppop">
      <Form>
        <div className="select-mode">
          <Col>
            <FormGroup>
              <Label classNam="pump-pop-mode">Mode : {mode}</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>SetMode</Label>
              <Input
                className="pump-select-mode"
                type="select"
                name="Mode"
                id="modeSelect"
                onChange={(e) => setModeSet(e.target.value)}
              >
                <option value="1"> Man </option>
                <option value="2"> Auto </option>
                <option value="3"> Service </option>
              </Input>
              <Button className="btnset" onClick={btnSetMode}>
                Set
              </Button>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <div className="pump-controlbtn">
                <Label>Control </Label>
                <Button className="btnstart" onClick={btnStartClick}>
                  Start
                </Button>
                <Button className="btnstop" onClick={btnStopClick}>
                  Stop
                </Button>
                <Button className="btnreset" onClick={btnResetClick}>
                  Reset
                </Button>
              </div>
            </FormGroup>
          </Col>
        </div>
        <Col>
          <FormGroup>
            <div className="pump-status">
              {/* <Label>Running Time</Label> */}
              <div className="pumplight">
                <Label> Status </Label>
                <img
                  className="pump-status-light"
                  src={feedback ? greenlighton : greenlightoff}
                />
                <Label> Fault </Label>
                <img
                  className="pump-fault-light"
                  src={fault ? redlighton : redlightoff}
                />
              </div>
            </div>
          </FormGroup>
        </Col>
        <Col>
          <div className="pump-set">
            <FormGroup>
            <FormGroup>
              <Label>Running time: {time} minutes</Label>
            </FormGroup>
              <Label>Set speed</Label>
              <Input
                className="setspeed"
                placeholder="0.00%"
                onChange={(e) => setSpeedSet(e.target.value)}
              />
              <Button className="btnset" onClick={btnSetSpeed}>
                {" "}
                Set{" "}
              </Button>
            </FormGroup>
            <FormGroup>
              <Label>Status: {speed} % </Label>
            </FormGroup>
          </div>
        </Col>
      </Form>
    </Container>
  );
}

export default PumpPop;
