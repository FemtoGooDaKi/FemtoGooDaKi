import React from "react";
import "./AddCoursePage.scss";
import { Form, Input, Button, Select } from "antd";
import { Tabs } from "antd";
import { courseService } from "../../services/ServiceManager";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

export default class AddCoursePage extends React.Component {
  formRef = React.createRef();

  onGenderChange = (value) => {
    this.formRef.current.setFieldsValue({
      note: `Hi, ${value === "male" ? "man" : "lady"}!`,
    });
  };

  onFinish = (values) => {
    console.log(values);
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  onFill = () => {
    this.formRef.current.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
  };

  onSubmitKnowledge = (values) => {
    console.log(values);
    //send to backend
    const obj = {
      subject: values.Subject,
      content: values.Content,
    };
    courseService.addKnowledge(obj, (result, error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("result", result);
    });
  };

  render() {
    return (
      <Tabs defaultActiveKey="1" className="add-course-page">
        <TabPane tab="Add new course" key="1">
          <Form
            ref={this.formRef}
            name="control-ref"
            onFinish={this.onFinish}
            className="add-course-form"
            {...layout}
          >
            <Form.Item
              name="Course Name"
              label="Course Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Description"
              label="Description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.List name="knowledge">
              {(fields, { add, remove }) => {
                console.log(fields)
                return (
                  <div>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? "Knowledges" : ""}
                        required={true}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please select knowledge in this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Select
                            placeholder="Select knowledge for this course"
                            allowClear
                            style={{ width: "60%" }}
                          >
                            <Option value="Engineer">Engineer</Option>
                            <Option value="Consultant">Consultant</Option>
                            <Option value="Businessman">Businessman</Option>
                            <Option value="Policeman">Policeman</Option>
                            <Option value="Teacher">Teacher</Option>
                            <Option value="Sciencetist">Sciencetist</Option>
                            <Option value="Politician">Politician</Option>
                            <Option value="other">other</Option>
                          </Select>
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            style={{ margin: "0 8px" }}
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        style={{ width: "60%", marginLeft: "16.66666667%" }}
                      >
                        <PlusOutlined /> Add Knowledges
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>

            <Form.Item
              name="Career"
              label="Career"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select career that associated with this course"
                onChange={this.onGenderChange}
                allowClear
              >
                <Option value="Engineer">Engineer</Option>
                <Option value="Consultant">Consultant</Option>
                <Option value="Businessman">Businessman</Option>
                <Option value="Policeman">Policeman</Option>
                <Option value="Teacher">Teacher</Option>
                <Option value="Sciencetist">Sciencetist</Option>
                <Option value="Politician">Politician</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.Career !== currentValues.Career
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("Career") === "other" ? (
                  <Form.Item
                    name="Other career"
                    label="Other career"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Form.Item className="add-course-tail">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={this.onReset}>
                Reset
              </Button>
              <Button type="link" htmlType="button" onClick={this.onFill}>
                Fill form
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Add new knowledge" key="2">
          <Form
            ref={this.formRef}
            name="control-ref"
            onFinish={this.onSubmitKnowledge}
            className="add-course-form"
            {...layout}
          >
            <Form.Item
              name="Knowledge Name"
              label="Knowledge Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Subject"
              label="Subject"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"Content"}
              label="Content"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item className="add-course-tail">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={this.onReset}>
                Reset
              </Button>
              <Button type="link" htmlType="button" onClick={this.onFill}>
                Fill form
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    );
  }
}
