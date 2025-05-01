const { exec } = require('child_process');

const childProcess = exec('tail -f ./log.js');

childProcess.stdout.on('data', (msg) => {
  console.log(msg);
});
