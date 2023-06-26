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

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const renderData = () => {
        const startIndex = (currentPage -1) * 10;
        const endIndex = startIndex + 10;

        // return data.slice(startIndex, endIndex).map((item, index) => (
        //     <div key={`${item.id}-${index}`}>{/* Renderiza cada elemento en la interfaz de usuario */}</div>
        // ));
        return data.slice(startIndex, endIndex).map((item, index) => (
            <div key={index}>
              <textarea value={JSON.stringify(item, null, 2)} readOnly></textarea>
            </div>
          ));
    }

    // const columns = useMemo(() => {
    //     if (data.length === 0) return [];
    
    //     const firstDocFields = Object.keys(data[0]);
    //     return firstDocFields.map((field) => ({
    //       Header: field,
    //       accessor: field,
    //     }));
    // }, [data]);


    // const {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     page,
    //     prepareRow,
    //     canPreviousPage,
    //     canNextPage,
    //     pageOptions,
    //     nextPage,
    //     previousPage,
    //     state: { pageIndex },
    // } = useTable(
    //     {
    //         columns,
    //         data,
    //         initialState: { pageIndex: 0 },
    //     },
    //     usePagination
    // );
    
    return (
        <div>
            {/* <table {...getTableProps()}>
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
            </div> */}
            <div>{renderData()}</div>
            <div>
                <button onClick={previousPage} disabled={currentPage === 1}>
                prev
                </button>
                <span>Página actual: {currentPage}</span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                next
                </button>
            </div>
        </div>
    );
};

export default DataTable;
