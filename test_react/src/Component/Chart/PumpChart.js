import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Row,
  Button,
} from "reactstrap";
import "./PumpChart.css";
import PieChart from "./PieChart";
////io
import io from "socket.io-client";

let socket;
const CONNECTION_PORT = "localhost:5000/";

const MotorChart = () => {
  const [pump1, setPump1] = useState(0);
  const [pump2, setPump2] = useState(0);
  const [pump3, setPump3] = useState(0);
  const [pump4, setPump4] = useState(0);
  const [pump5, setPump5] = useState(0);
  const [pump6, setPump6] = useState(0);
  /// Connect io
  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  ///-----GET State------
  useEffect(() => {
    ////-------Speed----///
    socket.on('ns=3;s="Pump_1"."Speed"', (data) => {
      setPump1(data);
    });
    socket.on('ns=3;s="Pump_2"."Speed"', (data) => {
      setPump2(data);
    });
    socket.on('ns=3;s="Pump_3"."Speed"', (data) => {
      setPump3(data);
    });
    socket.on('ns=3;s="Pump_4"."Speed"', (data) => {
      setPump4(data);
    });
    socket.on('ns=3;s="Pump_5"."Speed"', (data) => {
      setPump5(data);
    });
    socket.on('ns=3;s="Pump_6"."Speed"', (data) => {
      setPump6(data);
    });
  });

  return (
    <Container className="pump-chart-contain">
      <Form className="pump-form">
        <h2 className="pump-chart-title">Pump Status</h2>
        <Col className="line1">
          <FormGroup className="pump-1">
            <Label>Pump 1</Label>
            <PieChart progress={pump1} size={160} strokeWidth={25} />
          </FormGroup>

          <FormGroup className="pump-2">
            <Label>Pump 2</Label>
            <PieChart progress={pump2} size={160} strokeWidth={25} />
          </FormGroup>
          <FormGroup className="pump-3">
            <Label>Pump 3</Label>
            <PieChart progress={pump3} size={160} strokeWidth={25} />
          </FormGroup>
        </Col>
        <Col className="line2">
          <FormGroup className="pump-4">
            <Label>Pump 4</Label>
            <PieChart progress={pump4} size={160} strokeWidth={25} />
          </FormGroup>

          <FormGroup className="pump-5">
            <Label>Pump 5</Label>
            <PieChart progress={pump5} size={160} strokeWidth={25} />
          </FormGroup>
          <FormGroup className="pump-6">
            <Label>Pump 6</Label>
            <PieChart progress={pump6} size={160} strokeWidth={25} />
          </FormGroup>
        </Col>
      </Form>
    </Container>
  );
};

export default MotorChart;
