import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Table, Space } from "antd";
import axios from "axios";
import { render } from "@testing-library/react";

const Search = () => {
  const [data, setData] = useState([]);
  const [found, setFound] = useState(0);
  const [code, setCode] = useState(0);
  const { Column } = Table;
  const findName = async (value) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/users/get/name/${value["username"]}`,
        {
          user: value.user,
        }
      );
      console.log(value["username"]);
      console.log(res.data);
      setData(res.data);
      setFound(res.status);
      setCode(res.status);
      console.log(`http://localhost:3000/users/get/name/${value["username"]}`);
    } catch (error) {
      setFound(error.response.data.statusCode);
      console.log(error.response.data.statusCode)
    }
  };
//   useEffect(() => {
//     if (found) {
//       const getUser = async () => {
//         try {
//           console.log("done converting");
//           setFound(1);
//           if (data === null || typeof data !== "object") {
//             throw new Error("Invalid JSON data");
//           }
//         } catch (error) {
//           console.error("Error fetching2 data: " + data.name, error);
//         }
//       };
//       getUser();
//     }
//   }, [found]);

  return (
    <div>
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
      { found === 200  &&
      <Card >
        <Table dataSource={[data]} pagination={false}>
          <Column title='Name' dataIndex={"name"} render={() => {
              if (data["name"].length === 0) {
                return <p>N/A</p>;
              } else {
                return data["name"];
              }
            }}/>
          <Column title='Surname' dataIndex={"surname"} render={() => {
              if (data["surname"].length === 0) {
                return <p>N/A</p>;
              } else {
                return data["surname"];
              }
            }}/>
          <Column
            title='Cellphone Number'
            dataIndex={"cellnumber"}
            render={() => {
              if (data["cellnumber"].length === 0) {
                return <p>N/A</p>;
              } else {
                return data["cellnumber"];
              }
            }}
          />
          <Column title='Action'
            render={() => {
              if (data.length !== 0) {
                return (
                  <Space>
                    <a>Edit</a>
                  </Space>
                );
              } else {
                return <Space></Space>;
              }
            }}
          />
        </Table>
      </Card>}
      {found == 404 &&
      <Card>
        <p>User is not found</p>
        </Card>}
    </div>
  );
};
export default Search;
