import { exec } from "child_process";
import inquirer from "inquirer";
import fs from "fs";
import cache from "node-persist";

//App for android connection by ADB

var pathScrcpy;

cache
  .init({ dir: process.cwd() + "\\cache" })
  .then(async () => {
    await main();
  })
  .catch((err) => {
    if (err) throw err;
  });

async function main() {
  pathScrcpy = await cache.getItem("pathScrcpy");
  pathScrcpy == undefined ? downloadScrcpy() : menu();
}

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: ["Pair", "Connect", "Disconnect", "List", "ScreenConnect"],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "Pair":
          pair();
          break;
        case "Connect":
          connect();
          break;
        case "Disconnect":
          disconnect();
          break;
        case "List":
          list();
          break;
        case "ScreenConnect":
          screenConnect();
          break;
        default:
          break;
      }
    });
}

function pair() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "ip",
        message: "What is the IP of the device?",
      },
      {
        type: "input",
        name: "port",
        message: "What is the port of the device?",
      },
      {
        type: "input",
        name: "code",
        message: "What is the code of the device?",
      },
    ])
    .then((answers) => {
      exec(
        `cd ${process.cwd() + "\\" + pathScrcpy} && adb pair ${answers.ip}:${
          answers.port
        } ${answers.code}`,
        (err, stdout, stderr) => {
          if (err) throw err;
          console.log(stdout);
          console.log(stderr);
          menu();
        }
      );
    });
}

function connect() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "ip",
        message: "What is the IP of the device?",
      },
      {
        type: "input",
        name: "port",
        message: "What is the port of the device?",
      },
    ])
    .then((answers) => {
      exec(
        `cd ${process.cwd() + "\\" + pathScrcpy} && adb connect ${answers.ip}:${
          answers.port
        }`,
        (err, stdout, stderr) => {
          if (err) throw err;
          console.log(stdout);
          console.log(stderr);
          menu();
        }
      );
    });
}

function disconnect() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: ["Disconnect by IP", "Disconnect All"],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "Disconnect by IP":
          disconnectByIp();
          break;
        case "Disconnect All":
          disconnectAll();
          break;
        default:
          break;
      }
    });
}

function disconnectAll() {
  exec(
    `cd ${process.cwd() + "\\" + pathScrcpy} && adb disconnect`,
    (err, stdout, stderr) => {
      if (err) throw err;
      console.log(stdout);
      console.log(stderr);
      menu();
    }
  );
}

function disconnectByIp() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "ip",
        message: "What is the IP of the device?",
      },
      {
        type: "input",
        name: "port",
        message: "What is the port of the device?",
      },
    ])
    .then(async (answers) => {
      exec(
        `cd ${process.cwd() + "\\" + pathScrcpy} && adb disconnect ${
          answers.ip
        }:${answers.port}`,
        (err, stdout, stderr) => {
          if (err) throw err;
          console.log(stdout);
          console.log(stderr);
          menu();
        }
      );
    });
}

function list() {
  exec(
    `cd ${process.cwd() + "\\" + pathScrcpy} && adb devices`,
    (err, stdout, stderr) => {
      if (err) throw err;
      console.log(stdout);
      menu();
    }
  );
}

function screenConnect() {
  exec(
    `cd ${process.cwd() + "\\" + pathScrcpy} && scrcpy.exe`,
    (err, stdout, stderr) => {
      if (err) throw err;
      console.log(stdout);
      console.log(stderr);
      menu();
    }
  );
}

function downloadScrcpy() {
  exec(
    `winget install scrcpy --location ${process.cwd()}`,
    (err, stdout, stderr) => {
      console.log(stdout);
      fs.readdir(`${process.cwd()}`, (err, files) => {
        if (err) throw err;
        const folderPattern = /^scrcpy-win64-v\d+\.\d+$/;

        files.forEach((file) => {
          if (folderPattern.test(file)) {
            cache.setItem("pathScrcpy", file);
            pathScrcpy = file;
            menu();
          }
        });
      });
    }
  );
}
