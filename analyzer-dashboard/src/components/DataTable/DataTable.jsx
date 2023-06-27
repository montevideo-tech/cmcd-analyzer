import React, { useEffect, useState, useMemo } from 'react';
import Button from 'react-bootstrap/esm/Button';
import './DataTable.css'
import DataView from '../DataView/DataView';

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
                const response = await fetch(`http://localhost:9200/cmcd-14/_search?size=10&from=${(currentPage - 1) * 10}` ,{headers:{authorization: "Basic ZWxhc3RpYzpjaGFuZ2VtZQ=="}});

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

    // const renderData = () => {
    //     const startIndex = (currentPage -1) * 10;
    //     const endIndex = startIndex + 10;

    //     // return data.slice(startIndex, endIndex).map((item, index) => (
    //     //     <div key={`${item.id}-${index}`}>{/* Renderiza cada elemento en la interfaz de usuario */}</div>
    //     // ));
    //     return data.slice(startIndex, endIndex).map((item, index) => (
    //         <div key={index}>
    //           {/* <textarea value={JSON.stringify(item, null, 2)} readOnly></textarea> */}
    //           <Button className="btn" style={{width: '100%'}}>
    //             {`${JSON.stringify(item, null, 2)?.slice(0,50)}...`}
    //           </Button>
    //         </div>
    //     ));
    // }

    
    return (
        <div className="container-box">
            <div>
                <DataView data={data}/>
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
        </div>
    );
};

export default DataTable;
