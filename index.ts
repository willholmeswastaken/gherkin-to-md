import fs from "fs";
import path from "path";

function getAllFilePaths(dir: string, fileList: string[] = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFilePaths(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }

  return fileList;
}

function getSteps(file: string) {
  const regex = new RegExp(`\\b(Given|When|Then)\\((['"\`])(.*?)\\2`, "gi");

  return file.split("\n").reduce(
    (acc, curr) => {
      const match = regex.exec(curr);
      if (!match) return acc;

      const content = match[3];

      if (!content) return acc;
      const verb = match[1].toLowerCase();

      acc[verb].push(`**${verb[0].toUpperCase()}${verb.slice(1)}** ${content}`);
      return acc;
    },
    { given: [], when: [], then: [] }
  );
}

async function createMarkdownFromFile(filePath: string) {
  const file = fs.readFileSync(filePath, "utf8");
  const filename = path.basename(filePath);
  const results = getSteps(file);
  return `
  ## ${filename}
  
  ### Given
  ${results.given.join("\n\n")}
  
  ### When
  ${results.when.join("\n\n")}
  
  ### Then
  ${results.then.join("\n\n")}
  `;
}

async function createMarkdown(folderPath: string) {
  const res = await Promise.all(
    getAllFilePaths(folderPath).map((file) => createMarkdownFromFile(file))
  );

  return `
  # Gherkin steps
  
  ${res.join("\n\n")}`;
}

createMarkdown("steps").then((res) => console.log(res));
