import { Types } from "mongoose";
import { userModel, userGroupModel } from "../model";

const GetGroup = async (req, res) => {
  let message = "Group details fetch successfully";
  try {
    const { params } = req;
    const { id } = params;
    if (Types.ObjectId(id)) {
      const data = await userGroupModel.findById(Types.ObjectId(id));
      const userList = await userModel.find({
        _id: { $in: data.user },
      });
      res.status(200).send({
        success: true,
        message,
        data,
        userList,
      });
    } else {
      throw "group id is not valid";
    }
  } catch (error) {
    res.status(400).send({
      success: true,
      message: error.message,
    });
  }
};

export default {
  GetGroup,
};
