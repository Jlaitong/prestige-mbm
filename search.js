const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git') && !file.includes('.next') && !file.includes('dist')) {
      results = results.concat(walk(file));
    } else {
      if (file.toLowerCase().includes('model')) {
        results.push(file);
      }
    }
  });
  return results;
}

console.log(walk('c:\\Users\\juanc\\Desktop\\PRESTIGE MBM'));
