import { Resolvers } from "../__generated__/types/slacker";

const resolvers: Resolvers = {
  Query: {
    url: async (_, __, { dataSources }) => {
      return dataSources.slacker.getInstallPath();
    },
  },
  Mutation: {
    connect: async (_, { secret }, { dataSources }) => {
      return dataSources.slacker.connectSlackUser(secret);
    },
  },
};

export default resolvers;
