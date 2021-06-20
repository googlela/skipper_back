import { set, connect, connection, isValidObjectId } from "mongoose";
require("dotenv").config({ path: "src/config/.env" });
import { redBright, greenBright, yellowBright } from "chalk";
import { userGroupModel, userModel } from "../model";

// Database Name & URL
const DATABASE_NAME = process.env.DATABASE_NAME;
export const CONNECTION_URL = process.env.CONNECTION_URL;

const connectMongoDB = async (socket) => {
  try {
    set("useCreateIndex", true);

    //for making use of findOneAndUpdate else it will not work
    set("useFindAndModify", false);

    //Connection establishment
    connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    const db = connection;

    // Event Listener
    db.on("disconnected", (err) => {
      console.error(redBright(`MongoDB-> disconnected: ${DATABASE_NAME}`));
      connectMongoDB();
    });

    db.on("reconnected", (err) => {
      console.info(yellowBright(`MongoDB-> reconnected: ${DATABASE_NAME}`));
    });

    db.on("error", (error) => {
      console.error(redBright("Error occured in db connection", error));
    });

    db.on("open", () => {
      console.info(
        greenBright(
          `DB Connection with ${DATABASE_NAME} established successfully.`
        )
      );
    });

    const personEventEmitter = userGroupModel.watch();

    personEventEmitter.on("change", async (change) => {
      if (change.operationType === "update") {
        let id = change.documentKey;
        const group = await userGroupModel.findById(id);
        let userId = group.user[group.user.length - 1];

        const user = await userModel.findById(userId);
		console.log('user', user)
		console.log('socket 1', socket )
		socket.on("connection", function (socket1) {
			console.log('true true', true ,true)
		});
      }
    });
  } catch (error) {
    console.error(redBright("Error occured in db connection", error));
    process.exit(-1);
  }
};

connectMongoDB();

export default connectMongoDB;
