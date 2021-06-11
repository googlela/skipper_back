import express from 'express';

import { INTERNAL_LINKS } from '../enum';
import { getPageController } from '../controllers';

export default express
    .Router()
    .get(
        INTERNAL_LINKS.USER.GROUP_JOIN,
        getPageController.getPage
    )