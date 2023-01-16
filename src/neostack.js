// import { liteSensorData } from "./nslightdata";
import * as THREE from "three";
import axios from "axios";

export class fetch {
  constructor() {
    this.addInput("url", 0);
    this.addInput("method", 0);
    this.addInput("header", 0);
    this.addInput("body", 0);
    this.addOutput("data", 0);
  }
  static title = "fetch";
  static path = "neostack";

  async onExecute() {
    const baseURL = this.getInputData(0);
    const method = this.getInputData(1);
    const headers = this.getInputData(2);
    const body = this.getInputData(3);

    let response = await axios(baseURL, {
      method: method,
      headers: headers,
      data: body,
    });

    this.setOutputData(0, response.data);
  }
}

export class LightSensorPosition {
  constructor() {
    this.addInput("data", 0);
    this.addOutput("position", 0);
    this.addOutput("data", 0);
  }
  static title = "LightSensorPosition";
  static path = "neostack";

  onExecute() {
    let mapWidth = 2814;
    let mapHeight = 2429;
    // console.log("test");
    let data = this.getInputData(0);
    // let data = this.getInputData(0) ?? liteSensorData;
    // let data = liteSensorData;

    let position = [];

    for (let i in data) {
      for (let j in data[i]["pn"]) {
        position.push([
          (mapWidth / 100) * data[i]["pn"][j].x,
          mapHeight - (mapHeight / 100) * data[i]["pn"][j].y,
          1000,
        ]);
      }
    }
    this.setOutputData(0, position);
    this.setOutputData(1, data);
  }
}

export class loadImage {
  constructor() {
    this.addInput("blob", 0);
    this.addOutput("Img", 0);
  }
  static title = "loadImage";
  static path = "neostack";

  onExecute() {
    const ImageBlob = this.getInputData(0);

    let url = window.URL.createObjectURL(ImageBlob);
    let scale = 1000;
    let loader = new THREE.TextureLoader();
    let imageMap = loader.load(url);

    imageMap.wrapS = THREE.RepeatWrapping;
    imageMap.wrapT = THREE.RepeatWrapping;

    let sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: imageMap }));
    sprite.scale.set(2814 * scale, 2429 * scale, 0);
    sprite.translateX(2814 / 2);
    sprite.translateY(2429 / 2);

    this.setOutputData(0, sprite);
  }
}

export class SensorData {
  constructor() {
    this.addInput("object3Ds", 0);
    this.addInput("data", 0);
    this.addOutput("title", 0);
    this.addOutput("content", 0);
  }
  static title = "SensorData";
  static path = "neostack";

  onExecute() {
    let data = this.getInputData(0);
    let liteSensorData = this.getInputData(1);

    if (!data) return;

    let filtered = data.filter(
      (intersection) => intersection.object.userData.name !== "orbitPoint"
    );
    let instanceId = filtered[0]?.instanceId ?? -1;
    if (filtered.length === 2 && instanceId > -1) {
      // console.log("instanceId", instanceId);
      let index = 0;
      loop1: for (let i in liteSensorData) {
        for (let j in liteSensorData[i]["pn"]) {
          index += 1;
          if (instanceId === index - 1) {
            this.setOutputData(
              0,
              `${liteSensorData[i]["pn"][j].serial_number}.json`
            );
            this.setOutputData(1, JSON.stringify(liteSensorData[i]["pn"][j]));
            break loop1;
          }
        }
      }
    }
  }
}

// export class PickBymousemove {
//   constructor(){

//     this.pickedObject = null;
//     this.pickedObjectSavedColor = 0;
//     this.threeColor = new THREE.Color();
//     this.instanceId = null;
//     this.addOutput("func", 0);
//   }
//   static title = "PickBymousemove";
//   static path = "neostack";

//   onExecute() {
//     let that = this;

//     function pick(intersectedObjects) {
//       if (that.pickedObject && that.pickedObject.type !== "Sprite") {
//         that.pickedObject.setColorAt(
//           that.instanceId,
//           that.threeColor.setHex(0xff9f40)
//         );
//         that.pickedObject.instanceColor.needsUpdate = true;
//         that.pickedObject = undefined;
//       }

//       let sensorObject = intersectedObjects.filter(
//         (d) => d.object.geometry.type === "CircleGeometry"
//       );
//       if (sensorObject.length > 0) {
//         that.instanceId = sensorObject[0].instanceId;
//         that.pickedObject = sensorObject[0].object;
//         // that.pickedObjectSavedColor = that.pickedObject.material.color.getHex();
//         that.pickedObject.setColorAt(
//           that.instanceId,
//           that.threeColor.setHex(0xff0000)
//         );
//         that.pickedObject.instanceColor.needsUpdate = true;
//       }
//     }

//     this.setOutputData(0, pick);
//   };
// }
