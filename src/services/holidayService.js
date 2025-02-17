import { apiClient } from "../providers/apiClient";

export const getHolidaysList = async (fiscalYear) =>{
    try {
        return (await apiClient.get(`/holiday/get-all-holidays?fiscalYear=${fiscalYear}`)).data;
    } catch (error) {
        throw error.response?.data?.message || "An error occurred";
    }
}

export const createNewHoliday = async (formData) =>{
    try {
        return (await apiClient.post("/holiday/create-holiday", formData)).data;
    } catch (error) {
        throw error.response?.data?.message || "An error occurred";
    }
}

export const deleteHoliday = async (id) =>{
    try {
        return (await apiClient.post(`/holiday/delete-holiday?id=${id}`)).data;
    } catch (error) {
        throw error.response?.data?.message || "An error occurred";
    }
}

export const editHoliday = async (formData) =>{
    try {
        return (await apiClient.post("/holiday/update-holiday", formData)).data;
    } catch (error) {
        throw error.response?.data?.message || "An error occurred";
    }
}

export const getHolidayDetails = async (id) =>{
    try {
        return (await apiClient.get(`/holiday/get-holiday?id=${id}`)).data;
    } catch (error) {
        throw error.response?.data?.message || "An error occurred";
    }
}