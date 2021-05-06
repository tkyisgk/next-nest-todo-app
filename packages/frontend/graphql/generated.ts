import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
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
  title: Scalars["String"];
  deadline: Scalars["DateTime"];
  userId: Scalars["ID"];
};

export type AddUserInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
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
  id: Scalars["ID"];
};

export type MutationAddTaskArgs = {
  task: AddTaskInput;
};

export type MutationRemoveTaskArgs = {
  id: Scalars["ID"];
};

export type Query = {
  users: Array<UserModel>;
  user: UserModel;
  tasks: Array<TaskModel>;
  task: TaskModel;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QueryTaskArgs = {
  id: Scalars["ID"];
};

export type TaskModel = {
  id: Scalars["ID"];
  title: Scalars["String"];
  deadline: Scalars["DateTime"];
  assign: UserModel;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type UserModel = {
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  tasks: Array<TaskModel>;
};

export type AddTaskMutationVariables = Exact<{
  task: AddTaskInput;
}>;

export type AddTaskMutation = {
  addTask: Pick<TaskModel, "id" | "title" | "deadline" | "createdAt" | "updatedAt"> & {
    assign: Pick<UserModel, "id" | "lastName" | "firstName">;
  };
};

export type RemoveTaskMutationVariables = Exact<{
  taskId: Scalars["ID"];
}>;

export type RemoveTaskMutation = { removeTask?: Maybe<Pick<TaskModel, "id" | "title">> };

export type AddUserMutationVariables = Exact<{
  user: AddUserInput;
}>;

export type AddUserMutation = {
  addUser: Pick<UserModel, "id" | "firstName"> & { tasks: Array<Pick<TaskModel, "id">> };
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = { users: Array<Pick<UserModel, "id" | "firstName" | "lastName">> };

export const AddTaskDocument = gql`
  mutation addTask($task: AddTaskInput!) {
    addTask(task: $task) {
      id
      title
      deadline
      assign {
        id
        lastName
        firstName
      }
      createdAt
      updatedAt
    }
  }
`;
export type AddTaskMutationFn = Apollo.MutationFunction<AddTaskMutation, AddTaskMutationVariables>;

/**
 * __useAddTaskMutation__
 *
 * To run a mutation, you first call `useAddTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTaskMutation, { data, loading, error }] = useAddTaskMutation({
 *   variables: {
 *      task: // value for 'task'
 *   },
 * });
 */
export function useAddTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<AddTaskMutation, AddTaskMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddTaskMutation, AddTaskMutationVariables>(AddTaskDocument, options);
}
export type AddTaskMutationHookResult = ReturnType<typeof useAddTaskMutation>;
export type AddTaskMutationResult = Apollo.MutationResult<AddTaskMutation>;
export type AddTaskMutationOptions = Apollo.BaseMutationOptions<AddTaskMutation, AddTaskMutationVariables>;
export const RemoveTaskDocument = gql`
  mutation removeTask($taskId: ID!) {
    removeTask(id: $taskId) {
      id
      title
    }
  }
`;
export type RemoveTaskMutationFn = Apollo.MutationFunction<RemoveTaskMutation, RemoveTaskMutationVariables>;

/**
 * __useRemoveTaskMutation__
 *
 * To run a mutation, you first call `useRemoveTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTaskMutation, { data, loading, error }] = useRemoveTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useRemoveTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveTaskMutation, RemoveTaskMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveTaskMutation, RemoveTaskMutationVariables>(RemoveTaskDocument, options);
}
export type RemoveTaskMutationHookResult = ReturnType<typeof useRemoveTaskMutation>;
export type RemoveTaskMutationResult = Apollo.MutationResult<RemoveTaskMutation>;
export type RemoveTaskMutationOptions = Apollo.BaseMutationOptions<RemoveTaskMutation, RemoveTaskMutationVariables>;
export const AddUserDocument = gql`
  mutation addUser($user: AddUserInput!) {
    addUser(user: $user) {
      id
      firstName
      tasks {
        id
      }
    }
  }
`;
export type AddUserMutationFn = Apollo.MutationFunction<AddUserMutation, AddUserMutationVariables>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useAddUserMutation(
  baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, options);
}
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;
export const UsersDocument = gql`
  query users {
    users {
      id
      firstName
      lastName
    }
  }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
