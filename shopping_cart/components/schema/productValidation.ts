import * as Yup from 'yup';

const createYupSchema = <T extends object>(schema: Yup.ObjectSchema<T>): Yup.ObjectSchema<T> => schema;

export const productFormSchema = createYupSchema(
  Yup.object().shape({
    product_name: Yup.string().required('Product name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().min(0.01, 'Price must be more than 0'),
    product_image_url: Yup.string().url('Needs to be a valid url')
  })
);