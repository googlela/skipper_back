import { INTERNAL_LINKS } from '../enum';
import { securityRoutes } from '../routes';

const expressRoutes = (server) => {
    return new Promise((resolve, reject) => {
        // Routes
        server.use(INTERNAL_LINKS.SECURITY.BASE_URL, securityRoutes);
        resolve();
    });
};

export default expressRoutes;
