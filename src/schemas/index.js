import * as yup from "yup";

export const basicSchema = yup.object().shape({
    title: yup.string().required("Required"),
    author: yup.string().required("Required"),
    date: yup.date().required("Required"),
    rating: yup.number().required("Required")
})