import { gql } from "graphql-request";

export const formsQuery = gql`
  {
    forms {
      data {
        id
        attributes {
          FormName
          customID
          Fields {
            __typename
            ... on ComponentInputInputField {
              id
              name
              customID
              label
              placeholder
              className
              type
            }
          }
        }
      }
    }
  }
`;
