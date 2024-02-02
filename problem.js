const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function writeToFile(filePath, content) {
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`Error writing to file ${filePath}: ${err}`);
            rl.close(); // Close the readline interface in case of an error
        } else {
            // File exists, proceed with writing content
            fs.writeFile(filePath, content, (writeErr) => {
                if (writeErr) {
                    console.error(`Error writing to file ${filePath}: ${writeErr}`);
                } else {
                    console.log(`Content successfully written to ${filePath}`);

                    // Read the contents of the file and log them
                    fs.readFile(filePath, 'utf8', (readErr, fileContent) => {
                        if (readErr) {
                            console.error(`Error reading file ${filePath}: ${readErr}`);
                        } else {
                            console.log(`Content of ${filePath}: ${fileContent}`);
                        }
                        rl.close(); // Close the readline interface after reading the file
                    });
                }
            });
        }
    });
}

// Ask the user for the file path
rl.question('Enter the file path: ', (filePath) => {
    // Ask the user for the content to write to the file
    rl.question('Enter the content to write to the file: ', (content) => {
        writeToFile(filePath, content);
    });
});

// Ensure the script doesn't exit immediately
process.on('exit', () => {
    console.log('Exiting.');
});
