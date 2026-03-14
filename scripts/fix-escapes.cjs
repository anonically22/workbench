const fs = require('fs');
const path = require('path');

const dirs = [
    'src/tools/ui-components',
    'src/tools/layout-spacing',
    'src/tools/dev-utilities',
    'src/tools/content-writing'
];

let fixedFiles = 0;

dirs.forEach(dir => {
    const fullDir = path.join(__dirname, dir);
    if (!fs.existsSync(fullDir)) return;
    
    const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.jsx'));
    files.forEach(file => {
        const fullPath = path.join(fullDir, file);
        let original = fs.readFileSync(fullPath, 'utf8');
        let content = original;
        
        // Replace \` with `
        content = content.replace(/\\\`/g, '`');
        
        // Replace \${ with ${
        content = content.replace(/\\\$\{/g, '${');
        
        // Replace \\n with \n
        content = content.replace(/\\\\n/g, '\\n');

        if (content !== original) {
            fs.writeFileSync(fullPath, content);
            console.log("Fixed " + file);
            fixedFiles++;
        }
    });
});

console.log(`Finished fixing ${fixedFiles} files.`);
