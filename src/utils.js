import firebase from "firebase/app";

export const isDataReady = (data) =>
    !data.isLoading && typeof data.isLoading !== "object" && data.value;