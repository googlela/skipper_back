import { INTERNAL_LINKS } from '../enum';
import { userRoutes } from '../routes';

const expressRoutes = (server) => {
    return new Promise((resolve, reject) => {
        // Routes
        server.use(INTERNAL_LINKS.USER.BASE_URL, userRoutes);
        resolve();
    });
};

export default expressRoutes;
