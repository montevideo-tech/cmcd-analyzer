import React, { useEffect, useState, useMemo } from 'react';
import { useTable, usePagination } from 'react-table';


const DataTable = (props) => {
    const {index} = props;
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        console.log('data:', data);
    }, [data]);

    useEffect(() => {
        console.log('useEffect');

        const fetchData = async () => {

            try {
                console.log('fetchData');

                console.log('client');
                const response = await fetch(`http://localhost:9200/cmcd-1/_search`,{headers:{authorization: "Basic ZWxhc3RpYzpjaGFuZ2VtZQ=="}});

                const resData = await response.json();

                console.log(resData);
                
                const hits = resData.hits.hits;
                const totalCount = resData.hits.total.value;
                const totalPages = Math.ceil(totalCount / 10);

                console.log('hits', hits);
                const temData = hits.map((hit) =>  hit._source);

                setData(temData);
                setTotalPages(totalPages);
                
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        fetchData();
        // const interval = setInterval(fetchData, 5000);

        return () => {
            // clearInterval(interval);
        };
    }, [currentPage, index]);

    const columns = useMemo(() => {
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
