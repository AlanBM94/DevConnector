import axios from "axios";
import { setAlert } from "./alert";
import {
    GET_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
} from "./types";

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/profile/me");
        dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

export const getProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await axios.get("/api/profile");

        dispatch({ type: GET_PROFILES, payload: res.data });
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

export const getProfileById = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

export const getGitHubRepos = (username) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({ type: GET_REPOS, payload: res.data });
    } catch (error) {
        const errorMessage = error.response.data.message;
        if (errorMessage !== "No github profile found") {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status,
                },
            });
        }
    }
};

export const createProfile = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.post("/api/profile", formData, config);

        dispatch({ type: GET_PROFILE, payload: res.data });

        // dispatch(setAlert(edit ? "Profile updated" : "Profile created", "success"));
        dispatch(
            setAlert(edit ? "Perfil Actualizado" : "Perfil Creado", "success")
        );

        if (!edit) {
            history.push("/dashboard");
        }
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.map((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

export const addExperience = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.put(
            "/api/profile/experience",
            formData,
            config
        );

        dispatch({ type: UPDATE_PROFILE, payload: res.data });

        // dispatch(setAlert("Experience Added", "success"));
        dispatch(setAlert("Experiencia Agregada", "success"));

        history.push("/dashboard");
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.map((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

export const addEducation = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.put("/api/profile/education", formData, config);

        dispatch({ type: UPDATE_PROFILE, payload: res.data });

        // dispatch(setAlert("Education Added", "success"));
        dispatch(setAlert("Grado Escolar Agregado", "success"));

        history.push("/dashboard");
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.map((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

export const deleteExperience = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({ type: UPDATE_PROFILE, payload: res.data });
        // dispatch(setAlert("Experience Removed", "success"));
        dispatch(setAlert("Experiencia Eliminada", "success"));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

export const deleteEducation = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({ type: UPDATE_PROFILE, payload: res.data });
        // dispatch(setAlert("Education Removed", "success"));
        dispatch(setAlert("Grado Escolar Eliminado", "success"));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

export const deleteAccount = () => async (dispatch) => {
    // if (window.confirm("Are you sure? This can not be undone!")) {
    if (window.confirm("¿Estas seguro? Esta acción no se puede revertir")) {
        try {
            await axios.delete(`/api/profile`);

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });

            // dispatch(setAlert("Your account has been permanantly deleted"));
            dispatch(setAlert("Tu cuenta ha sido permanentemente eliminada"));
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status,
                },
            });
        }
    }
};
