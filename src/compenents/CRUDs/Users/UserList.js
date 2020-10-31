import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import TablePagination from '@material-ui/core/TablePagination';
import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { useTable } from 'react-table'
import { useQuery, useMutation, useQueryCache, QueryCache, ReactQueryCacheProvider } from 'react-query'

import { getUsers, createUser } from '../hooks/usersAPI'

const queryCache = new QueryCache()

export default function UserList() {

    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    })

    const [page, setPage] = React.useState(0)
  
    const fetchUsers = (key, page = 0) => fetch('/users/?page=' + page)
  
    const {
      isLoading,
      isError,
      error,
      resolvedData,
      latestData,
      isFetching,
    } = usePaginatedQuery(['users', page], fetchUsers)
  
    return (
      <div>
        {isLoading ? (
            <CircularProgress />
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          // `resolvedData` will either resolve to the latest page's data
          // or if fetching a new page, the last successful page's data
          <div>
            {resolvedData.projects.map(project => (
              <p key={project.id}>{project.name}</p>
            ))}
          </div>
        )}
        <span>Current Page: {page + 1}</span>
        <button
          onClick={() => setPage(old => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          Previous Page
        </button>{' '}
        <button
          onClick={() =>
            // Here, we use `latestData` so the Next Page
            // button isn't relying on potentially old data
            setPage(old => (!latestData || !latestData.hasMore ? old : old + 1))
          }
          disabled={!latestData || !latestData.hasMore}
        >
          Next Page
        </button>
        {
          // Since the last page's data potentially sticks around between page requests,
          // we can use `isFetching` to show a background loading
          // indicator since our `status === 'loading'` state won't be triggered
          isFetching ? <CircularProgress /> : null
        }{' '}
      </div>
    )
  }