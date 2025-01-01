// Table.js
import React from 'react';
import { useTable } from 'react-table';
import './Table.css';  // We'll define the styles in this file

const Table = () => {
  // Define columns for the table
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id', // column data key
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Job',
        accessor: 'job',
      },
    ],
    []
  );

  // Sample data
  const data = React.useMemo(
    () => [
      { id: 1, name: 'Bhanumurthi Naidu Tellapati', age: 28, job: 'Engineer' },
      { id: 2, name: 'Jane', age: 32, job: 'Designer' },
      { id: 3, name: 'Jake', age: 23, job: 'Developer' },
      { id: 4, name: 'Jill', age: 29, job: 'Manager' },
    ],
    []
  );

  // Create an instance of the useTable hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
