import { useFormik } from "formik";
import { basicSchema } from "../schemas";
import { useAddNewProductMutation } from "../features/api/productsApi";

const AddProduct = () => {
    const [addNewProduct, response] = useAddNewProductMutation();

    const onSubmit = (values, actions) => {
        addNewProduct({
            title: values.title,
            author: values.author,
            date: values.date,
            rating: values.rating,
        })
        console.log(response)
        actions.resetForm();
    }
    const {values, errors, handleBlur, isSubmitting, handleChange, handleSubmit, touched} = useFormik({
        initialValues:{
            title: "",
            author: "",
            date: "",
            rating: ""
        },
        validationSchema: basicSchema,
        onSubmit,
    })
    

    return ( 
        <div className="addProductArea">
           <form autoComplete="off" onSubmit={handleSubmit}>
                <label htmlFor="title"></label>
                <input
                    value={values.title}
                    onChange={handleChange}
                    id="title" 
                    type="text" 
                    placeholder="Title"
                    onBlur={handleBlur}
                    className={errors.title && touched.title ? "input-error" : ""}
                />
                {errors.title && touched.title && <p className="error">{errors.title}</p>}
                <label htmlFor="author"></label>
                <input
                    value={values.author}
                    onChange={handleChange}
                    id="author" 
                    type="text" 
                    placeholder="author"
                    onBlur={handleBlur}
                    className={errors.author && touched.author ? "input-error" : ""}
                />
                {errors.author && touched.author && <p className="error">{errors.author}</p>}
                <label htmlFor="date"></label>
                <input
                    value={values.date}
                    onChange={handleChange}
                    id="date" 
                    type="text" 
                    placeholder="date"
                    onBlur={handleBlur}
                    className={errors.date && touched.date ? "input-error" : ""}
                />
                {errors.date && touched.date && <p className="error">{errors.date}</p>}
                <label htmlFor="rating"></label>
                <input
                    value={values.rating}
                    onChange={handleChange}
                    id="rating" 
                    type="text" 
                    placeholder="rating"
                    onBlur={handleBlur}
                    className={errors.rating && touched.rating ? "input-error" : ""}
                />
                {errors.rating && touched.rating && <p className="error">{errors.rating}</p>}
                <button disabled={isSubmitting} type="submit" className="buttonSubmit">Submit</button>
           </form>
        </div>
    );
}
 
export default AddProduct;