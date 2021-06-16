import { INTERNAL_LINKS } from '../enum';
import {userRoutes, grouupRoutes } from '../routes';

const expressRoutes = (server) => {
    return new Promise((resolve, reject) => {
        // Routes
        server.use(INTERNAL_LINKS.USER.BASE_URL, userRoutes);
        server.use(INTERNAL_LINKS.GROUP.BASE_URL,grouupRoutes);
        resolve();
    });
};

export default expressRoutes;
