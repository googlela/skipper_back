import express from 'express';

import { INTERNAL_LINKS } from '../enum';
import { userController } from '../controllers';

export default express
    .Router()
    .post(
        INTERNAL_LINKS.USER.GROUP_JOIN,
        userController.joinGroup
    )