import React, { useEffect, useState, useMemo } from 'react';
import Button from 'react-bootstrap/esm/Button';
import './DataTable.css'
import DataElement from '../DataElement/DataElement';
import DataView from '../DataView/DataView';

const DataTable = (props) => {
    const {index} = props;
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [showFullObject, setShowFullObject] = useState(false);
    const [selectedObject, setSelectedObject] = useState(null);
    const [showData, setShowData] = useState(false);



    useEffect(() => {
        setData([]);
    }, [index]);

    useEffect(() => {
        
        const fetchData = async () => {
            fetch(
                `http://localhost:9200/cmcd-${index}/_search?size=10&from=${(currentPage - 1) * 10}`,
                {headers:{authorization: "Basic ZWxhc3RpYzpjaGFuZ2VtZQ=="}}
            ).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong')
            }
            ).then((responseJson) => {              
                const hits = responseJson.hits.hits;
                const totalCount = responseJson.hits.total.value;
                const totalPages = Math.ceil(totalCount / 10);
                const temData = hits.map((hit) =>  hit._source);
                setData(temData);
                setTotalPages(totalPages);
            }).catch((error) => {
                console.log('Cant fetch data')
            });                
        };
        let intervalId;
        const startFetchingData = () => {
            fetchData();
            intervalId = setInterval(fetchData, 5000);
          };
      
          if (index) {
            startFetchingData();
          }
      
          return () => {
            clearInterval(intervalId);
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

    const handleButtonClick = (object) => {
        setShowData(true);
        setSelectedObject(object);
    };
    
    return (
        <div>
            <div>
                <DataElement data={data} handleClick={handleButtonClick}/>
                {totalPages?(
                    <div className='mt-3'>
                        <button className='custom-button' onClick={previousPage} disabled={currentPage === 1}>
                            Prev
                        </button>
                        <span style={{color:'white', margin:'0 1em 0 1em'}}>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button className='custom-button' onClick={nextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                ): (
                    <></>
                )}
            </div>

            <DataView show={showData} setShow={setShowData} data={selectedObject}/>
        </div>
    );
};

export default DataTable;
