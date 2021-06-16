import express from 'express';

import { INTERNAL_LINKS } from '../enum';
import { groupController } from '../controllers';

export default express
    .Router()
    .get(
        INTERNAL_LINKS.GROUP.GET,
        groupController.GetGroup
    )