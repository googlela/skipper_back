import express from 'express';

import expressInit from './src/lib/expressInit';
import expressRoutes from './src/lib/expressRoutes';

const server = express();

(async () => {
    // Initialize Express Server Functionality
    await expressInit(server);

    // Initialize Express Routes
    await expressRoutes(server);
})();

import { INTERNAL_LINKS } from './src/enum';

server.get(INTERNAL_LINKS.BASE_API_URL, (req, res) => {
    res.json({ success: true, message: 'node API' });
});
