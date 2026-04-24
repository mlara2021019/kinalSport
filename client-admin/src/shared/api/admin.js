import { axiosAdmin } from "./api";

export const getFields = async () => {
    return axiosAdmin.get("/fields")
}