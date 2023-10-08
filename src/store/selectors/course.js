import { courseState } from "../atoms/course";
import { selector } from "recoil";

export const courseTitle = selector({
    key: "courseTitle",
    get: ({ get }) => {
        const state = get(courseState);
        if (state.course) { return state.course.title; }
        return "";
    }
});

export const coursePrice = selector({
    key: "coursePrice",
    get: ({ get }) => {
        const state = get(courseState);
        if (state.course) { return state.course.price; }
        return "";
    }
});

export const courseDescription = selector({
    key: "courseDescription",
    get: ({ get }) => {
        const state = get(courseState);
        if (state.course) { return state.course.description; }
        return "";
    }
});

export const courseImage = selector({
    key: "courseImage",
    get: ({ get }) => {
        const state = get(courseState);
        if (state.course) { return state.course.image; }
        return "";
    }
});

export const isCourseLoading = selector({
    key: "isCourseLoading",
    get: ({ get }) => {
        const state = get(courseState);
        return state.isLoading;
    }
})