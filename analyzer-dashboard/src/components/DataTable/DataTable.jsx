import React, { useEffect, useState } from 'react';
import { Client } from '@elastic/elasticsearch';
import { useTable, usePagination } from 'react-table';

const client = new Client({
    node: 'http://localhost:9200', 
    auth: {
    username: 'elastic',
    password: 'changeme',
    },
});

const DataTable = (props) => {
    const {index} = props;
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        console.log('useEffect');

        const fetchData = async () => {
            console.log('fetchData');

            console.log('client');

            const response = await client.search({
                index: index,
                size: 20,
                from: (currentPage - 1) * 20,
            });

            const hits = response.body.hits.hits;
            const totalCount = response.body.hits.total.value;
            const totalPages = Math.ceil(totalCount / 20);

            setData(hits.map((hit) => hit._source));
            setTotalPages(totalPages);
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [currentPage, index]);

    const columns = React.useMemo(() => {
        if (data.length === 0) return [];
    
        const firstDocFields = Object.keys(data[0]);
        return firstDocFields.map((field) => ({
          Header: field,
          accessor: field,
        }));
    }, [data]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    );
    
    return (
        <div>
            <table {...getTableProps()}>
            <thead>
                {headerGroups.map((index, headerGroup) => (
                <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((index, column) => (
                        <th key={index} {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((index, row) => {
                prepareRow(row);
                return (
                    <tr key={index} {...row.getRowProps()}>
                    {row.cells.map((index, cell) => (
                        <td key={index} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                    </tr>
                );
                })}
            </tbody>
            </table>
            <div>
            <button onClick={() => setCurrentPage((prevPage) => prevPage - 1)} disabled={!canPreviousPage}>
                Back
            </button>
            <span>
                Page {pageIndex + 1} of {pageOptions.length}
            </span>
            <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)} disabled={!canNextPage}>
                Next
            </button>
            </div>
        </div>
    );
};

export default DataTable;
