import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express"; 

interface OnfidoApplicant {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email?: string;
  gender?: string;
  dob?: string; 
  phone_number?: string;
  country?: string;
  postcode?: string;
  town?: string;
  address?: string;
  state?: string;
}

interface OnfidoSdkTokenResponse {
  token: string;
}

const token = "api_sandbox.gZPqyGbYex3.rpf7ZCYV0L5-FazDqjjYHIdKIONIx1tA"; //  Store this securely, not in code

export const createOnfidoSdkTokenEndpoint = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { applicantId, applicationId } = req.body;

    if (!applicantId) {
      return res.status(400).json({ error: "applicant_id is required" });
    }

    if (!applicationId) {
      return res.status(400).json({ error: "application_id is required" });
    }

    const params = new URLSearchParams();
    params.append("applicant_id", applicantId);
    params.append("application_id", applicationId);

    const response: AxiosResponse<OnfidoSdkTokenResponse> = await axios.post(
      "https://api.onfido.com/v3/sdk_token",
      params, // Use URLSearchParams
      {
        headers: {
          Authorization: `Token token=${token}`,
          "Content-Type": "application/x-www-form-urlencoded", //  Explicitly set the content type
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error(
      "Error creating Onfido SDK token:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: "Failed to create Onfido SDK token",
      details: error.response ? error.response.data : error.message,
    });
  }
};

export const createOnfidoApplicantEndpoint = async (
  req: Request,
  res: Response
):Promise<any> => {
  try {
    const {
      firstName,
      lastName,
      email,
      gender,
      dob,
      phoneNumber,
      country,
      postcode,
      town,
      address,
      state,
    } = req.body; // Get parameters from the request body

    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ error: "firstName and lastName are required" });
    }

    const response: AxiosResponse<OnfidoApplicant> = await axios.post(
      "https://api.onfido.com/v3/applicants",
      {
        first_name: firstName,
        last_name: lastName,
        email,
        gender,
        dob,
        phone_number: phoneNumber,
        country,
        postcode,
        town,
        address,
        state,
      },
      {
        headers: {
          Authorization: `Token token=${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.status(201).json(response.data); // Send 201 Created status
  } catch (error: any) {
    console.error(
      "Error creating Onfido applicant:",
      error.response ? error.response.data : error.message
    );
    //  Improved error handling.  Send the error response from Onfido, if available.
    res.status(500).json({
      error: "Failed to create Onfido applicant",
      details: error.response ? error.response.data : error.message,
    });
  }
};
