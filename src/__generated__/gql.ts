/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Repositories($query: String!, $cursor: String) {\n    search(type:REPOSITORY query:$query first: 10, after: $cursor) {\n      repositories: nodes {\n        ... on Repository {\n          name\n          description\n          url\n        }\n      }\n      pageInfo {\n          endCursor\n          hasNextPage\n      }\n    }\n  }\n": types.RepositoriesDocument,
    "\nquery Users($query: String!) {\n  search(type:USER query: $query first: 5) {\n    nodes {\n      ... on User {\n        id\n        login\n        avatarUrl\n      }\n    }\n  }\n}\n": types.UsersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Repositories($query: String!, $cursor: String) {\n    search(type:REPOSITORY query:$query first: 10, after: $cursor) {\n      repositories: nodes {\n        ... on Repository {\n          name\n          description\n          url\n        }\n      }\n      pageInfo {\n          endCursor\n          hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query Repositories($query: String!, $cursor: String) {\n    search(type:REPOSITORY query:$query first: 10, after: $cursor) {\n      repositories: nodes {\n        ... on Repository {\n          name\n          description\n          url\n        }\n      }\n      pageInfo {\n          endCursor\n          hasNextPage\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Users($query: String!) {\n  search(type:USER query: $query first: 5) {\n    nodes {\n      ... on User {\n        id\n        login\n        avatarUrl\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery Users($query: String!) {\n  search(type:USER query: $query first: 5) {\n    nodes {\n      ... on User {\n        id\n        login\n        avatarUrl\n      }\n    }\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;