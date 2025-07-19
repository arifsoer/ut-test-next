// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  TCommonResponse,
  TParticipant,
  TParticipantList,
} from "@/types/data.type";
import { sampleData } from "@/utils/test-helper";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

const storedDatas: {
  participants: TParticipant[];
} = {
  participants: sampleData,
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TCommonResponse<TParticipantList>>
) {
  const { participants } = storedDatas;
  if (req.method === "GET") {
    res.status(200).json({
      data: participants,
      success: true,
      status: 200,
      message: "Participants fetched successfully",
    });
  } else if (req.method === "POST") {
    const bodyPayload: Omit<TParticipant, "id"> = req.body;
    participants.push({ ...bodyPayload, id: uuidv4() });
    res.status(201).json({
      success: true,
      status: 201,
      message: "Participant added successfully",
    });
  } else if (req.method === "PATCH") {
    const bodyPayload: TParticipant = req.body;
    const idData = participants.findIndex((x) => x.id === bodyPayload.id);
    if (idData > -1) {
      participants[idData] = bodyPayload;

      res.status(200).json({
        success: true,
        status: 200,
        message: "Participant update successfully",
      });
    } else {
      res.status(400).json({
        success: true,
        status: 400,
        message: "Participant update failed, data not found",
      });
    }
  } else if (req.method === "DELETE") {
    const bodyPayload: TParticipant = req.body;
    const idData = participants.findIndex((x) => x.id === bodyPayload.id);
    if (idData > -1) {
      participants.splice(idData, 1);
      res.status(204).json({
        success: true,
        status: 204,
        message: "Participant delete successfully",
      });
    } else {
      res.status(400).json({
        success: true,
        status: 400,
        message: "Participant update failed, data not found",
      });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
