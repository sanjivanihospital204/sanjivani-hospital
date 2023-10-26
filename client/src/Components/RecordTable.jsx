import React, { useMemo, useState } from 'react';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

const RecordTable = ({ records }) => {

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'Weight',
        accessor: 'weight',
      },
      {
        Header: 'Contact Number',
        accessor: 'contactNumber',
      },
      {
        Header: 'Edit',
        accessor: 'edit',
        Cell: ({ row }) => (
          <button onClick={() => console.log(row.original)}>Edit</button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data: records,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="min-w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-no-wrap"
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {Math.ceil(records.length / pageSize)}
          </strong>{' '}
        </span>
        <div>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-3 py-2 mx-1 rounded bg-gray-200"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-3 py-2 mx-1 rounded bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordTable;
