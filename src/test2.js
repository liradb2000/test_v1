import { liteSensorData } from "./nslightdata";
import * as THREE from "three";
// import axios from "axios";
export class test {
  constructor() {
    // this.threeColor = new THREE.Color();
    this.datra = liteSensorData;
    console.log("hello");
  }
  static title = "loadImage";
  path = "neostack";

  async onExecute() {
    // let response = await axios();
    // return response;
    const ImageBlob = this.getInputData(0);
    let url = "";
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
export class test2 {
  constructor() {
    console.log("hello2");
  }
  static title = "loadImage2";
  path = "neostack";
}
export class test3 {
  constructor() {
    console.log("hello3");
  }
  static title = "loadImage3";
  path = "neostack";
}
export class test4 {
  constructor() {
    console.log("hello4");
  }
  static title = "loadImage3";
  path = "neostack";
}
// export class fetchss {
//   constructor() {
//     console.log("aa");
//     // this.addInput("url", 0);
//     // this.addInput("method", 0);
//     // this.addInput("header", 0);
//     // this.addInput("body", 0);
//     // this.addOutput("data", 0);
//   }
//   static get title() {
//     return "fetchss";
//   }
//   static get path() {
//     return "neostack";
//   }

//   // async onExecute() {
//   //   const baseURL = this.getInputData(0);
//   //   const method = this.getInputData(1);
//   //   const headers = this.getInputData(2);
//   //   const body = this.getInputData(3);

//   //   let response = await axios(baseURL, {
//   //     method: method,
//   //     headers: headers,
//   //     data: body,
//   //   });

//   //   this.setOutputData(0, response.data);
//   // }
// }
