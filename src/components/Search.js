import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Table, Space, Result } from "antd";
import axios from "axios";
import Edit from "./Edit";
import moment from "moment";

const Search = () => {
  const [data, setData] = useState([]);
  const [StatCode, setStatCode] = useState(0);
  const { Column } = Table;
  const [isEditable, setIsEditable] = useState(false);
  const [timeDiff, setTimeDiff] = useState("")

  const getTimeDiff = () =>
  {
    const diff = moment(data['updatedAt']) - moment(data['createdAt'])
    console.log(diff)
    const days = Math.floor(diff/86400000)
    const hours = Math.floor((diff-(86400000*days))/3600000)
    const minutes = Math.floor((diff-((86400000*days)+(3600000*hours)))/60000)
    const seconds = Math.floor((diff-((86400000*days)+(3600000*hours)+(minutes*60000)))/1000)
    setTimeDiff(`${days} days, ${hours} hours,${minutes} minutes and ${seconds} seconds`)
  }

  const findName = async (value) => {
    try 
    {
      const res = await axios.get(
        `http://localhost:3000/users/get/name/${value["username"]}`,
        {
          user: value.user,
        }
      );
      console.log(value["username"]);
      console.log(res.data);
      setData(res.data);
      setStatCode(res.status);
      console.log(`http://localhost:3000/users/get/name/${value["username"]}`);
    } 
    catch (error) 
    {
      setStatCode(error.response.data.statusCode);
    }
  };
  const HandleEditButton = () => {
    setStatCode((prevstat) => {
      if (prevstat === 200) {
        return 1;
      } 
    });
    setIsEditable((currentEditStatus) => {
      if (currentEditStatus === false) {
        return true;
      }
    });
  };
  const HandleViewButton = () =>
  {
    setStatCode(2);
    getTimeDiff();
  }
  const HandleBackButton = () =>
  {
    setStatCode(200);
    setIsEditable(false);
    console.log(data)
  }
  return (
    <div>
      {StatCode === 0 && !isEditable && (
        <Form onFinish={findName}>
          <Form.Item
            label="Username:"
            name={"username"}
            style={{
              outerWidth: 200,
              width: 200,
              marginLeft: 0,
              marginRight: 130,
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={data}>
              Search
            </Button>
          </Form.Item>
        </Form>
      )}

      {StatCode === 200 && !isEditable && (
        <Card>
          <Table dataSource={[data]} pagination={false}>
            <Column
              key={"id"}
              title="Name"
              dataIndex={"name"}
              render={() => {
                if (data["name"].length === 0) {
                  return <p>N/A</p>;
                } else {
                  return <p>{data["name"]}</p>;
                }
              }}
            />
            <Column
              title="Surname"
              dataIndex={"surname"}
              render={() => {
                if (data["surname"].length === 0) {
                  return <p>N/A</p>;
                } else {
                  return (
                    <p>{data["surname"]}</p>
                  );
                }
              }}
            />
            <Column
              title="Cellphone Number"
              dataIndex={"cellnumber"}
              render={() => {
                if (data["cellnumber"].length === 0) {
                  return <p>N/A</p>;
                } else {
                  return (
                    <p>{data["cellnumber"]}</p>
                  );
                }
              }}
            />
            <Column
              title="Action"
              render={() => {
                if (data.length !== 0) {
                  return (
                    <Space>
                        <a onClick={HandleEditButton}>Edit</a>
                          <a onClick={HandleViewButton}>View</a>
                    </Space>
                  );
                } else {
                  return <Space></Space>;
                }
              }}
            />
          </Table>
        </Card>
      )}
      {StatCode === 404 && !isEditable && (
        <Result
          status={404}
          title={"Search Results"}
          subTitle={"The user is not found"}
        />
      )}
      {StatCode === 1 && isEditable && (
        <Card>
          <h1>Edit User information</h1>
          <Edit datapressed={data} />
        </Card>
      )}
      {StatCode === 2 && !isEditable &&(
        <Card><p>Name: {data.name}</p>  <p>Surname: {data.surname}</p> <p>Cellphone Number: {data.cellnumber}</p> <p>Date Created: {moment(data.createdAt).format('D MMM yyyy HH:mm:ss')}</p> <p>Date updated: {moment(data.updatedAt).format('D MMM yyyy HH:mm:ss')}</p> <p>Date difference: {timeDiff}</p>
         {/* format(data.createdAt,"Do MMMM yyyy, HH:mm:ss") */}
        <Button onClick={HandleBackButton}>Back</Button></Card>
      )}
    </div>
  );
};
export default Search;
