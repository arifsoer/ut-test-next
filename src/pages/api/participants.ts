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
      phoneNumber: "(519) 936-4428",
      email: "ac.turpis@yahoo.couk",
      city: "Istanbul",
    },
    {
      id: "175D8728-A25E-D3AD-CFE9-6168053509ED",
      name: "Aimee Carlson",
      gender: "Female",
      phoneNumber: "1-527-553-3971",
      email: "eget.dictum@icloud.com",
      city: "Katsina",
    },
    {
      id: "B39DDD67-0569-2C94-3B76-50098D1BE2F2",
      name: "Thor Heath",
      gender: "Male",
      phoneNumber: "(258) 766-0840",
      email: "felis.orci@hotmail.edu",
      city: "Forchtenstein",
    },
    {
      id: "5F6ECAE8-AB85-D6A9-1BF2-A362919E9193",
      name: "Cathleen Sawyer",
      gender: "Female",
      phoneNumber: "1-283-472-7114",
      email: "elementum.lorem@protonmail.couk",
      city: "Patos",
    },
    {
      id: "A14DC6DD-14E5-AC36-85F8-BF9641969130",
      name: "Unity Norton",
      gender: "Female",
      phoneNumber: "(278) 794-4492",
      email: "consequat.purus.maecenas@yahoo.org",
      city: "Bengkulu",
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
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
