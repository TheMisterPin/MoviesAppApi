import { MovieModel } from "db/movies";
import { getUserBySessionToken } from "../db/users";
import express from "express";
import { get } from "lodash";
import { Request, Response, NextFunction } from 'express';
import mongoose from "mongoose";

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

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['USER-AUTH'];
        if (!sessionToken) {
            return res.status(401).json({ message: "No authentication token provided." });
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser) {
            return res.status(401).json({ message: "Invalid session token or user does not exist." });
        }
        
        next();
    } catch (error) {
        console.error("isAuthenticated error:", error);
        return res.status(500).json({ message: "Internal server error while authenticating." });
    }
};
export const isCreator = (model: mongoose.Model<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const resource = await model.findById(id);
        if (!resource) {
          return res.status(404).json({ message: "Resoure not found" });
        }
        const currentUserId = get(req, "identity._id") as string;
        if (resource.creator.toString() !== currentUserId.toString()) {
          return res.status(403).json({ message: "You do not have permission to modify this resource" });
        }
        next();
      } catch (error) {
        console.error("isCreator error:", error);
        return res.status(500).json({ message: "Internal server error while verifying creator." });
      }
    };
  };
