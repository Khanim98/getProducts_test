import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    deleteProduct: builder.mutation({
        query: (id) => ({
          url: `/products/${id}`,
          method: 'DELETE',
        }),
        transformResponse: (response) => {
            return response;
          },
      }),
      addNewProduct: builder.mutation({
        query: (payload) => ({
          url: '/products/add',
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }),
      }),
  }),
})
export const { useGetProductsQuery, useDeleteProductMutation, useAddNewProductMutation } = productsApi