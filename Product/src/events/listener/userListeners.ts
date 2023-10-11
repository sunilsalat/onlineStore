import { User } from "../../models/User";
import { mqClient } from "../mq/rpc";
import { baseListener } from "./baseListener";

export const userListeners = async () => {
    await baseListener(
        mqClient.channel,
        "USER_CREATED",
        async (channel, msg) => {
            const payload = JSON.parse(msg.content.toString());
            if (payload) {
                const userObj = await User.create(payload);
                if (userObj) {
                    console.log(`${msg} acknowlodged`);
                    channel.ack(msg);
                }
            }
        }
    );
};
