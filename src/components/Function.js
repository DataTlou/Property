import React, { useState } from 'react';
import {Button, Form, Input, message, Card} from 'antd';
import axios from 'axios'

const Function = () => 
{
    const [sending, setSending] = useState(false);

    const onFinish = async (values) =>
    {
        try
        {
            setSending(true);
            const res = await axios.post('http://localhost:3000/users/create', values);
            if(res.status === 201)
            {
                message.success('User has been added!');
                window.location.reload();
            }
        }
        catch(error)
        {
            console.error('User creation error: ', error);
        }
        finally
        {
            setSending(false);
            
        }
    }
    return(
        <Card className='form-card'><h1>Tenant System</h1>
            <Form  onFinish={onFinish} labelCol={{span:8,}} style={
                {
                    maxWidth: 500,
                }
            }>
                
                <Form.Item
                name={'name'}
                label={'Name'}>
                    <Input placeholder='Name' />
                </Form.Item>
                <Form.Item
                name={'surname'}
                label={'Surname'}>
                    <Input />
                </Form.Item>
                <Form.Item
                name={'cellnumber'}
                label={'Cell Number'}>
                    <Input/>
                </Form.Item>
                <Form.Item  >
                    <Button  type='primary' htmlType='submit' loading={sending}>Save</Button>
                </Form.Item>
            </Form>
        </Card>
        
    )
}
export default Function;