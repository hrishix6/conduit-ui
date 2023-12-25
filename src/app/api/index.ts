import { getClient, handleAxiosError } from "@/lib/http.client";
import { ApiResult, UserInfo } from "..";

export async function getUserInfo()
{
    try {
        const client = getClient();

        const response = await client.get("/user");

        return response.data as ApiResult<UserInfo>;

    } catch (error) {
        throw handleAxiosError(error);
    }
}