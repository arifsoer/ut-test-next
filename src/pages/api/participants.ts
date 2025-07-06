// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  TCommonResponse,
  TParticipant,
  TParticipantList,
} from "@/types/data.type";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

const storedDatas: {
  participants: TParticipant[];
} = {
  participants: [
    {
      id: "E76C2AAF-0DAC-8E7C-AA92-BA7C96A25688",
      name: "Calista Rollins",
      gender: "Female",
      email: "ac.turpis@yahoo.couk",
      dateOfBirth: "2000-06-10",
    },
    {
      id: "175D8728-A25E-D3AD-CFE9-6168053509ED",
      name: "Aimee Carlson",
      gender: "Female",
      email: "eget.dictum@icloud.com",
      dateOfBirth: "2001-06-10",
    },
    {
      id: "B39DDD67-0569-2C94-3B76-50098D1BE2F2",
      name: "Thor Heath",
      gender: "Male",
      email: "felis.orci@hotmail.edu",
      dateOfBirth: "2001-05-10",
    },
    {
      id: "5F6ECAE8-AB85-D6A9-1BF2-A362919E9193",
      name: "Cathleen Sawyer",
      gender: "Female",
      email: "elementum.lorem@protonmail.couk",
      dateOfBirth: "2002-04-10",
    },
    {
      id: "A14DC6DD-14E5-AC36-85F8-BF9641969130",
      name: "Unity Norton",
      gender: "Female",
      email: "consequat.purus.maecenas@yahoo.org",
      dateOfBirth: "2003-06-10",
    },
  ],
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
