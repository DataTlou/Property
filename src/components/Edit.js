import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
const Edit = ({ datapressed }) => {
  // form
  const [form] = Form.useForm();
  const [EnableButton, setEnableButton] = useState(false);
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
      
      try
      {
        
          if(FormData.cellnumber[0] === "0" && FormData.cellnumber.length < 10)
          {
            console.log("The length of cellnumber is less than 10.")
          }
          else if(FormData.cellnumber[0] === "+" && FormData.cellnumber.length < 12)
          {
            console.log("The length of cellnumber is less than 12.")
          }
          else if(FormData.cellnumber[0] === "+" && FormData.cellnumber.length > 12)
          {
            console.log("The length of cellnumber is more than 12.")
          }
          else if(FormData.cellnumber[0] === "0" && FormData.cellnumber.length > 10)
          {
            console.log("The length of cellnumber is more than 10.")
          }
          else
          {
            const post = await axios.put(`http://localhost:3000/users/update/${datapressed["id"]}`, FormData);
            console.log(post.data);
            console.log("Changes made.");
          }
      }
      catch(error)
      {
        console.error(error.response.data.statusCode)
      }
      

    } else {
      console.log("No changes made");
    }
    
  };
  const ButtonDisability = () =>
  {
    if(FormData === datapressed){return false}else{return true}
  }
  return (
    <Form onFinish={Update} form={form} initialValues={FormData}>
        <Form.Item label={"Name:"}name="name">
          <Input
            onChange={HandleChange}
          />
        </Form.Item>
      
        <Form.Item label={"Surname:"}name="surname">
          <Input
            onChange={HandleChange}
          />
        </Form.Item>
      
        <Form.Item label={"Cellphone Number:"}name="cellnumber">
          <Input
            onChange={HandleChange}
          />
        </Form.Item>
      <Button htmlType="submit" onSubmit={Update} disabled={EnableButton}>
        Save
      </Button>
    </Form>
  );
};

export default Edit;
