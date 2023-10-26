import React from "react";
import axios from "axios";

export const RegisterApi = async (data) => {
  console.log(data);
  let request = await axios.post(
    `http://localhost:7000/api/v1/auth/register`,
    data,
    {
      headers: {
        "x-access-token": getAuthToken(),
      },
    }
  );
  return request;
};
