const fs = require('fs');
const path = require('path');

const getAllFiles = (dir, ext, files) => {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      // Ignore node_modules directory
      if (file !== 'node_modules') {
        getAllFiles(fullPath, ext, files);
      }
    } else if (ext.includes(path.extname(fullPath))) {
      files.push(fullPath);
    }
  });
};

const countLines = (file) => {
  return fs.readFileSync(file, 'utf8').split('\n').length;
};

const main = () => {
  const files = [];
  getAllFiles('.', ['.js', '.jsx', '.ts', '.tsx'], files);

  let totalLines = 0;
  files.forEach(file => {
    totalLines += countLines(file);
  });

  console.log(`Total lines of code: ${totalLines}`);
};

main();
