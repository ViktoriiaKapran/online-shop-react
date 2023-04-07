import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'; //npm install


export const BASE_URL = "http://shop-roles.node.ed.asmer.org.ua";

const prepareHeaders = (headers, { getState }) => {
  // By default, if we have a token in the store, let's use that for authenticated requests
  const token = getState().auth?.token || null;
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
}


export const imageApi = createApi({
  reducerPath: 'imageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (payload) => ({
        url: '/upload',
        method: 'POST',
        body: payload
      }),
    }),
  }),
});


export const api = createApi({
  reducerPath: 'api',
  baseQuery: graphqlRequestBaseQuery({
    url: BASE_URL + '/graphql',
    prepareHeaders
  }),
  tagTypes: ['Category', 'Order', 'Good', 'User'],
  endpoints: (builder) => ({
    getRootCategories: builder.query({
      query: () => ({
        document: gql`
                  query GetCategories{
                      CategoryFind(query: "[{\\"parent\\": null}]") {
                        _id name goods {
                          _id name price images {
                            url
                          }
                        }, subCategories {
                          name
                        }
                      }
                    }
                  `}),
      providesTags: ['Category'],
    }),
    getAllCategories: builder.query({
      query: (searchCategory = '') => ({
        document: gql`
                  query GetCategories($q: String){
                      CategoryFind(query: $q) {
                        _id name goods {
                          _id name price images {
                            url
                          }
                        }, subCategories {
                          name
                        }, parent {
                          name
                        }
                      }
                    }
                  `,
        variables: { q: JSON.stringify([{name: {$regex: searchCategory, $options : 'i'}}]) }
      }),
      providesTags: ['Category'],
    }),
    getCategoryCount: builder.query({
      query: () => ({
        document: gql`
                  query getCategoryCount($q: String) {
                    CategoryCount(query: $q)
                  }`,
        variables: { q: JSON.stringify([{}]) }
      }),
      providesTags: ['Category'],
    }),
    getCategoryById: builder.query({
      query: (_id) => ({
        document: gql`
                  query GetCategory($q: String) {
                      CategoryFindOne(query: $q) {
                        _id
                        name,
                        goods{
                          name,
                          _id,
                          images{
                            _id,
                            url
                          },
                          price
                        },
                        parent {
                          _id,
                          name
                        },
                        subCategories{
                          name,
                          _id
                          subCategories{
                            name,
                            _id
                          }
                        }
                      }
                  }
                  `,
        variables: { q: JSON.stringify([{ _id }]) }
      }),
      providesTags: ['Category'],
    }),
    getGoodById: builder.query({
      query: (_id) => ({
        document: gql`
                  query GetGood($q: String) {
                    GoodFindOne(query: $q) {
                      _id,
                      name,
                      categories{
                        _id,
                        name
                      },
                      description,
                      price,
                      images{
                        _id,
                        url
                      }
                    }
                   }
                  `,
        variables: { q: JSON.stringify([{ _id }]) }
      }),
      providesTags: ['Good'],
    }),
    getUserById: builder.query({
      query: (_id) => ({
        document: gql`
                    query GetUser($q: String) {
                        UserFindOne(query: $q) {
                            _id
                            login
                            nick
                            avatar { url }
                            acl
                        }
                    }
                `,
        variables: { q: JSON.stringify([{ _id }]) }
      }),
      providesTags: ['User']
    }),
    updateUser: builder.mutation({
      query: ({ _id, nick, avatar, password }) => ({
        document: gql`
              mutation updateUser($_id: String, $nick: String, $avatar: ImageInput, $password: String) {
                  UserUpsert(user: {_id: $_id, nick: $nick, avatar: $avatar, password: $password}) {
                      _id, nick
                  }
              }
          `,
        variables: { _id, nick, avatar, password }
      }),
      invalidatesTags: ['User']
    }),
    getOrders: builder.query({
      query: ({ limit, skip, sort}) => ({
        document: gql`
                    query orders($q: String) {
                      OrderFind(query: $q) {
                        _id, total, createdAt, owner{
                          _id, login
                        }, orderGoods{
                          price, count, good{
                            name, _id, images {
                              url
                            }
                          }
                        }
                      }
                    }
                    `,
        variables: { q: JSON.stringify([{}, { limit: [limit], skip: [skip], sort: [sort] }]) }
      }),
      providesTags: ['Order'],
    }),
    getOrderCount: builder.query({
      query: () => ({
        document: gql`
                    query getOrderCount($q: String) {
                      OrderCount(query: $q)
                    }`,
        variables: { q: JSON.stringify([{}]) }
      })
    }),
    getOrderGood: builder.query({
      query: () => ({
        document: gql`
                    query orders($q: String) {
                      OrderGoodFind(query: $q) {
                        _id, createdAt, price, total, count, goodName, good {
                          _id, name
                        }, order {
                          _id, total, orderGoods {
                            count, good {
                              name
                            }
                          }
                        }, owner {
                          _id login
                        }
                      }
                    }
                    `,
        variables: { q: JSON.stringify([{}]) }
      }),
      providesTags: ['Order'],
    }),
    getGoods: builder.query({
      query: ({ searchStr = '', skip = 0, limit = 0 }) => ({
        document: gql`
                    query GetGoods($q: String) {
                      GoodFind(query: $q) {
                        _id, name, description, price, categories {
                          _id, name
                        }, images {
                          url
                        }
                      }
                    }`,
        variables: { q: JSON.stringify([{name: {$regex: searchStr, $options : 'i'}}, { skip: [skip], limit: [limit] }]) }
      }),
      providesTags: ['Good'],
    }),
    getGoodCount: builder.query({
      query: () => ({
        document: gql`
                    query GetGoodCount($q: String) {
                      GoodCount(query: $q)
                    }`,
        variables: { q: JSON.stringify([{}]) }
      }),
      providesTags: ['Good'],
    }),
    getUserCount: builder.query({
      query: () => ({
        document: gql`
                    query GetUserCount($q: String) {
                      UserCount(query: $q)
                    }`,
        variables: { q: JSON.stringify([{}]) }
      })
    }),
    getUsers: builder.query({
      query: ({ skip, limit, sort }) => ({
        document: gql`
                    query GetUsers($q: String) {
                      UserFind(query: $q) {
                        _id, login, createdAt
                      }
                    }`,
        variables: { q: JSON.stringify([{}, { skip: [skip], limit: [limit], sort: [sort] }]) }
      }),
      providesTags: ['User'],
    }),
    login: builder.mutation({
      query: ({ login, password }) => ({
        document: gql`
                    query login($login: String, $password: String) {
                        login(login: $login, password: $password) 
                    }
                    `,
        variables: { login, password }
      })
    }),
    register: builder.mutation({
      query: ({ login, password }) => ({
        document: gql`
                    mutation registration($login:String, $password: String) {
                        UserUpsert(user: {login:$login, password: $password}){
                            _id login createdAt
                          }
                    }`,
        variables: { login, password }
      }),
      invalidatesTags: ['User'],
    }),
    createOrder: builder.mutation({
      query: (orderGoods) => ({
        document: gql`
                  mutation ordering($orderGoods: OrderInput) {
                    OrderUpsert(order: $orderGoods) {
                      _id, total, orderGoods {
                        good {
                          name, _id
                        }
                      }
                    }
                  }`,
        variables: { orderGoods: { orderGoods } }
      }),
      invalidatesTags: ['Order'],
    }),
    createCategory: builder.mutation({
      query: (category) => ({
        document: gql`
                    mutation createCategory($category: CategoryInput) {
                      CategoryUpsert(category: $category) {
                        _id
                      }
                    }`,
        variables: { category }
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation({
      query: (category) => ({
        document: gql`
                    mutation deleteCategory($category: CategoryInput) {
                      CategoryDelete(category: $category) {
                        _id, name
                      }
                    }`,
        variables: { category }
      }),
      invalidatesTags: ['Category'],
    }),
    createGood: builder.mutation({
      query: (good) => ({
        document: gql`
                    mutation createGood($good: GoodInput) {
                      GoodUpsert(good: $good) {
                        _id
                      }
                    }`,
        variables: { good }
      }),
      invalidatesTags: ['Good']
    }),
    deleteGood: builder.mutation({
      query: (good) => ({
        document: gql`
                    mutation deleteGood($good: GoodInput) {
                      GoodDelete(good: $good) {
                        _id, name, images {
                          url, _id
                        }, price, description
                      }
                    }`,
        variables: { good }
      }),
      invalidatesTags: ['Good']
    }),
  }),
});

export const { useGetRootCategoriesQuery, useGetCategoryByIdQuery, useGetGoodByIdQuery, useLoginMutation, useGetOrdersByOwnerIdQuery,
  useRegisterMutation, useGetUserByIdQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useGetGoodsQuery, useGetUsersQuery,
  useGetOrderGoodQuery, useGetUserCountQuery, useGetOrderCountQuery, useGetGoodCountQuery, useGetCategoryCountQuery, useGetOrdersQuery,
  useCreateGoodMutation, useDeleteGoodMutation, useCreateOrderMutation, useGetAllCategoriesQuery, useUpdateUserMutation } = api;

export const { useUploadImageMutation } = imageApi;
