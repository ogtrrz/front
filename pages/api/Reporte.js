import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import gql from 'graphql-tag';

const Query = gql`
  query luke {
    reporte @rest( path: "reportes/104259/") {
      titulo
    }
  }
`;

class Reporte extends Component {
  render() {
    const { loading, error, reporte } = this.props;
    if (loading) {
      return <h4>Loading...</h4>;
    }
    if (error) {
      return <h4>{error.message}</h4>;
    }
    return <h1>{reporte.titulo}</h1>;
  }
}
export default graphql(Query, {
  props: ({ data }) => {
    if (data.loading) {
      console.log(28);
      return {
        loading: data.loading,
      };
    }

    if (data.error) {
      console.log(35);
      return {
        error: data.error,
      };
    }
    console.log(40);
    return {
      reporte: data.reporte,
      loading: false,
    };
  },
})(Reporte);