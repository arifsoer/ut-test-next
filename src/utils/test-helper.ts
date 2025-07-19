import { TParticipant } from "@/types/data.type";

export const sampleData: TParticipant[] = [
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
];

export const generateResponse = <T = undefined>(
  data: T,
  status: "success" | "failed"
) => {
  return {
    data: data,
    success: status === "success",
    status: status === "success" ? 200 : 400,
    message: "Participants fetched successfully",
  };
};
