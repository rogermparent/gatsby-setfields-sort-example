import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"

const JSONBlock = ({ data, title }) => (
  <div style={{margin: 15}}>
    <h2>{title}</h2>
    {data ? <code>{JSON.stringify(data)}</code> : <div>No data was provided!</div>}
  </div>
)
/*
This bit of query breaks at compile time

The error is:
  Expected type SortableExampleNodeConnectionSortByFieldsEnum, found dateFieldDate; Did you mean the enum value stringFieldDate?  graphql/template-strings

Paste it at the end of the query to test for yourself.

        byAddedDate: allSortableExampleNode(sort: {fields: [dateFieldDate], order: DESC}) {
          edges {
            node {
              date
              dateFieldDate
              stringFieldDate
            }
          }
        }
*/
const IndexPage = () => (
  <Layout>

    <StaticQuery
      query={graphql`{
        byAddedDateString: allSortableExampleNode(sort: {fields: [stringFieldDate], order: DESC}) {
          edges {
            node {
              date
            }
          }
        }
        byNaturalDate: allSortableExampleNode(sort: {fields: [date], order: DESC}) {
          edges {
            node {
              date
            }
          }
        }
      }`}
      render={data => (
        <div>
          <JSONBlock title="Sorted by a regularly added and inferred Date field" data={data.byNaturalDate} />
          <JSONBlock title="Sorted by string field added by SetFields" data={data.byAddedDateString} />
          <JSONBlock title="Sorted by a Date field added by SetFields" data={data.byAddedDate} />
        </div>
      )}
    />
  </Layout>
)

export default IndexPage
