'use strict';

import gql from 'graphql-tag';

//mutation to insert a product
export const createSurvey = gql`
  mutation createSurvey($name: String!, $description: String!, $questions: String!) {
    createSurvey(name: $name, description: $description, questions: $questions){
      id,
      name,
      description,
      questions
    }
  }`;

  //mutation to update a product
  export const updateSurvey = gql`
    mutation updateSurvey($id: Int!, $name: String!, $description: String!, $questions: String!) {
      updateSurvey(id: $id, name: $name, description: $description, questions: $questions){
        id,
        name,
        description,
        questions
      }
    }`;

  //mutation to delete a product
  export const deleteSurvey = gql`
    mutation deleteProduct($id: Int!) {
      deleteSurvey(id: $id){
        id,
        name,
        description,
        questions
      }
    }`;

  //get all products
  export const readSurveys = gql`
    query{
      readSurveys {
        id,
        name,
        description,
        questions
      }
    }`;

  export const readSurvey = gql`
    query{
      readSurvey(id: $id) {
        id,
        name,
        description,
        questions
      }
    }`;