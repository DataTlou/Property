import React, { useEffect, useState } from 'react';
import {Form, Input, Button, Card} from 'antd';
import axios from 'axios';

const Search = () =>
{
    const [data, setData] = useState([]);
    const [found, setFound] = useState(false);
    const findName = async (value) =>
    {
        
        try
        {
            const res = await axios.get(`http://localhost:3000/users/get/name/${value['username']}`)
            console.log(value['username'])
            setData(res.data)
            // const response = await fetch(, {mode: 'cors'}) || null;
            // console.log(response.data)
            // const json = await response.json();
            // setData(json);
            setFound(true);
            console.log(`http://localhost:3000/users/get/name/${value['username']}`)
        }
        catch(error)
        {
            console.error("Error ke:",error);
            
        }
        
    }
    useEffect(() => 
    {
        if(found)
        {
            const getUser = async () =>
            {
                try
                {
                    console.log('done converting')
                    if (data === null|| typeof data !== 'object' )
                    {
                        throw new Error('Invalid JSON data');
                    }
                }
                catch(error)
                {
                    console.error("Error fetching2 data: "+data.name, error.message);
                }
            };
            getUser();
        }
    }, [found])
    
        return(
            <div>
                
            <Form onFinish={findName}>
                <Form.Item
                label='Username:'
                name={'username'}>
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit' loading={data}>Search</Button>
                </Form.Item>
            </Form>
                <div className='result-card'>
                    {data.surname}
                </div>
            </div>
        )
    
}
export default Search;