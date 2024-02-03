const readline = require('readline');
const { spawn } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const executeCommand = (command) => {
  const [cmd, ...args] = command.split(' ');
  const childProcess = spawn(cmd, args, { shell: true });

  childProcess.stdout.on('data', (data) => console.log(`Command output:\n${data}`));
  childProcess.stderr.on('data', (data) => console.error(`Command error:\n${data}`));
  childProcess.on('close', (code) => {
    console.log(`Command exited with code ${code}`);
    rl.close();
  });
};

const commandToExecute = process.argv.slice(2).join(' ');

if (commandToExecute) {
  executeCommand(commandToExecute);
} else {
  rl.question('Enter the command to execute: ', executeCommand);
}
