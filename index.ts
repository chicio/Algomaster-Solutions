import inquirer from "inquirer";
import { readdirSync, statSync } from "fs";
import { resolve, relative } from "path";
import {ExecException} from "child_process";

const scriptsDir = resolve(__dirname, "src");

function isDirectory(path: string): boolean {
    return statSync(path).isDirectory();
}

function getFolderContents(path: string): string[] {
    return readdirSync(path).map(item => resolve(path, item));
}

function navigateFolder(currentPath: string) {
    const contents = getFolderContents(currentPath);
    const choices = contents.map(item => {
        const relativePath = relative(currentPath, item);
        const displayName = isDirectory(item) ? `[Folder] ${relativePath}` : relativePath;
        return { name: displayName, value: item };
    });

    if (currentPath !== scriptsDir) {
        choices.unshift({ name: "[Go Back]", value: ".." });
    }

    inquirer
        .prompt([
            {
                type: "list",
                name: "selected",
                message: `Current folder: ${relative(scriptsDir, currentPath) || "."}`,
                choices
            }
        ])
        .then(answer => {
            const selectedPath = answer.selected;

            if (selectedPath === "..") {
                navigateFolder(resolve(currentPath, ".."));
            } else if (isDirectory(selectedPath)) {
                navigateFolder(selectedPath);
            } else {
                executeScript(selectedPath);
            }
        })
        .catch(error => {
            console.error("Error during navigation:", error);
        });
}

function executeScript(scriptPath: string) {
    console.log(`Executing script: ${relative(scriptsDir, scriptPath)}`);
    require("child_process").exec(`ts-node "${scriptPath}"`, (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Script error: ${stderr}`);
            return;
        }
        console.log(stdout);
    });
}

// Start navigation from the base directory
navigateFolder(scriptsDir);
