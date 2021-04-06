import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert';

import TablePagination from '@material-ui/core/TablePagination';
import CssBaseline from '@material-ui/core/CssBaseline'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'


import { useTable } from 'react-table'
import { useQuery, useMutation, useQueryCache, QueryCache, ReactQueryCacheProvider } from 'react-query'

import { getUsers, createUser } from '../hooks/usersAPI'

const queryCache = new QueryCache()

export function ReactQueryCacheProvider() {}
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <UserList />
    </ReactQueryCacheProvider>
  )
}

export default function UserList() {

    const cache = useQueryCache()

    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    })

    const [page, setPage] = React.useState(0)
  
    const fetchUsers = (key, page = 0) => fetch('/admin-dashboard/data/users/?page=' + page)
  
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
                <Alert severity="error">{error.message}</Alert>

        ) : (
          // `resolvedData` will either resolve to the latest page's data
          // or if fetching a new page, the last successful page's data
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <TableCell {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {rows.map((row, i) => {
                prepareRow(row)
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                  {resolvedData.users.map(user => (
    <p key={user.id}>{user.name}</p>
  ))}
                )
              })}
            </TableBody>
          </Table>
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