declare module '@vue/apollo-option';
declare module '@vue/apollo-composable';

declare module "*.gql" {
  const content: any;
  export default content;
}