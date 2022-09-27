"use strict";

import LiteGraph from "litegraph.js";
import { open } from "#extension:rc_dock";
import {
  AbsoluteOrientationSensor,
  RelativeOrientationSensor,
} from "./sensor-polyfills";
import Test from "./test";
import "./test2";
import { fetch, LightSensorPosition, loadImage, makeInstanceMesh } from "./neostack";

// import("./test").then((e) => e.default());

// const _peer = createRef();
// const clearAll = createRef();
// const trigger = createRef();
// function Test() {
//   const inputRef = useRef();
//   const [l, setl] = useState(imList());

//   const initWatcher = React.useCallback(function initWatcher() {
//     console.log(window, globalThis,window===globalThis);
//     const peer = (_peer.current = new Peer({
//       initiator: true,
//       trickle: false,
//     }));
//     peer.on("error", (err) => console.log("error", err));
//     peer.on("signal", (d) => {
//       console.log(d);
//       setl((i) =>
//         i.push("offer:").push(JSON.stringify(d)).push("please input answer:")
//       );
//     });
//     peer.on("connect", () => {
//       setl((i) => i.push("Successfully Connected"));
//     });
//     console.log(peer);
//     peer.on("data", trigger.current);
//   }, []);

//   const initSensor = React.useCallback(function initSensor() {
//     const peer = (_peer.current = new Peer({ initiator: false }));
//     peer.on("signal", (d) =>
//       setl((i) => i.push("answer:").push(JSON.stringify(d)))
//     );
//     peer.on("connect", () => {
//       setl((i) => i.push("Successfully Connected"));
//     });
//   }, []);
//   function handleOnClick() {
//     const text = inputRef.current.value;
//     _peer.current.signal(JSON.parse(text));
//   }

//   useEffect(() => {
//     clearAll.current = () => setl(imList());
//   }, []);

//   return l.size > 0 ? (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: "var(--dx-grey-2)",
//       }}
//     >
//       <List sx={{ flex: 1, width: "100%" }}>
//         {l.map((i) => (
//           <ListItem>
//             <Typography variant="body1">{i}</Typography>
//           </ListItem>
//         ))}
//       </List>
//       <Box sx={{ display: "flex", width: "100%" }}>
//         <TextField fullWidth inputRef={inputRef} />
//         <IconButton onClick={handleOnClick}>
//           <SendIcon />
//         </IconButton>
//       </Box>
//     </Box>
//   ) : (
//     <ButtonGroup fullWidth>
//       <Button onClick={initWatcher}>Watcher</Button>
//       <Button onClick={initSensor}>Sensor</Button>
//     </ButtonGroup>
//   );
// }

function deviceOrientation() {
  console.log("nav: ", navigator.permissions.query);
  console.log(
    navigator.permissions
      .query({ name: "accelerometer" })
      .catch((e) => console.error(e)),
    navigator.permissions.query({ name: "magnetometer" }),
    navigator.permissions.query({ name: "gyroscope" })
  );
  if (navigator.permissions) {
    const initSensor = () => {
      const options = { frequency: 60, coordinateSystem: undefined };
      console.log(JSON.stringify(options));
      // this.sensor = relative
      //   ? new RelativeOrientationSensor(options)
      //   : new AbsoluteOrientationSensor(options);
      this.sensor = new RelativeOrientationSensor(options);
      this.sensor.onreading = () => {
        console.log(this.sensor.quaternion);
        this.triggerSlot(0, JSON.stringify(this.sensor.quaternion));
      };
      this.sensor.onerror = (event) => {
        if (event.error.name === "NotReadableError") {
          console.log("Sensor is not available.");
        }
      };

      // sensor.tart();
    };

    // https://w3c.github.io/orientation-sensor/#model
    Promise.all([
      navigator.permissions.query({ name: "accelerometer" }),
      navigator.permissions.query({ name: "magnetometer" }),
      navigator.permissions.query({ name: "gyroscope" }),
    ])
      .then((results) => {
        if (results.every((result) => result.state === "granted")) {
          initSensor();
        } else {
          console.log("Permission to use sensor was denied.");
        }
      })
      .catch((err) => {
        console.log(
          "Integration with Permissions API is not enabled, still try to start app.",
          err
        );
        // initSensor();
      });
  } else {
    console.error("error", navigator.permissions);
  }
  this.addOutput("evt", LiteGraph.EVENT);
}
deviceOrientation.title = "deviceOrientation";
deviceOrientation.prototype.onExecute = function () {
  console.log(this.sensor);
  this.sensor.start();
};

LiteGraph.registerNodeType("input/gyroAcc2", deviceOrientation);

function test33() {
  this.addOutput("sendFunction", "");
  // this.addOutput("evt", LiteGraph.EVENT);
  this.openWindow = function () {
    open(undefined, {
      id: "::tmp::testWebrtc",
      title: "testWebrtc",
      content: <Test />,
    });
  };
  this.defaultButton = this.addWidget(
    "button",
    "view",
    null,
    this.openWindow,
    {}
  );
  this.defaultButton2 = this.addWidget(
    "button",
    "view3",
    null,
    this.openWindow,
    {}
  );
}
test33.title = "test33";
test33.prototype.onExecute = function () {
  this.setOutputData(0, "test from node2");
};

// const content = function Main() {
//   return <Test />;
// };
// open(undefined, { id: "::tmp::asdjgewio", title: "teta", content });
// open(undefined, );
LiteGraph.registerNodeType("test/te2st3", test33);



LiteGraph.registerNodeType("neostack/LightSensorPosition",  LightSensorPosition);
LiteGraph.registerNodeType("neostack/loadImage", loadImage);
LiteGraph.registerNodeType("neostack/makeInstanceMesh", makeInstanceMesh);
LiteGraph.registerNodeType("neostack/fetch", fetch);