import React, { useState, useEffect } from "react";
import "./ControlSection.css";
import io from "socket.io-client";
import { Container, Row, Button, FormGroup } from "reactstrap";


let socket;
const CONNECTION_PORT = "localhost:5000/";

function ControlSection() {
  const [modeSet, setModeSet] = useState(null);
  const [mode, setMode] = useState();

  /// Connect
  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  ///btnClick
  const btnAutoClick = async () => {
    await socket.emit("Button",'"M_Auto"');
  };
  const btnManClick = async () => {
    await socket.emit("Button",'"M_Manual"');
  };
  const btnSerClick = async () => {
    await socket.emit("Button",'"M_Ser"');
  };

  const btnResetClick = async () => {
    await socket.emit("Button", '"Sys_Reset"');
  };

  const btnStartClick = async () => {
    await socket.emit("Button",'"M_StartSys"');
  };

  const btnStopClick = async () => {
    await socket.emit("Button", '"M_StopSys"');
  };

  return (
    <>
      <Container className="control-sys">
        <h2 className="title-sys"> CONTROL SYSTEM </h2>

        <Row>
          <FormGroup className="line1">
            <Button className="btn-sys-mode" onClick={btnAutoClick}>
              Auto
            </Button>
            <Button className="btn-sys-mode" onClick={btnManClick}>
              Manual
            </Button>
            <Button className="btn-sys-mode" onClick={btnSerClick}>
              Service
            </Button>
          </FormGroup>
        </Row>
        <Row>
          <FormGroup>
            <div className="line2">
              <Button className="btn-sys-start" onClick={btnStartClick}>
                Start
              </Button>
              <Button className="btn-sys-stop" onClick={btnStopClick}>
                Stop
              </Button>
              <Button className="btn-sys-reset" onClick={btnResetClick}>
                Reset
              </Button>
            </div>
          </FormGroup>
        </Row>
      </Container>
    </>
  );
}

export default ControlSection;
