import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../middleware/validateJWTMiddleware";
import {
  createCV,
  getCVsByUser,
  getCVById,
  updateCV,
  deleteCV,
} from "../services/cvBuilderService";

// Create CV
export const saveCV = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customReq = req as CustomRequest;
    const { personalInfo, experience, education, skills } = customReq.body;
    const userId = customReq.user?.userId;
    const userRole = customReq.user?.role;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (userRole === "normal user") {
      const userCVs = await getCVsByUser(userId);
      if (!Array.isArray(userCVs)) {
        res.status(500).json({ message: "Failed to fetch user CVs." });
        return;
      }
      if (userCVs.length >= 2) {
        res
          .status(403)
          .json({ message: "Normal Users can only save up to 2 CVs." });
        return;
      }
    }
    const result = await createCV({
      userId,
      // title,
      personalInfo,
      experience,
      education,
      skills,
    });

    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

// Get CVs by User ID
export const getUserCVs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customReq = req as CustomRequest;
    const userId = customReq.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const result = await getCVsByUser(userId);
    // res.status(result.status).json(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Get CV by ID
export const getCV = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cvId } = req.params;
    const result = await getCVById(cvId);
    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

// Update CV
export const editCV = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cvId } = req.params;
    const cvData = req.body;
    const result = await updateCV(cvId, cvData);
    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

// Delete CV
export const removeCV = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cvId } = req.params;
    const result = await deleteCV(cvId);
    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};
