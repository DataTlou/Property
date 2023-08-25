import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";
const Edit = ({ datapressed }) => {
  // form
  const [form] = Form.useForm();

  const [FormData, setFormData] = useState({
    name: `${datapressed["name"]}`,
    surname: `${datapressed["surname"]}`,
    cellnumber: `${datapressed["cellnumber"]}`,
  });
  const HandleChange = (e) => {
    const variable = e.target
    setFormData((prevInfo) => ({ ...prevInfo, [variable.id]: variable.value }));
  };
   

  const Update = async () => {
    
    if (
      (FormData.name !== datapressed["name"] |
        (FormData.surname !== datapressed["surname"]) |
        (FormData.cellnumber !== datapressed["cellnumber"]))
    ) {
      console.log("Changes made");
      try
      {
        const post = await axios.put(`http://localhost:3000/users/update/${datapressed["id"]}`, FormData)
        console.log(post.data)
      }
      catch(error)
      {
        console.error(error.response.data.statusCode)
      }
      

    } else {
      console.log("No changes made");
    }
    
  };

  return (
    <Form onFinish={Update} form={form}>
        <Form.Item label={"Name:"}name="name">
          <Input
            disabled={false}
              defaultValue={FormData["name"]}
            onChange={HandleChange}
          />
        </Form.Item>
      
        <Form.Item label={"Surname:"}name="surname">
          <Input
            defaultValue={FormData["surname"]}
            onChange={HandleChange}
          />
        </Form.Item>
      
        <Form.Item label={"Cellphone Number:"}name="cellnumber">
          <Input
            defaultValue={FormData["cellnumber"]}
            onChange={HandleChange}
          />
        </Form.Item>
      <Button htmlType="submit" onSubmit={Update}>
        Save
      </Button>
    </Form>
  );
};

export default Edit;
