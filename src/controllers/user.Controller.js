import { Types } from "mongoose";
import { userModel, userGroupModel } from "../model";
const joinGroup = async (req, res) => {
  let message = "user saved successfully";
  try {
    const { body } = req;
    const { name } = body;
    const user = new userModel({ name });
    const userSave = await user.save();
    if (!userSave) {
      throw "user not save";
    }
    let saveuserGroup;
    if (userSave) {
      let data = await userGroupModel.findOne().sort({ createdAt: -1 });
      if (data) {
        if (data.user.length === 5) {
          console.log("true", true);
          let id = [];
          id.push(userSave._id);
          const userGroup = new userGroupModel({ user: id });
          saveuserGroup = await userGroup.save();
        } else {
          let userId = userSave._id;

          saveuserGroup = await userGroupModel.updateOne(
            { _id: data._id },
            {
              $push: { user: Types.ObjectId(userId) },
            }
          );
        }
        if (!saveuserGroup) {
          throw "userGroup not save";
        } else {
          console.log('saveuserGroup', saveuserGroup)
          const data = await userGroupModel
          .findById(saveuserGroup._id)
          .populate("user");
          console.log("data", data);
          res.status(200).send({
            success: true,
            message,
            data,
          });
        }
      }
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).send({
      success: true,
      message: error.message,
    });
  }
};

export default {
  joinGroup,
};
