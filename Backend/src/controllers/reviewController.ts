import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export const getRecords = async (req: Request, res: Response) => {
  const reviewerId = req.user?.id;

  try {
    const data = await prisma.review.findMany({
      where: {
        reviewerId: Number(reviewerId),
      },
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await prisma.review.findUnique({
      where: { id: Number(id) },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
};

export const getRecordsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const data = await prisma.review.findMany({
      where: {
        reviewedUserId: Number(userId),
      },
      select: {
        reviewerId: true,
        numStars: true,
        comment: true,
        createdAt: true,
        id: true,
        reviewer: {
          select: {
            firstname: true,
            lastname: true,
            imageUrl: true,
          },
        },
      },
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  const reviewerId = req.user?.id;

  const { reviewedUserId, comment, numStars } = req.body;

  // Validate required fields; allow 0 stars but disallow undefined/null
  if (
    reviewerId == null ||
    reviewedUserId == null ||
    comment == null ||
    numStars == null
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const parsedNumStars = Number(numStars);
  if (!Number.isFinite(parsedNumStars) || parsedNumStars < 0 || parsedNumStars > 5) {
    return res.status(400).json({ error: "numStars must be a number between 0 and 5" });
  }

  try {
    const data = await prisma.review.create({
      data: {
        reviewerId: Number(reviewerId),
        reviewedUserId: Number(reviewedUserId),
        comment,
        numStars: parsedNumStars,
      },
    });
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create review" });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { numStars, comment, reviewedUserId } = req.body;

  try {
    const dataToUpdate: any = {
      numStars: Number(numStars),
      comment,
      reviewedUserId: Number(reviewedUserId),
    };

    const data = await prisma.review.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update review" });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.review.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete review" });
  }
};
