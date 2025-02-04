import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  OrganizationAllowedActionsScalar: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  signIn?: Maybe<Token>;
  token?: Maybe<Token>;
  updateUser?: Maybe<Token>;
  user?: Maybe<Token>;
};


export type MutationSignInArgs = {
  provider: Scalars['String']['input'];
  redirectUri?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};


export type MutationTokenArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  params: UpdateUserParams;
};


export type MutationUserArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type OrganizationAllowedActionsRequestParams = {
  organization: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  organizationAllowedActions?: Maybe<Scalars['OrganizationAllowedActionsScalar']['output']>;
};


export type QueryOrganizationAllowedActionsArgs = {
  requestParams?: InputMaybe<OrganizationAllowedActionsRequestParams>;
};

export type Token = {
  __typename?: 'Token';
  token?: Maybe<Scalars['String']['output']>;
  user_email: Scalars['String']['output'];
  user_id: Scalars['ID']['output'];
};

export type UpdateUserParams = {
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  OrganizationAllowedActionsRequestParams: OrganizationAllowedActionsRequestParams;
  OrganizationAllowedActionsScalar: ResolverTypeWrapper<Scalars['OrganizationAllowedActionsScalar']['output']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Token: ResolverTypeWrapper<Token>;
  UpdateUserParams: UpdateUserParams;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Mutation: {};
  OrganizationAllowedActionsRequestParams: OrganizationAllowedActionsRequestParams;
  OrganizationAllowedActionsScalar: Scalars['OrganizationAllowedActionsScalar']['output'];
  Query: {};
  String: Scalars['String']['output'];
  Token: Token;
  UpdateUserParams: UpdateUserParams;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signIn?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'provider' | 'token'>>;
  token?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationTokenArgs, 'email'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'params'>>;
  user?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationUserArgs, 'email' | 'name' | 'password'>>;
};

export interface OrganizationAllowedActionsScalarScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['OrganizationAllowedActionsScalar'], any> {
  name: 'OrganizationAllowedActionsScalar';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  organizationAllowedActions?: Resolver<Maybe<ResolversTypes['OrganizationAllowedActionsScalar']>, ParentType, ContextType, Partial<QueryOrganizationAllowedActionsArgs>>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  OrganizationAllowedActionsScalar?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
};

