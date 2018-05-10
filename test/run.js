const globMap = require('../');

globMap('./test/files/*.md', file=>{
    console.log('file ',file);
});
