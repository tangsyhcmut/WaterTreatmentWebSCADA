require("dotenv").config();
const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const chalk = require("chalk");
// const mailer= require("./mailer")
// const nodemailer =  require('nodemailer');
// const schedule = require("node-schedule");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const fulldataRouter = require("./routes/data");
const trenddataRouter = require("./routes/trenddata");
const dailydataRouter = require("./routes/dailydata");
const DataSchema = require("./models/DataSchema");

// const router = express.Router();
// const verifyToken = require("./middleware/auth");
const nodeOPC = require("./NodeOPC");
const alarm = require("./alarm");
// Connect Port
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);
// Connect MongoDB
const db = require("./config/db");
db.connect();

////////////////////////////////OPC UA
////////////////////////////////////////////////////////////////
const {
  AttributeIds,
  OPCUAClient,
  TimestampsToReturn,
  DataType,
} = require("node-opcua");

const endpointUrl = "opc.tcp://192.168.2.3:4840";
let a = 0;
// Socket.io server-side
//Setup
const io = require("socket.io")(server, {
  cors: {
    origin: PORT,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

/////OPC UA
(async () => {
  try {
    const client = OPCUAClient.create({
      endpoint_must_exist: false,
    });
    client.on("backoff", (retry, delay) => {
      console.log("Retrying to connect to ", endpointUrl, " attempt ", retry);
    });
    console.log(" connecting to ", chalk.cyan(endpointUrl));
    await client.connect(endpointUrl);
    console.log(" connected to ", chalk.cyan(endpointUrl));

    const session = await client.createSession();
    console.log(" session created");

    const subscription = await session.createSubscription2({
      requestedPublishingInterval: 1000,
      requestedLifetimeCount: 1000,
      requestedMaxKeepAliveCount: 20,
      maxNotificationsPerPublish: 10,
      publishingEnabled: true,
      priority: 10,
    });

    subscription
      .on("keepalive", function () {
        console.log("keepalive");
      })
      .on("terminated", function () {
        console.log(" TERMINATED ------------------------------>");
      });

    // ---------------------FC Read-----------------------------------

    async function readNodeMonitor(nodeIdToMonitor, callback) {
      try {
        const itemToMonitor = {
          nodeId: nodeIdToMonitor,
          attributeId: AttributeIds.Value,
        };
        const parameters = {
          samplingInterval: 100,
          discardOldest: true,
          queueSize: 100,
        };
        const monitoredItem = await subscription.monitor(
          itemToMonitor,
          parameters,
          TimestampsToReturn.Both
        );

        monitoredItem.on("changed", (dataValue) => {
          // console.log(nodeIdToMonitor);
          return callback(dataValue);
        });
      } catch (error) {}
    }

    // //---------------FC Read 2-------------
    // async function readNode(nodeIdToMonitor, callback) {
    //   try {
    //     const maxAge = 0;
    //     const nodeToRead = {
    //       nodeId: nodeIdToMonitor,
    //       attributeId: AttributeIds.Value,
    //     };
    //     const dataValue = await session.read(nodeToRead, maxAge);
    //     return callback(dataValue);
    //   } catch (error) {}
    // }

    //TEST WRITE-------------------
    async function WriteNode(setPointTemperatureId, Type, Wvalue) {
      var nodesToWrite = [
        {
          nodeId: setPointTemperatureId,
          attributeId: AttributeIds.Value, 
          value: {
            value: {
              dataType: Type,
              value: Wvalue,
            },
          },
        },
      ];

      await session.write(nodesToWrite, function (err, statusCodes) {
        if (!err) {
        }
      });
    }
     //----------REPORT------------------
     const maxAge = 0;
     const nodeF1 = {
       nodeId: 'ns=3;s="FLow_FA_IN"',
       attributeId: AttributeIds.Value,
     };
     const nodeF2 = {
       nodeId: 'ns=3;s="FLow_FB_IN"',
       attributeId: AttributeIds.Value,
     };
     const nodeF3 = {
       nodeId: 'ns=3;s="FLow_RO_IN"',
       attributeId: AttributeIds.Value,
     };

     const nodeP1 = {
      nodeId: 'ns=3;s="PS1_M"',
      attributeId: AttributeIds.Value,
    };
    const nodeP2 = {
      nodeId: 'ns=3;s="PS2_M"',
      attributeId: AttributeIds.Value,
    };
    const nodeP3 = {
      nodeId: 'ns=3;s="PS3_M"',
      attributeId: AttributeIds.Value,
    };

     let flag = 0;
 
     setInterval(async () => {
       flag = flag + 1;
       const dataF1 = await session.read(nodeF1, maxAge);
       const dataF2 = await session.read(nodeF2, maxAge);
       const dataF3 = await session.read(nodeF3, maxAge);
      
       const dataP1 = await session.read(nodeP1, maxAge);
       const dataP2 = await session.read(nodeP2, maxAge);
       const dataP3 = await session.read(nodeP3, maxAge);

       if (flag > 3 ) {
         const F = {
           F1: dataF1.value.value,
           F2: dataF2.value.value,
           F3: dataF3.value.value,
           
        };
        const P = {
          P1: dataP1.value.value,
          P2: dataP2.value.value,
          P3: dataP3.value.value,
       };
         const data1 = new DataSchema.TestData(F);
         const data2 = new DataSchema.PressureData(P)
         data1.save();
         data2.save();
         flag = 0;
       }
     }, 1000);
     //****************-------FAILT ALARM************************************* */
     const nodereadsfaults = nodeOPC.Nodereadsfaults;
     // --------------------Tracking Fault----------------//
     for (let index = 0; index < nodereadsfaults.length; index++) {
       const nodeIDF = nodereadsfaults[index];
       let Str = nodeIDF.replace('"',''); 
       Str = Str.replace('ns=3;s=',''); 
       Str = Str.replace('_Fault"','');
      //  console.log(Str);
       readNodeMonitor(nodeIDF, (dataValue) => {
         alarm.generateFaultAlarm(dataValue.value.value, Str);
       });
     }
   
    //------------Read NODE SEND to FE-----------------------///
    io.on("connection", (socket) => {
      console.log(socket.id);
      const nodereads = nodeOPC.Nodereads;
      for (let index = 0; index < nodereads.length; index++) {
        const nodeID = nodereads[index];
        readNodeMonitor(nodeID, (dataValue) => {
          if (
            nodeID == 'ns=3;s="PS1_M"' ||
            nodeID == 'ns=3;s="PS2_M"' ||
            nodeID == 'ns=3;s="PS3_M"' ||
            nodeID == 'ns=3;s="FLow_FA_IN"' ||
            nodeID == 'ns=3;s="FLow_FB_IN"' ||
            nodeID == 'ns=3;s="FLow_RO_IN"' ||
            nodeID == 'ns=3;s="Pump_1"."Speed"' ||
            nodeID == 'ns=3;s="Pump_2"."Speed"' ||
            nodeID == 'ns=3;s="Pump_3"."Speed"' ||
            nodeID == 'ns=3;s="Pump_4"."Speed"' ||
            nodeID == 'ns=3;s="Pump_5"."Speed"' ||
            nodeID == 'ns=3;s="Pump_6"."Speed"' 

          ) {
            socket.emit(nodeID, dataValue.value.value.toFixed(2));
          } else {
            socket.emit(nodeID, dataValue.value.value);
          }
        });
      }
    
      // const nodereads2 = [  'ns=3;s="PS1_M"',
      //  'ns=3;s="PS2_M"',
      //  'ns=3;s="PS3_M"'];
      // let Pre_Read2 = [];
      // setInterval(() => {
      //   for (let index = 0; index < nodereads.length; index++) {
      //     const nodeID2 = nodereads2[index];
      //     readNode(nodeID2, (dataValue) => {
      //       if (dataValue.value.value.toString() !== Pre_Rea2d[index]) {
      //         Pre_Read2[index] = dataValue.value.value.toString();
      //         socket.emit(nodeID2, dataValue.value.value.toFixed(2));
      //       }
      //     });
      //   }
      // }, 450);

      //  --------------------------------socket on------------------------------------//

      socket.on("Button", (message) => {
        let node = "ns=3;s=" + message;
        /////SYSTEM
        // console.log(message);
        WriteNode(node, DataType.Boolean, true);
        WriteNode(node, DataType.Boolean, false);
      });
      ////////////////////////////--------------------Setmode
      socket.on("VAF_MODE", (message) => {
        let VM = 5;
        // console.log(typeof message);
        if (message === "0") {
          VM = 0;
        }
        if (message === "2") {
          VM = 2;
        }
        if (message === "1") {
          VM = 1;
        }

        WriteNode('ns=3;s="VF"."MODE"', DataType.Int16, VM);
      });
      socket.on("VA1_MODE", (message) => {
        let VM = 5;
        // console.log(typeof message);
        if (message === "0") {
          VM = 0;
        }
        if (message === "2") {
          VM = 2;
        }
        if (message === "1") {
          VM = 1;
        }

        WriteNode('ns=3;s="VA1"."MODE"', DataType.Int16, VM);
      });
      socket.on("VA2_MODE", (message) => {
        let VM = 5;
      
        if (message === "0") {
          VM = 0;
        }
        if (message === "2") {
          VM = 2;
        }
        if (message === "1") {
          VM = 1;
        }

        WriteNode('ns=3;s="VA2"."MODE"', DataType.Int16, VM);
      });
      socket.on("VA3_MODE", (message) => {
        let VM = 5;
      
        if (message === "0") {
          VM = 0;
        }
        if (message === "2") {
          VM = 2;
        }
        if (message === "1") {
          VM = 1;
        }

        WriteNode('ns=3;s="VA3"."MODE"', DataType.Int16, VM);
      });
      socket.on("VA4_MODE", (message) => {
        let VM = 5;
      
        if (message === "0") {
          VM = 0;
        }
        if (message === "2") {
          VM = 2;
        }
        if (message === "1") {
          VM = 1;
        }

        WriteNode('ns=3;s="VA4"."MODE"', DataType.Int16, VM);
      });
      socket.on("VA5_MODE", (message) => {
        let VM = 5;
      
        if (message === "0") {
          VM = 0;
        }
        if (message === "2") {
          VM = 2;
        }
        if (message === "1") {
          VM = 1;
        }

        WriteNode('ns=3;s="VA5"."MODE"', DataType.Int16, VM);
      });
      socket.on("VB1_MODE", (message) => {
        let VM = 5;
      
        if (message === "0") {
          VM = 0;
        }
        if (message === "2") {
          VM = 2;
        }
        if (message === "1") {
          VM = 1;
        }

        WriteNode('ns=3;s="VB1"."MODE"', DataType.Int16, VM);
      });
      socket.on("VB2_MODE", (message) => {
        let VM = 5;
      
        if (message === "0") {
          VM = 0;
        }
        if (message === "2") {
          VM = 2;
        }
        if (message === "1") {
          VM = 1;
        }

        WriteNode('ns=3;s="VB2"."MODE"', DataType.Int16, VM);
      });
      socket.on("VB3_MODE", (message) => {
        let VM = 5;
      
        if (message === "0") {
          VM = 0;
        }
        if (message === "2") {
          VM = 2;
        }
        if (message === "1") {
          VM = 1;
        }

        WriteNode('ns=3;s="VB3"."MODE"', DataType.Int16, VM);
      });
      socket.on("VB4_MODE", (message) => {
        let VM = 5;
      
        if (message === "0") {
          VM = 0;
        }
        if (message === "2") {
          VM = 2;
        }
        if (message === "1") {
          VM = 1;
        }

        WriteNode('ns=3;s="VB4"."MODE"', DataType.Int16, VM);
      });
      socket.on("VB5_MODE", (message) => {
        let VM = 5;
      
        if (message === "0") {
          VM = 0;
        }
        if (message === "2") {
          VM = 2;
        }
        if (message === "1") {
          VM = 1;
        }

        WriteNode('ns=3;s="VB5"."MODE"', DataType.Int16, VM);
      });
      socket.on("VC1_MODE", (message) => {
        let VM = 5;
      
        if (message === "0") {
          VM = 0;
        }
        if (message === "2") {
          VM = 2;
        }
        if (message === "1") {
          VM = 1;
        }

        WriteNode('ns=3;s="VC1"."MODE"', DataType.Int16, VM);
      });
      socket.on("VC2_MODE", (message) => {
        let VM = 5;
      
        if (message === "0") {
          VM = 0;
        }
        if (message === "2") {
          VM = 2;
        }
        if (message === "1") {
          VM = 1;
        }

        WriteNode('ns=3;s="VC2"."MODE"', DataType.Int16, VM);
      });
      socket.on("VC3_MODE", (message) => {
        let VM = 5;
      
        if (message === "0") {
          VM = 0;
        }
        if (message === "2") {
          VM = 2;
        }
        if (message === "1") {
          VM = 1;
        }

        WriteNode('ns=3;s="VC3"."MODE"', DataType.Int16, VM);
      });
      ////
      socket.on("Pump1_MODE", (message) => {
        let PM = 5;
      
        if (message === "0") {
          PM = 0;
        }
        if (message === "2") {
          PM = 2;
        }
        if (message === "1") {
          PM = 1;
        }

        WriteNode('ns=3;s="Pump_1"."MODE"', DataType.Int16, PM);
      });
      socket.on("Pump2_MODE", (message) => {
        let PM = 5;
      
        if (message === "0") {
          PM = 0;
        }
        if (message === "2") {
          PM = 2;
        }
        if (message === "1") {
          PM = 1;
        }

        WriteNode('ns=3;s="Pump_2"."MODE"', DataType.Int16, PM);
      });
      socket.on("Pump3_MODE", (message) => {
        let PM = 5;
      
        if (message === "0") {
          PM = 0;
        }
        if (message === "2") {
          PM = 2;
        }
        if (message === "1") {
          PM = 1;
        }

        WriteNode('ns=3;s="Pump_3"."MODE"', DataType.Int16, PM);
      });
      socket.on("Pump4_MODE", (message) => {
        let PM = 5;
      
        if (message === "0") {
          PM = 0;
        }
        if (message === "2") {
          PM = 2;
        }
        if (message === "1") {
          PM = 1;
        }

        WriteNode('ns=3;s="Pump_4"."MODE"', DataType.Int16, PM);
      });
      socket.on("Pump5_MODE", (message) => {
        let PM = 5;
      
        if (message === "0") {
          PM = 0;
        }
        if (message === "2") {
          PM = 2;
        }
        if (message === "1") {
          PM = 1;
        }

        WriteNode('ns=3;s="Pump_5"."MODE"', DataType.Int16, PM);
      });
      socket.on("Pump6_MODE", (message) => {
        let PM = 5;
      
        if (message === "0") {
          PM = 0;
        }
        if (message === "2") {
          PM = 2;
        }
        if (message === "1") {
          PM = 1;
        }

        WriteNode('ns=3;s="Pump_6"."MODE"', DataType.Int16, PM);
      });
      /////--------SET SPEED-----------------------------//////////////

      socket.on("SetSpeed_Pump_1", (message) => {
        WriteNode('ns=3;s="Pump_1"."SetSpeed"', DataType.Float, message);
      });
      socket.on("SetSpeed_Pump_2", (message) => {
        WriteNode('ns=3;s="Pump_2"."SetSpeed"', DataType.Float, message);
      });
      socket.on("SetSpeed_Pump_3", (message) => {
        WriteNode('ns=3;s="Pump_3"."SetSpeed"', DataType.Float, message);
      });
      socket.on("SetSpeed_Pump_4", (message) => {
        WriteNode('ns=3;s="Pump_4"."SetSpeed"', DataType.Float, message);
      });
      socket.on("SetSpeed_Pump_5", (message) => {
        WriteNode('ns=3;s="Pump_5"."SetSpeed"', DataType.Float, message);
      });
      socket.on("SetSpeed_Pump_6", (message) => {
        WriteNode('ns=3;s="Pump_6"."SetSpeed"', DataType.Float, message);
      });

      /////--------SET Parameters-------------------------------------//////////////

      // socket.on("SetPressure_1", (message) => {
      //   WriteNode(
      //     'ns=3;s="DataSystem"."PS_Filter1_Set"',
      //     DataType.Float,
      //     message
      //   );
      // });
      // socket.on("SetPressure_2", (message) => {
      //   WriteNode(
      //     'ns=3;s="DataSystem"."PS_Filter2_Set"',
      //     DataType.Float,
      //     message
      //   );
      // });
      // socket.on("SetPressure_3", (message) => {
      //   WriteNode('ns=3;s="DataSystem"."PS_RO_Set"', DataType.Float, message);
      // });

      socket.on("Clean_Rinse", (message) => {
        WriteNode('ns=3;s="DataSystem"."Time_Rinse"', DataType.Int32, message);
        console.log(message);
      });
      socket.on("Clean_Backwash", (message) => {
        WriteNode(
          'ns=3;s="DataSystem"."Time_Backwash"',
          DataType.Int32,
          message
        );
      });
      socket.on("Convert23", (message) => {
        console.log(message);
        WriteNode(
          'ns=3;s="DataSystem"."TimeInvertPump23"',
          DataType.Int32,
          message
        );
      });
      socket.on("Convert45", (message) => {
        WriteNode(
          'ns=3;s="DataSystem"."TimeInvertPump45"',
          DataType.Int32,
          message
        );
      });

      socket.on("disconnect", () => {
        console.log("USER DISCONNECTED");
      });
    });

    let running = true;
    process.on("SIGINT", async () => {
      if (!running) {
        return; // avoid calling shutdown twice
      }
      console.log("shutting down client");
      running = false;

      await subscription.terminate();

      await session.close();
      await client.disconnect();
      console.log("Done");
      process.exit(0);
    });
  } catch (err) {
    console.log(chalk.bgRed.white("Error" + err.message));
    console.log(err);
    process.exit(-1);
  }
})();

//********** */

app.use(express.json());
app.use(cors());
/// khai bao ham se thuc hien khi den url
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/data", fulldataRouter);
app.use("/api/trenddata", trenddataRouter);
app.use("/api/dailydata", dailydataRouter);
// schedule mailer
// schedule.scheduleJob('*/1 * * * *', ()=>{
//  let senddata
// app.get("/api/trenddata", verifyToken, async (req, res) => {
//   try {senddata = await DataSchema.find() ///{createdAt:new Date.getDay()}

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });
//   console.log(senddata)
//   var text =
//   'Hello {{name}} please find this email as an update to you project.\n' + senddata ;
//   console.log(text);
//   var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'huufuks99@gmail.com',
//       pass: 'le6minhhuu74phuc1'
//     }
//   });

// var mailOptions = {
//     from: 'huufuks99@gmail.com',
//     to: 'phucle11299@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: text ,

//   };

//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// });
