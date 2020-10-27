import { gql } from "@apollo/client";

const GET_ALL_UNIVERSITY = gql`
  query getUniversity {
    allUniversities{
      id
      name
      code
      address
      email
      zone
      introduce
      logo{
        publicUrl
      }
      
    }
  }
`;

 const homepageQueries = {
  GET_ALL_UNIVERSITY,
};

export default homepageQueries