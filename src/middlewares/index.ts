import { getUserBySessionToken } from "../db/users";
import express from "express";
import { get, merge } from "lodash";


export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, "identity._id") as string;
        if (!currentUserId) {
            return res.status(403).json({ message: "Not your account" });
        }
        if (currentUserId.toString() != id) {
            return res.status(403).json({ message: "Not your account" })
        }
        next()
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response) => {
    try {
        const sessionToken = req.cookies['USER-AUTH'];
        if (!sessionToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const exisistingUser = await getUserBySessionToken(sessionToken);
        if (!exisistingUser) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        return merge(req, { exisistingUser });
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

}

