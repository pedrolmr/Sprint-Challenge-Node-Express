const server = require('./data/api/server');

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
