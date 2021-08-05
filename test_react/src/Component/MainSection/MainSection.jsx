import React, { useEffect, useState } from "react";
////io
import io from "socket.io-client";
// Level bar
import Level from "../Chart/LevelBar";
// Control
import Control from "../ControlSection/ControlSection";
// Clean
import Clean from "../img/time.svg";
// Valve
import Valve_on from "../img/Valve_on.png";
import Valve_hori from "../img/Hand valve 2.png";
import Valve_fault from "../img/Valve_fault.png";

// Pipes
import Pipe_alight from "../img/Pipes_alight.png";
import Pipe_hori from "../img/Pipes_horizontal.png";
import Pipe_LB from "../img/Pipes_LB.png";
import Pipe_LT from "../img/Pipes_LT.png";
import Pipe_RB from "../img/Pipes_RB.png";
import Pipe_RT from "../img/Pipes_RT.png";
import Pipe_angle from "../img/Pipe_angle.svg";
import Pipe_fork from "../img/Pipe_fork.png";
import Pipe_fork_alight_left from "../img/Pipe_fork_alight_left.png";
import Pipe_fork_alight_right from "../img/Pipe_fork_alight_right.svg";
import Pipe_fork_down from "../img/Pipe_fork_down.png";

// Sensor
import Sensor from "../img/PressureSensor.svg";
import FlowMeter from "../img/Flowmeter.svg";

// Pump
import Pump from "../img/Pump.png";
import Pump_on from "../img/Pump_on.png";
import Pump_fault from "../img/Horizontal_pump_fault.png";

import Pump_alight from "../img/Pump_alight.svg";
import Pump_alight_on from "../img/Vertical_pump_on.svg";
import Pump_alight_fault from "../img/Vertical_pump_fault.svg";

import Pump_Pressure from "../img/pressurepump.svg";
import Pump_Pressure_on from "../img/Pressure_pump_on.svg";
import Pump_Pressure_fault from "../img/Pressure_pump_fault.svg";
import Pump_Pressure_2 from "../img/pressurepump2.svg";
import Pump_Pressure_2_on from "../img/Pressure_pump2_on.svg";
import Pump_Pressure_2_fault from "../img/Pressure_pump_2_fault.svg";

//Tank
import FeedTank from "../img/Tank_1.png";
import PressureTank from "../img/Tank_2.svg";
import RawTank from "../img/Tank_4.svg";
import UVFilterRun from "../img/UV-Open.svg";
import UVFilter from "../img/UV.svg";
import ROFilter from "../img/RO.svg";
//Popup
import Popup from "../Popup/Popup";
import PumpPop from "../Popup/Pump1Pop";
import ValvePop from "../Popup/ValveFPop";
import CleanPop from "../Popup/CleanPop";
// Status
import Status from "../StatusSection/StatusForm";
import "./MainSection2.css";

let socket;
const CONNECTION_PORT = "localhost:5000/";

function MainSection2() {
  function ConvertStatePump1(data1, data2) {
    var a;
    if (data1 === true) a = Pump_alight_on;
    else if (data2 === true) a = Pump_alight_fault;
    else a = Pump_alight;
    return a;
  }
  function ConvertStatePump236(data1, data2) {
    var a;
    if (data1 === true) a = Pump_on;
    else if (data2 === true) a = Pump_fault;
    else a = Pump;
    return a;
  }
  function ConvertStatePump4(data1, data2) {
    var a;
    if (data1 === true) a = Pump_Pressure_on;
    else if (data2 === true) a = Pump_Pressure_fault;
    else a = Pump_Pressure;
    return a;
  }
  function ConvertStatePump5(data1, data2) {
    var a;
    if (data1 === true) a = Pump_Pressure_2_on;
    else if (data2 === true) a = Pump_Pressure_2_fault;
    else a = Pump_Pressure_2;
    return a;
  }
  function ConvertStateValve(data1, data2) {
    var a;
    if (data1 === true) a = Valve_on;
    else if (data2 === true) a = Valve_fault;
    else a = Valve_hori;
    return a;
  }

  // PopUp
  const [popupPump1, setPopupPump1] = useState(false);
  const [popupPump2, setPopupPump2] = useState(false);
  const [popupPump3, setPopupPump3] = useState(false);
  const [popupPump4, setPopupPump4] = useState(false);
  const [popupPump5, setPopupPump5] = useState(false);
  const [popupPump6, setPopupPump6] = useState(false);
  //Valve
  const [popupValveF, setPopupValveF] = useState(false);
  const [popupValve1, setPopupValve1] = useState(false);
  const [popupValve2, setPopupValve2] = useState(false);
  const [popupValve3, setPopupValve3] = useState(false);
  const [popupValve4, setPopupValve4] = useState(false);
  const [popupValve5, setPopupValve5] = useState(false);
  const [popupValve6, setPopupValve6] = useState(false);
  const [popupValve7, setPopupValve7] = useState(false);
  const [popupValve8, setPopupValve8] = useState(false);
  const [popupValve9, setPopupValve9] = useState(false);
  const [popupValve10, setPopupValve10] = useState(false);
  const [popupValve11, setPopupValve11] = useState(false);
  const [popupValve12, setPopupValve12] = useState(false);
  const [popupValve13, setPopupValve13] = useState(false);
  //Clean
  const [popupClean, setPopupClean] = useState(false);
  // State
  const [statePump1, setStatePump1] = useState(false);
  const [statePump2, setStatePump2] = useState(false);
  const [statePump3, setStatePump3] = useState(false);
  const [statePump4, setStatePump4] = useState(false);
  const [statePump5, setStatePump5] = useState(false);
  const [statePump6, setStatePump6] = useState(false);

  const [faultPump1, setFaultPump1] = useState(false);
  const [faultPump2, setFaultPump2] = useState(false);
  const [faultPump3, setFaultPump3] = useState(false);
  const [faultPump4, setFaultPump4] = useState(false);
  const [faultPump5, setFaultPump5] = useState(false);
  const [faultPump6, setFaultPump6] = useState(false);

  const [stateValveF, setStateValveF] = useState(false);
  const [stateValveA1, setStateValveA1] = useState(false);
  const [stateValveA2, setStateValveA2] = useState(false);
  const [stateValveA3, setStateValveA3] = useState(false);
  const [stateValveA4, setStateValveA4] = useState(false);
  const [stateValveA5, setStateValveA5] = useState(false);
  const [stateValveB1, setStateValveB1] = useState(false);
  const [stateValveB2, setStateValveB2] = useState(false);
  const [stateValveB3, setStateValveB3] = useState(false);
  const [stateValveB4, setStateValveB4] = useState(false);
  const [stateValveB5, setStateValveB5] = useState(false);
  const [stateValveC1, setStateValveC1] = useState(false);
  const [stateValveC2, setStateValveC2] = useState(false);
  const [stateValveC3, setStateValveC3] = useState(false);

  const [faultValveF, setFaultValveF] = useState(false);
  const [faultValveA1, setFaultValveA1] = useState(false);
  const [faultValveA2, setFaultValveA2] = useState(false);
  const [faultValveA3, setFaultValveA3] = useState(false);
  const [faultValveA4, setFaultValveA4] = useState(false);
  const [faultValveA5, setFaultValveA5] = useState(false);
  const [faultValveB1, setFaultValveB1] = useState(false);
  const [faultValveB2, setFaultValveB2] = useState(false);
  const [faultValveB3, setFaultValveB3] = useState(false);
  const [faultValveB4, setFaultValveB4] = useState(false);
  const [faultValveB5, setFaultValveB5] = useState(false);
  const [faultValveC1, setFaultValveC1] = useState(false);
  const [faultValveC2, setFaultValveC2] = useState(false);
  const [faultValveC3, setFaultValveC3] = useState(false);

  const [stateUV, setStateUV] = useState(false);

  //// Level
  const [levelTankF, setLevelTankF] = useState([]);
  const [levelTankM, setLevelTankM] = useState([]);
  const [levelTankC, setLevelTankC] = useState([]);
  // const [levelTankFHigh, setlevelTankFHigh] = useState(false);
  // const [levelTankFLow, setlevelTankFLow] = useState(false);
  // const [levelTankMHigh, setlevelTankMHigh] = useState(false);
  // const [levelTankMLow, setlevelTankMLow] = useState(false);
  // const [levelTankCHigh, setlevelTankCHigh] = useState(false);
  // const [levelTankCLow, setlevelTankCLow] = useState(false);
  //// Pressure
  const [pressure1, setPressure1] = useState(0);
  const [pressure2, setPressure2] = useState(0);
  const [pressure3, setPressure3] = useState(0);
  const [flow1, setFlow1] = useState(0);
  const [flow2, setFlow2] = useState(0);
  const [flow3, setFlow3] = useState(0);
  ////SPEED
  const [speedPump1, setSpeedPump1] = useState(null);
  const [speedPump2, setSpeedPump2] = useState(null);
  const [speedPump3, setSpeedPump3] = useState(null);
  const [speedPump4, setSpeedPump4] = useState(null);
  const [speedPump5, setSpeedPump5] = useState(null);
  const [speedPump6, setSpeedPump6] = useState(null);
 
  /// Connect io
  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  ///-----GET State------
  useEffect(() => {
    ////-------Level----///
    socket.on(  'ns=3;s="FTank_Level"', (data) => {
      setLevelTankF(data);
    });
    socket.on(  'ns=3;s="MTank_Level"', (data) => {
      setLevelTankM(data);
    });
    socket.on(  'ns=3;s="CTank_Level"', (data) => {
      setLevelTankC(data);
    });
    // ----------------Speed-------------//
    socket.on(  'ns=3;s="Pump_1"."Speed"', (data) => {
      setSpeedPump1(data);
    });
    socket.on(  'ns=3;s="Pump_2"."Speed"', (data) => {
      setSpeedPump2(data);
    });
    socket.on(  'ns=3;s="Pump_3"."Speed"', (data) => {
      setSpeedPump3(data);
    });
    socket.on(  'ns=3;s="Pump_4"."Speed"', (data) => {
      setSpeedPump4(data);
    });
    socket.on(  'ns=3;s="Pump_5"."Speed"', (data) => {
      setSpeedPump5(data);
    });
    socket.on(  'ns=3;s="Pump_6"."Speed"', (data) => {
      setSpeedPump6(data);
    });
    
   // ----------------Pump State--------///
    socket.on(  'ns=3;s="Pump_1"."FEEDBACK"', (data) => {
      setStatePump1(data);
    });
    socket.on(  'ns=3;s="Pump_2"."FEEDBACK"', (data) => {
      setStatePump2(data);
    });
    socket.on(  'ns=3;s="Pump_3"."FEEDBACK"', (data) => {
      setStatePump3(data);
    });
    socket.on(  'ns=3;s="Pump_4"."FEEDBACK"', (data) => {
      setStatePump4(data);
    });
    socket.on(  'ns=3;s="Pump_5"."FEEDBACK"', (data) => {
      setStatePump5(data);
    });
    socket.on(  'ns=3;s="Pump_6"."FEEDBACK"', (data) => {
      setStatePump6(data);
    });
    // ----------------Valve State--------///
    socket.on('ns=3;s="VF"."OPENED"', (data) => {
      setStateValveF(data);
    });
    socket.on('ns=3;s="VA1"."OPENED"', (data) => {
      setStateValveA1(data);
    });
    socket.on('ns=3;s="VA2"."OPENED"', (data) => {
      setStateValveA2(data);
    });
    socket.on('ns=3;s="VA3"."OPENED"', (data) => {
      setStateValveA3(data);
    });
    socket.on('ns=3;s="VA4"."OPENED"', (data) => {
      setStateValveA4(data);
    });
    socket.on('ns=3;s="VA5"."OPENED"', (data) => {
      setStateValveA5(data);
    });
    socket.on('ns=3;s="VB1"."OPENED"', (data) => {
      setStateValveB1(data);
    });
    socket.on('ns=3;s="VB2"."OPENED"', (data) => {
      setStateValveB2(data);
    });
    socket.on('ns=3;s="VB3"."OPENED"', (data) => {
      setStateValveB3(data);
    });
    socket.on('ns=3;s="VB4"."OPENED"', (data) => {
      setStateValveB4(data);
    });
    socket.on('ns=3;s="VB5"."OPENED"', (data) => {
      setStateValveB5(data);
    });
    socket.on('ns=3;s="VC1"."OPENED"', (data) => {
      setStateValveC1(data);
    });
    socket.on('ns=3;s="VC2"."OPENED"', (data) => {
      setStateValveC2(data);
    });
    socket.on('ns=3;s="VC3"."OPENED"', (data) => {
      setStateValveC3(data);
    });

    socket.on('ns=3;s="PS1_M"', (data) => {
      setPressure1(data);
    });
    socket.on('ns=3;s="PS2_M"', (data) => {
      setPressure2(data);
    });
    socket.on('ns=3;s="PS3_M"', (data) => {
      setPressure3(data);
    });
    socket.on('ns=3;s="FLow_FA_IN"', (data) => {
      setFlow1(data);
    });
    socket.on('ns=3;s="FLow_FB_IN"', (data) => {
      setFlow2(data);
    });
    socket.on('ns=3;s="FLow_RO_IN"', (data) => {
      setFlow3(data);
    });
    socket.on('ns=3;s="UV_CMD"', (data) => {
      setStateUV(data);
    });

    // ----------------------------Set Fault----------------------------//
    socket.on('ns=3;s="Pump_1"."FAULT"', (data) => {
      setFaultPump1(data);
    });
    socket.on('ns=3;s="Pump_2"."FAULT"', (data) => {
      setFaultPump2(data);
     
    });
    socket.on('ns=3;s="Pump_3"."FAULT"', (data) => {
      setFaultPump3(data);
      console.log(faultPump3)
    });
    socket.on('ns=3;s="Pump_4"."FAULT"', (data) => {
      setFaultPump4(data);
    });
    socket.on('ns=3;s="Pump_5"."FAULT"', (data) => {
      setFaultPump5(data);
    });
    socket.on('ns=3;s="Pump_6"."FAULT"', (data) => {
      setFaultPump6(data);
    });
    // ----------------Valve Fault--------///
    socket.on('ns=3;s="VF"."FAULT"', (data) => {
      setFaultValveF(data);
    });
    socket.on('ns=3;s="VA1"."FAULT"', (data) => {
      setFaultValveA1(data);
    });
    socket.on('ns=3;s="VA2"."FAULT"', (data) => {
      setFaultValveA2(data);
    });
    socket.on('ns=3;s="VA3"."FAULT"', (data) => {
      setFaultValveA3(data);
    });
    socket.on('ns=3;s="VA4"."FAULT"', (data) => {
      setFaultValveA4(data);
    });
    socket.on('ns=3;s="VA5"."FAULT"', (data) => {
      setFaultValveA5(data);
    });
    socket.on('ns=3;s="VB1"."FAULT"', (data) => {
      setFaultValveB1(data);
    });
    socket.on('ns=3;s="VB2"."FAULT"', (data) => {
      setFaultValveB2(data);
    });
    socket.on('ns=3;s="VB3"."FAULT"', (data) => {
      setFaultValveB3(data);
    });
    socket.on('ns=3;s="VB4"."FAULT"', (data) => {
      setFaultValveB4(data);
    });
    socket.on('ns=3;s="VB5"."FAULT"', (data) => {
      setFaultValveB5(data);
    });
    socket.on('ns=3;s="VC1"."FAULT"', (data) => {
      setFaultValveC1(data);
    });
    socket.on('ns=3;s="VC2"."FAULT"', (data) => {
      setFaultValveC2(data);
    });
    socket.on('ns=3;s="VC3"."FAULT"', (data) => {
      setFaultValveC3(data);
    });
  });

  return (
    <div className="mainsection2-container">
      {/* -------------Status---------------- */}

      <div className="status-section">
        <Status />
      </div>
      {/* -------------Control---------------- */}

      <div className="control-section">
        <Control />
      </div>
      {/* --------------------Set Time------- */}
      <div className="settime">
        <img
          title="Time Clean"
          className="settime-icon"
          src={Clean}
          onClick={() => setPopupClean(true)}
        />

        <Popup
          title=" Setting Parameters "
          openPopup={popupClean}
          setOpenPopup={setPopupClean}
        >
          <CleanPop />
        </Popup>
      </div>

      <div className="model-container">
        {/* -------------------------Tank1-------------- */}
        <div className="tank1-container">
          {/* ----------- Before Tank1-------------------- */}

          <div className="before-tank1">
            <img className="pipe1" src={Pipe_alight} />
            <img className="pipe2" src={Pipe_alight} />
            <img
              title=" PUMP 1 "
              className="pump1"
              onClick={() => setPopupPump1(true)}
              src={ConvertStatePump1(statePump1, faultPump1)}
            />
            <p className="speed1value">{speedPump1} %</p>

            <Popup
              title="Pump 1"
              openPopup={popupPump1}
              setOpenPopup={setPopupPump1}
            >
              <PumpPop on={"Pump_1"} emit={"Pump_1"} />
            </Popup>

            <img className="pipe5" src={Pipe_LT} />
            <img className="pipe4" src={Pipe_RB} />

            <img
              title=" VALVE F "
              className="valve0"
              onClick={() => setPopupValveF(true)}
              src={ConvertStateValve(stateValveF, faultValveF)}
            />

            <Popup
              title="Valve F"
              openPopup={popupValveF}
              setOpenPopup={setPopupValveF}
            >
              <ValvePop on={"VF"} emit={"VF"} />{" "}
            </Popup>
          </div>
          {/* ------After Tank1----------- */}
          <div className="after-tank1">
            <img className="pipe6" src={Pipe_alight} />
            <img className="pipe8" src={Pipe_hori} />
            <img className="pipe10" src={Pipe_hori} />
            <img className="pipe9" src={Pipe_LB} />
            <img className="pipe7" src={Pipe_fork} />
            <img className="pipe11" src={Pipe_hori} />
            <img className="pipe12" src={Pipe_hori} />

            <img
              title=" PUMP 2 "
              className="pump2"
              onClick={() => setPopupPump2(true)}
              src={ConvertStatePump236(statePump2, faultPump2)}
            />
            <p className="speed2value">{speedPump2} %</p>
            <Popup
              title="Pump 2"
              openPopup={popupPump2}
              setOpenPopup={setPopupPump2}
            >
              <PumpPop on={"Pump_2"} emit={"Pump_2"} />
            </Popup>

            <img
              title=" PUMP 3 "
              className="pump3"
              onClick={() => setPopupPump3(true)}
              src={ConvertStatePump236(statePump3, faultPump3)}
            />
          <p className="speed3value">{speedPump3} %</p>
            <Popup
              title="Pump 3"
              openPopup={popupPump3}
              setOpenPopup={setPopupPump3}
            >
              <PumpPop on={"Pump_3"} emit={"Pump_3"} />
            </Popup>

            <img className="pipe15" src={Pipe_alight} />
            <img className="pipe16" src={Pipe_hori} />
            <img className="pipe13" src={Pipe_RB} />
            <img className="pipe14" src={Pipe_fork} />
            <img className="pipe18" src={Pipe_alight} />
            <img className="pipe17" src={Pipe_RT} />
          </div>
          {/* -------------Tank1------------ */}

          <img title=" Feed Tank" className="tank1" src={FeedTank} />
          <div className="leveltank1">
            <Level value={levelTankF} maxValue={3} height={170} />
          </div>

          {/* -------------- */}
        </div>
        {/* -----------------------Tank2-------------- */}
        <div className="tank2-container">
          {/* ----------beforeTank2------------------ */}
          <img title=" Pressure Tank 1" className="tank2" src={PressureTank} />
          {/* <p className='label-tank2' > PRESSURE TANK 1 </p> */}
          <div className="before-tank2">
            <img className="pipe21" src={Pipe_hori} />
            <img className="pipe22" src={Pipe_hori} />
            <img className="pipe19" src={Pipe_fork_alight_right} />
            <img className="pipe20" src={Pipe_LB} />
            <img className="pipe23" src={Pipe_hori} />
            <img className="pipe24" src={Pipe_hori} />

            <img
              title=" VALVE A1 "
              className="valve1"
              onClick={() => setPopupValve1(true)}
              src={ConvertStateValve(stateValveA1, faultValveA1)}
            />
            <Popup
              title="Valve A1"
              openPopup={popupValve1}
              setOpenPopup={setPopupValve1}
            >
              <ValvePop on={"VA1"} emit={"VA1"} />
            </Popup>

            <img
              title=" VALVE A2 "
              className="valve2"
              onClick={() => setPopupValve2(true)}
              src={ConvertStateValve(stateValveA2, faultValveA2)}
            />
            <Popup
              title="Valve 2"
              openPopup={popupValve2}
              setOpenPopup={setPopupValve2}
            >
              <ValvePop on={"VA2"} emit={"VA2"} />{" "}
            </Popup>
            <img className="pipe25" src={Pipe_fork_down} />
            <img className="pipe26" src={Pipe_fork_down} />

            <img
              title=" VALVE A3 "
              className="valve3"
              src={ConvertStateValve(stateValveA3, faultValveA3)}
              onClick={() => setPopupValve3(true)}
            />

            <Popup
              title="Valve 3"
              openPopup={popupValve3}
              setOpenPopup={setPopupValve3}
            >
              <ValvePop on={"VA3"} emit={"VA3"} />{" "}
            </Popup>
            <img
              title=" VALVE A4 "
              className="valve4"
              src={ConvertStateValve(stateValveA4, faultValveA4)}
              onClick={() => setPopupValve4(true)}
            />
            <Popup
              title="Valve 4"
              openPopup={popupValve4}
              setOpenPopup={setPopupValve4}
            >
              <ValvePop on={"VA4"} emit={"VA4"} />{" "}
            </Popup>

            <img className="pipe29" src={Pipe_alight} />
            <img className="pipe27" src={Pipe_RB} />
            <img className="pipe28" src={Pipe_fork_alight_left} />
          </div>
          {/* ----------afterTank2---------- */}
          <div className="after-tank2">
            <img className="pipe33" src={Pipe_hori} />
            <img className="pipe30" src={Pipe_fork} />
            <img className="pipe31" src={Pipe_LB} />
            <img className="pipe32" src={Pipe_angle} />

            <img
              title=" VALVE A5 "
              className="valve5"
              src={ConvertStateValve(stateValveA5, faultValveA5)}
              onClick={() => setPopupValve5(true)}
            />

            <Popup
              title="Valve A5"
              openPopup={popupValve5}
              setOpenPopup={setPopupValve5}
            >
              <ValvePop on={"VA5"} emit={"VA5"} />{" "}
            </Popup>

            <img className="pipe35" src={Pipe_alight} />
            <img className="pipe34" src={Pipe_RT} />
            <p className="sensor1value">Pressure: {pressure1} bar </p>
           <img title=" Pressure Sensor " className="sensor1" src= {Sensor} />
           <p className="flow1value">Flow:{flow1}m3/h</p>
           <img title=" Flow Sensor " className="flow1" src= {FlowMeter} />

          </div>
        </div>
        {/* ---------------------------Tank3----------- */}
        <div className="tank3-container">
          {/* ---Tank3----------- */}
          {/* ----------beforeTank2------------------ */}
          <img title="Pressure Tank 2" className="tank3" src={PressureTank} />
          {/* <p className='label-tank3' > PRESSURE TANK 2 </p> */}

          <div className="before-tank3">
            <img className="pipe38" src={Pipe_hori} />
            <img className="pipe39" src={Pipe_hori} />
            <img className="pipe36" src={Pipe_fork_alight_right} />
            <img className="pipe37" src={Pipe_LB} />
            <img className="pipe40" src={Pipe_hori} />
            <img className="pipe41" src={Pipe_hori} />

            <img
              title=" VALVE B1 "
              className="valve6"
              src={ConvertStateValve(stateValveB1, faultValveB1)}
              onClick={() => setPopupValve6(true)}
            />

            <Popup
              title="Valve B1"
              openPopup={popupValve6}
              setOpenPopup={setPopupValve6}
            >
              <ValvePop on={"VB1"} emit={"VB1"} />{" "}
            </Popup>

            <img
              title=" VALVE B2 "
              className="valve7"
              src={ConvertStateValve(stateValveB2, faultValveB2)}
              onClick={() => setPopupValve7(true)}
            />

            <Popup
              title="Valve B2"
              openPopup={popupValve7}
              setOpenPopup={setPopupValve7}
            >
              <ValvePop on={"VB2"} emit={"VB2"} />{" "}
            </Popup>

            <img className="pipe42" src={Pipe_fork_down} />
            <img className="pipe43" src={Pipe_fork_down} />

            <img
              title=" VALVE B3 "
              className="valve8"
              src={ConvertStateValve(stateValveB3, faultValveB3)}
              onClick={() => setPopupValve8(true)}
            />
            <Popup
              title="Valve B3"
              openPopup={popupValve8}
              setOpenPopup={setPopupValve8}
            >
              <ValvePop on={"VB3"} emit={"VB3"} />{" "}
            </Popup>
            <img
              title=" VALVE B4 "
              className="valve9"
              src={ConvertStateValve(stateValveB4, faultValveB4)}
              onClick={() => setPopupValve9(true)}
            />
            <Popup
              title="Valve B4"
              openPopup={popupValve9}
              setOpenPopup={setPopupValve9}
            >
              <ValvePop on={"VB4"} emit={"VB4"} />{" "}
            </Popup>

            <img className="pipe46" src={Pipe_alight} />
            <img className="pipe44" src={Pipe_RB} />
            <img className="pipe45" src={Pipe_fork_alight_left} />
          </div>

          {/* ----------afterTank3---------- */}
          <div className="after-tank3">
            <img className="pipe50" src={Pipe_hori} />
            <img className="pipe47" src={Pipe_fork} />
            <img className="pipe48" src={Pipe_LB} />
            <img className="pipe49" src={Pipe_angle} />

            <img
              title=" VALVE B5 "
              className="valve10"
              src={ConvertStateValve(stateValveB5, faultValveB5)}
              onClick={() => setPopupValve10(true)}
            />
            <Popup
              title="Valve B5"
              openPopup={popupValve10}
              setOpenPopup={setPopupValve10}
            >
              <ValvePop on={"VB5"} emit={"VB5"} />{" "}
            </Popup>

            <img className="pipe52" src={Pipe_alight} />
            <img className="pipe51" src={Pipe_RT} />
            <img className="pipe54" src={Pipe_LB} />
          </div>
          {/* -------LevelTank3----- */}
          <p className="sensor2value"> Pressure: {pressure2} bar </p>
          <img title=" Pressure Sensor " className="sensor2" src={Sensor} />
          <p className="flow2value">Flow:{flow2}m3/h</p>
           <img title=" Flow Sensor " className="flow2" src= {FlowMeter} />
        </div>
        {/* -------------Tank4-------- */}
        <div className="tank4-container">
          {/* ------------Before Tank4--------------------*/}
          <div className="before-tank4"></div>

          {/* --------After Tank 4---------- */}
          <div className="after-tank4">
            <img className="pipe60" src={Pipe_alight} />

            <img className="pipe63" src={Pipe_hori} />
            <img className="pipe61" src={Pipe_RT} />

            <img className="pipe65" src={Pipe_alight} />
            <img className="pipe67" src={Pipe_hori} />
            <img className="pipe66" src={Pipe_RB} />
            <img className="pipe64" src={Pipe_fork} />

            <img
              title=" VALVE C1 "
              className="valve11"
              src={ConvertStateValve(stateValveC1, faultValveC1)}
              onClick={() => setPopupValve11(true)}
            />
            <Popup
              title="Valve C1"
              openPopup={popupValve11}
              setOpenPopup={setPopupValve11}
            >
              <ValvePop on={"VC1"} emit={"VC1"} />{" "}
            </Popup>

            <img
              title=" VALVE C2 "
              className="valve12"
              src={ConvertStateValve(stateValveC2, faultValveC2)}
              onClick={() => setPopupValve12(true)}
            />
            <Popup
              title="Valve C2"
              openPopup={popupValve12}
              setOpenPopup={setPopupValve12}
            >
              <ValvePop on={"VC2"} emit={"VC2"} />{" "}
            </Popup>

            <img
              title=" Pressure Pump 1 "
              className="pump4"
              src={ConvertStatePump4(statePump4, faultPump4)}
              onClick={() => setPopupPump4(true)}
            />
            <p className="speed4value">{speedPump4} %</p>
            <Popup
              title="Pressure Pump 1"
              openPopup={popupPump4}
              setOpenPopup={setPopupPump4}
            >
              <PumpPop on={"Pump_4"} emit={"Pump_4"} />
            </Popup>
            <img
              title=" Pressure Pump 2 "
              className="pump5"
              src={ConvertStatePump5(statePump5, faultPump5)}
              onClick={() => setPopupPump5(true)}
            />
            <p className="speed5value"> {speedPump5} %</p>
            <Popup
              title="Pressure Pump 2"
              openPopup={popupPump5}
              setOpenPopup={setPopupPump5}
            >
              <PumpPop on={"Pump_5"} emit={"Pump_5"} />
            </Popup>
          </div>
        </div>
        <img title="Raw Tank" className="tank4" src={RawTank} />
        <div className="leveltank4">
          <Level value={levelTankM} maxValue={3} height={140} />
        </div>

        <div className="RO-UV-CTank">
          {/* -----------RO Filter------------ */}
          <div className="RO-filter-container">
            {/* --------before ROFilter------------ */}

            <div className="before-ro-filter">
              <img className="pipe53" src={Pipe_alight} />

              <img className="pipe71" src={Pipe_alight} />
              <img className="pipe70" src={Pipe_hori} />
              <img className="pipe73" src={Pipe_hori} />
              <img className="pipe68" src={Pipe_LT} />
              <img className="pipe72" src={Pipe_RB} />
              <img className="pipe57" src={Pipe_fork_down} />
              <img className="pipe69" src={Pipe_fork} />

              <img title=" Pressure Sensor " className="sensor3" src={Sensor} />
              <p className="sensor3value">Pressure: {pressure3} bar </p>
             
            </div>
            {/* --------after ROFilter------------ */}

            <div className="after-ro-filter">
              <img className="pipe75" src={Pipe_hori} />
              <img className="pipe76" src={Pipe_alight} />
              <img className="pipe74" src={Pipe_fork_down} />
              <img className="pipe86" src={Pipe_alight} />
              <img className="pipe78" src={Pipe_hori} />
              <img className="pipe77" src={Pipe_LT} />
              <img className="pipe80" src={Pipe_alight} />
              <img className="pipe79" src={Pipe_RB} />
              <img className="pipe81" src={Pipe_RT} />

              <img className="pipe84" src={Pipe_hori} />
              <img className="pipe85" src={Pipe_alight} />
              <img className="pipe83" src={Pipe_fork_down} />
              <img className="pipe82" src={Pipe_LT} />
              <img className="pipe92" src={Pipe_alight} />
              <img className="pipe87" src={Pipe_hori} />
              <img className="pipe89" src={Pipe_hori} />
              <img className="pipe88" src={Pipe_fork_alight_right} />
              <img className="pipe91" src={Pipe_hori} />
              <img className="pipe90" src={Pipe_fork_alight_right} />
              <img className="pipe93" src={Pipe_hori} />
              <img className="pipe94" src={Pipe_fork_alight_right} />
              <img className="pipe95" src={Pipe_RT} />
            </div>
            {/* -----------RO------- */}
            <div className="rofilter">
              <img title="RO Filter 1" className="rofilter1" src={ROFilter} />
              <img title="RO Filter 2" className="rofilter2" src={ROFilter} />
              <img title="RO Filter 3" className="rofilter3" src={ROFilter} />
              <img title="RO Filter 4" className="rofilter4" src={ROFilter} />
              <tr className="flow3value">Flow:{flow3}m3/h</tr>
           <img title=" Flow Sensor " className="flow3" src= {FlowMeter} />
              {/* <p className='label-ro-filter' > RO FILTER </p> */}
            </div>
          </div>
          {/* -----------uv Filter------------ */}
          <div className="uv-filter-container">
            {/* --------before uvFilter------------ */}
            <div className="before-uv-filter">
              <img className="pipe96" src={Pipe_hori} />
              <img
                title=" VALVE C3 "
                className="valve13"
                src={ConvertStateValve(stateValveC3, faultValveC3)}
                onClick={() => setPopupValve13(true)}
              />
              <Popup
                title="Valve C3"
                openPopup={popupValve13}
                setOpenPopup={setPopupValve13}
              >
                <ValvePop on={"VC3"} emit={"VC3"} />{" "}
              </Popup>

              <img
                title=" PUMP 6 "
                className="pump6"
                onClick={() => setPopupPump6(true)}
                src={ConvertStatePump236(statePump6, faultPump6)}
              />
            <p className="speed6value"> {speedPump6} %</p>
              <Popup
                title="Pump 6"
                openPopup={popupPump6}
                setOpenPopup={setPopupPump6}
              >
                <PumpPop on={"Pump_6"} emit={"Pump_6"} />
              </Popup>
            </div>
            {/* --------after uvFilter------------ */}
            <div className="after-uv-filter">
              <img className="pipe97" src={Pipe_LB} />
              <img className="pipe98" src={Pipe_hori} />
            </div>
            {/* -----------uv------- */}
            <img
              title="UV Water Filter"
              className="uvfilter"
              src={stateUV ? UVFilterRun : UVFilter}
            />
            {/* <p className='label-uv-filter' > UV FILTER </p> */}
          </div>
          {/* ------------------Tank 5  Water Tank------------------------------ */}

          <div className="water-tank">
            <img title="Water Tank" className="watertank" src={RawTank} />
            {/* <p className='label-watertank' > WATER TANK </p> */}
          </div>
          <div className="leveltank5">
            <Level value={levelTankC} maxValue={3} height={140} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainSection2;
