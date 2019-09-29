import React from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import "./activity_delete.css";
const { DELETE_ACTIVITY } = Mutations;
const { FETCH_ACTIVITIES } = Queries;

const linkStyle = {
  cursor: "pointer",
  fontSize: "10px",
  color: "red"
};

const DeleteActivity = props => {
  return (
    <Mutation
      mutation={DELETE_ACTIVITY}
      refetchQueries={() => {
        return [
          {
            query: FETCH_ACTIVITIES
          }
        ];
      }}
    >
      {(DeleteActivity, { data }) => (
        <a
          style={linkStyle}
          onClick={e => {
            e.preventDefault();
            DeleteActivity({ variables: { id: props.id } });
          }}
        >
          <i className="fas fa-trash"></i>
        </a>
      )}
    </Mutation>
  );
};

export default DeleteActivity;
