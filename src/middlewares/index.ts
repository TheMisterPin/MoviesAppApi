
import express from "express";
import { get } from "lodash";


export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, "identity._id") as string;
        if (!currentUserId) {
            return res.status(403).json({ message: "User identity could not be verified." });
        }
        if (currentUserId.toString() !== id) {
            return res.status(403).json({ message: "You do not have permission to access this resource." });
        }
        next();
    } catch (error) {
        console.error("isOwner error:", error); 
        return res.status(500).json({ message: "Internal server error while verifying owner." });
    }
};

