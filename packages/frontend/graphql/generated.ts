import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AddTaskInput = {
  title: Scalars['String'];
  deadline: Scalars['DateTime'];
  userId: Scalars['ID'];
};

export type AddUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};


export type Mutation = {
  addUser: UserModel;
  removeUser?: Maybe<UserModel>;
  addTask: TaskModel;
  removeTask?: Maybe<TaskModel>;
};


export type MutationAddUserArgs = {
  user: AddUserInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID'];
};


export type MutationAddTaskArgs = {
  task: AddTaskInput;
};


export type MutationRemoveTaskArgs = {
  id: Scalars['ID'];
};

export type Query = {
  users: Array<UserModel>;
  user: UserModel;
  tasks: Array<TaskModel>;
  task: TaskModel;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryTaskArgs = {
  id: Scalars['ID'];
};

export type TaskModel = {
  id: Scalars['ID'];
  title: Scalars['String'];
  deadline: Scalars['DateTime'];
  assign: UserModel;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserModel = {
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  tasks: Array<TaskModel>;
};

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = { users: Array<Pick<UserModel, 'id' | 'firstName' | 'lastName'>> };


export const Document = gql`
    {
  users {
    id
    firstName
    lastName
  }
}
    `;

/**
 * __useQuery__
 *
 * To run a query within a React component, call `useQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuery(baseOptions?: Apollo.QueryHookOptions<Query, QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Query, QueryVariables>(Document, options);
      }
export function useLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Query, QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Query, QueryVariables>(Document, options);
        }
export type QueryHookResult = ReturnType<typeof useQuery>;
export type LazyQueryHookResult = ReturnType<typeof useLazyQuery>;
export type QueryResult = Apollo.QueryResult<Query, QueryVariables>;