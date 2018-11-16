const readline = require('readline');
const chalk = require('chalk');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Connecting to the IPC server... wait');
console.log('Connection stablished, type help for a list of available comands, or .exit to get out');

const devices = ['124124', '5235235', '346346'];

const parseLine = (line) => {
  //check for .exit command
  if (line === '.exit') {
    console.log('thanks, bye');
    rl.close();
    return true;
  }

  if (line === 'help') {

    return chalk.red(`Available commands:
               help -> show this
               .exit -> get out of here
               device list -> lists all devices registered
               describe #deviceId -> describes a device
               etc
                `);
  }

  return false;

}
// readline.emitKeypressEvents(process.stdin);
// process.stdin.setRawMode(true);
rl.setPrompt(chalk.green('Device Manager >'));
rl.prompt();
rl.on('line',(line) => {
  const result = parseLine(line);
  if (result !== false) {
    console.log(result);
  } else {
    console.log('command was not recognized')
  }
  rl.prompt();
})
//
// process.stdin.on('keypress', (str, key) => {
//   if (key.ctrl && key.name === 'c') {
//     process.exit();
//   } else {
//     console.log(`You pressed the "${str}" key`);
//     console.log();
//     console.log(key);
//     console.log();
//   }
// });
