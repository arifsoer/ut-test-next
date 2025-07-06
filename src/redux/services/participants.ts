import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  TCommonResponse,
  TParticipantList,
  TParticipant,
} from "@/types/data.type";

export const participantsApi = createApi({
  reducerPath: "participantsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Participants"],
  endpoints: (builder) => ({
    getParticipants: builder.query<TCommonResponse<TParticipantList>, void>({
      query: () => "participants",
      providesTags: ["Participants"],
    }),
    addParticipant: builder.mutation<
      TCommonResponse<TParticipantList>,
      Omit<TParticipant, "id">
    >({
      query: (newParticipant) => ({
        url: "participants",
        method: "POST",
        body: newParticipant,
      }),
      invalidatesTags: ["Participants"],
    }),
    updateParticipant: builder.mutation<
      TCommonResponse<undefined>,
      TParticipant
    >({
      query: (newParticipant) => ({
        url: "participants",
        method: "PATCH",
        body: newParticipant,
      }),
      invalidatesTags: ["Participants"],
    }),
    deleteParticipant: builder.mutation<
      TCommonResponse<undefined>,
      Pick<TParticipant, "id">
    >({
      query: (deletedParticipant) => ({
        url: "participants",
        method: "DELETE",
        body: deletedParticipant,
      }),
      invalidatesTags: ["Participants"],
    }),
  }),
});

export const {
  useGetParticipantsQuery,
  useAddParticipantMutation,
  useUpdateParticipantMutation,
  useDeleteParticipantMutation,
} = participantsApi;
