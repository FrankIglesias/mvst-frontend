import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.github.com/graphql': {
      headers: {
        'User-Agent': 'Coodegen',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      }
    }
  },
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;
