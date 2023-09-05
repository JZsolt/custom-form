import { gql } from "graphql-request";

export const formsQuery = gql`
  query ($formId: ID) {
    forms: forms(filters: { id: { eq: $formId } }) {
      data {
        id
        attributes {
          FormName
          FormDescription
          customID
          Fields {
            __typename
            ... on ComponentInputInputField {
              id
              name
              defaultValue
              customID
              label
              placeholder
              className
              type
            }
            ... on ComponentInputRadioBtn {
              id
              label
              defaultValue
              name
              RadioField {
                id
                value
                label
              }
            }
          }
        }
      }
    }
  }
`;
