'use strict';

import gql from 'graphql-tag';

//mutation to insert a product
export const createSurvey = gql`
  mutation createSurvey($name: String!, $description: String!, $questions: String!, $draft: Boolean!) {
    createSurvey(name: $name, description: $description, questions: $questions, draft: $draft){
      id,
      name,
      description,
      questions,
      draft
    }
  }`;

  //mutation to update a product
  export const updateSurvey = gql`
    mutation updateSurvey($id: Int!, $name: String!, $description: String!, $questions: String!, $draft: Boolean!) {
      updateSurvey(id: $id, name: $name, description: $description, questions: $questions, draft: $draft) {
        id,
        name,
        description,
        questions,
        draft
      }
    }`;

  //mutation to delete a product
  export const deleteSurvey = gql`
    mutation deleteSurvey($id: Int!) {
      deleteSurvey(id: $id){
        id,
        name,
        description,
        questions,
        draft
      }
    }`;

  //get all products
  export const readSurveys = gql`
    query {
      readSurveys {
        id,
        name,
        description,
        questions,
        draft
      }
    }`;

  export const readSurvey = gql`
    query readSurvey($id: Int!){
      readSurvey(id: $id) {
        id,
        name,
        description,
        questions,
        draft
      }
    }`;