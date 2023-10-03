import { Request, Response } from "express";
import * as IDalUser from "../dataaccess/userService";
import { mqClient } from "../events/mq/rpc";
import { PublishMessage } from "../events/publisher/basePublisher";

export const createUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, phone, dob } = req.body;
    const obj = await IDalUser.createUser({
        firstName,
        lastName,
        email,
        phone,
        dob,
    });

    if (obj) {
        const ch = mqClient.channel;

        PublishMessage(ch, process.env.EXCHANGE_NAME!, "USER_CREATED", {
            firstName,
            lastName,
            email,
            phone,
            dob,
        });
    }

    res.status(201).json({ data: obj, msg: "User created" });
};

export const getAllUser = async (req: Request, res: Response) => {
    const {} = req.body;
    const obj = await IDalUser.getUsers({});
    res.status(201).json({ data: obj, msg: "" });
};
