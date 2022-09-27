import { liteSensorData } from "./nslightdata";
import * as THREE from "three";
import imagMap from "./sensor.jpg";
import axios from "axios";

export function fetch() {
  this.addInput("url", 0);
  this.addInput("method", 0);
  this.addInput("header", 0);
  this.addInput("body", 0);
  this.addOutput("data", 0);
}

fetch.title = "fetch";

fetch.prototype.onExecute = async function () {
  const baseURL = this.getInputData(0);
  const method = this.getInputData(1);
  const headers = this.getInputData(2);
  const body = this.getInputData(3);

  let response = await axios(baseURL, {
    method: method,
    headers: headers,
    data: body
  });

  this.setOutputData(0, response.data);
}



export function LightSensorPosition() {
  this.addInput("data", 0);
  this.addOutput("position", 0);
  this.addOutput("data", 0);
}

LightSensorPosition.title = "LightSensorPosition";

LightSensorPosition.prototype.onExecute = function () {
  let mapWidth = 2814;
  let mapHeight = 2429;
  // console.log("test");
  let data = this.getInputData(0) ?? liteSensorData;
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
};

export function loadImage() {
  this.addInput("path", 0);
  this.addInput("layer", 0);
  this.addOutput("Img", 0);
}

loadImage.title = "loadImage";

loadImage.prototype.onExecute = function () {
  let scale = 1000;
  let loader = new THREE.TextureLoader();
  let imageMap = loader.load(imagMap);
  console.log(imagMap);
  imageMap.wrapS = THREE.RepeatWrapping;
  imageMap.wrapT = THREE.RepeatWrapping;

  let sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: imageMap }));
  sprite.scale.set(2814 * scale, 2429 * scale, 0);
  sprite.translateX(2814 / 2);
  sprite.translateY(2429 / 2);
  // sprite.scale.set(2814, 0, 2429);
  // sprite.translateX(2814 / 2);
  // sprite.translateZ(2429 / 2);

  console.log(imageMap);
  console.log(sprite);
  this.setOutputData(0, sprite);
};

export function makeInstanceMesh() {
  this.addInput("geometry", 0);
  this.addInput("material", 0);
  this.addInput("position", 0); // [[x,y,z], [x,y,z].....]
  this.addInput("color", 0); // [hexcode,hexcode.......] || hexcode
  this.addOutput("instanceMesh", 0);
}

makeInstanceMesh.title = "makeInstanceMesh";

makeInstanceMesh.prototype.onExecute = function () {
  // let scale = 1000;
  const geo = this.getInputData(0) ?? new THREE.CircleGeometry(16, 32);
  const mat =
    this.getInputData(1) ?? new THREE.MeshBasicMaterial({ color: 0xff9f40 });
  const position = this.getInputData(2) ?? [];
  const hexCodes = this.getInputData(3) ?? [mat.color.getHex()];
  const count = position.length;

  const instancedMesh = new THREE.InstancedMesh(geo, mat, count);
  instancedMesh.instanceMatrix.setUsage(THREE.StaticDrawUsage);
  instancedMesh.scale.set(1000, 1000, 1000);

  const dummy = new THREE.Object3D();
  const color = new THREE.Color();

  let n = 0;
  for (let i in position) {
    dummy.position.set(position[i][0], position[i][1], position[i][2]);
    dummy.updateMatrix();
    instancedMesh.setMatrixAt(n, dummy.matrix);
    instancedMesh.setColorAt(
      n,
      color.setHex(hexCodes[i] ? hexCodes[i] : hexCodes[hexCodes.length - 1])
    );
    n++;
  }

  instancedMesh.instanceMatrix.needsUpdate = true;
  this.setOutputData(0, instancedMesh);
};
