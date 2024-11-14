import base_url from "./base_url";
import axios from "axios";
import commomApi from "./commonApi";

export const registerApi = async (data) => {
    return await commomApi(`${base_url}/reg`, "POST", "", data)
}

export const loginApi = async (data) => {
    return await commomApi(`${base_url}/log`, "POST", "", data)
}

export const addProjectApi = async (data, header) => {
    return await commomApi(`${base_url}/addproject`, "POST", header, data)
}

export const getProjectApi = async (header) => {
    return await commomApi(`${base_url}/getlist`, "GET", header, "")
}

export const updateProjectApi = async (id, header, data) => {
    return await commomApi(`${base_url}/updatepro/${id}`, "PUT", header, data)
}

export const deleteProjectApi = async (id, header) => {
    return await commomApi(`${base_url}/deletepro/${id}`, "DELETE", header, {})
}

export const updateProfileApi = async (header, data) => {
    return await commomApi(`${base_url}/updateprofile`, "PUT", header, data)
}

export const getAllProjectsApi = async () => {
    return await commomApi(`${base_url}/allprojects`, "GET", "", "")
}

export const searchProjectsApi = async (keyword) => {
    return await commomApi(`${base_url}/search?search=${keyword}`, "GET", "", "")
}