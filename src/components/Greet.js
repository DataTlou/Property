
import React, { useState, useEffect } from 'react';
import {Card, Space, Grid, Divider, Row, Col} from 'antd'
import axios from 'axios';

function Greet() 
{
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [info, setInfo] = useState([]);
    const [userloaded, setUserLoaded] = useState(false);
    
    const  seeUsers = async () => {
        const reponse = await axios.get('http://localhost:3000/users/get/all')
        console.log(reponse)
        console.log(reponse.status)
        setIsLoaded(true)
        setData(reponse)
        // fetch('http://localhost:3000/users/get/all', { mode: 'cors' })
        //     .then(res => {res.json()
        //         console.log(res)})
            
        //     .then(json => {
        //         setIsLoaded(true);
        //         setData(json);
        //     })
        //     .catch((error) => {
        //         console.error("Error is: ", error);
        //     });
    };

    const getIndiUser = async (id) =>
    {
        try 
        {
            console.log(`Pressed ${id}`)
            const res =  await fetch(`http://localhost:3000/users/get/id/${id}`, { mode: 'cors' });
            const json =  await res.json();
            setInfo(json);
            setUserLoaded(true);
        } 
        catch (error) 
        {
            console.error("Error is: ", error);
            console.log("Error is ");
        }
    }
    const handleUserButton = (id) => {
        getIndiUser(id);
    };

    useEffect(() => {
        if (isLoaded) {
            const fetchData = async () => {
                try {
                    const reponse = await axios.get('http://localhost:3000/users/get/all')
                    console.log(reponse)
                    console.log(reponse.status)
                    setIsLoaded(true)
                    setData(reponse);
                    setUserLoaded(false);
                    setInfo(reponse);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            };
            fetchData();
        }
    }, [isLoaded]);
    useEffect(() => 
    {
        if(userloaded)
        {
            const getUser = async () =>
            {
                try
                {
                    console.log('done converting')
                    if (info === null|| typeof info !== 'object' )
                    {
                        throw new Error('Invalid JSON data');
                    }
                    setIsLoaded(false);
                }
                catch(error)
                {
                    console.error("Error fetching2 data: "+info.name, error.message);
                }
            };
            getUser();
        }
    }, [userloaded])

    if (isLoaded && !userloaded) {
        if(data.data.length !== 0)
        {
            return (
                <div >
                    <ul>
                        <Divider> <h1>Current Tenant</h1></Divider>
                        <Row gutter={[4, 16]} justify={'space-evenly'}>
                            {data.map(dat => (
                                                    
                                <Card
                                key={dat.id}
                                className='form-card'
                                onClick={() => handleUserButton(dat.id)}>
                                <h3>{dat.name}</h3> <br/> <p>{dat.surname}</p>
                                </Card>
                            
                        ))}
                        </Row>
                        
                    </ul>
                </div>
            );   
        }
        else if (data.length === 0)
        {
            return(
                <div><p>There are no registered user currently please add more</p></div>
            )
        }
    } 
    else if (!isLoaded && !userloaded) 
    {
        return <div onLoad={seeUsers()}></div>;
    }
    else
    {
        return(
            <Space>
                <div>
                    <ul>
                        <Card>Name: { info.name} <br/> Surname: {info.surname} <br/> Cell Number: { info.cellnumber}</Card>      
                   </ul>
                </div>
            </Space>
        )
    }
}

export default Greet;
