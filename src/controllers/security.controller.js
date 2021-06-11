import { Role } from '../enum'

const getPage = async (req, res) => {
    const { params } = req;
    const { _pageId } = params
    if (+_pageId === 1) {
        const data = Role.ADMIN
        res.status(200).send({
            status: 200,
            message: "success",
            data
        })
    }
    else if (+_pageId === 2) {
        const data = Role.USER
        res.status(200).send({
            status: 200,
            message: "success",
            data
        })
    }
    else {
        res.status(400).send({
            status: 400,
            message: "You are not allowed to this action.",
            data: []
        })
    }
}

export default {
    getPage
}
