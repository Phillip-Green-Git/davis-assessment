import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  images: Yup.array()
    .min(1, "At least one image is required")
    .required("Images are required"),
});
