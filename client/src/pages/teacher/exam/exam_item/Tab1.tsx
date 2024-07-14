import React from "react";
import axios from "axios";
import {
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Button,
  Space,
  Card,
  Typography,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import baseUrl from "../../../../apis/axios";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function QuizForm() {
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      // Chuyển đổi dữ liệu cho phù hợp với API
      const payload = {
        title: values.quizTitle,
        start_time: values.dateRange ? values.dateRange[0].toISOString() : "",
        end_time: values.dateRange ? values.dateRange[1].toISOString() : "",
        classroom: values.class,
        questions: values.questions.map((q: any) => ({
          text: q.question,
          answers: q.answers.map((a: any) => ({
            text: a,
            is_correct: a === q.correctAnswer,
          })),
        })),
      };

      // Lấy token từ localStorage hoặc context, tùy thuộc vào cách bạn quản lý authentication
      const token = localStorage.getItem("authToken");

      // Gửi dữ liệu đến API
      const response = await baseUrl.post("/quiz/create", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Đảm bảo rằng token được gửi với yêu cầu
        },
      });

      console.log("Quiz saved successfully:", response.data);
    } catch (error) {
      console.log("Error saving quiz:", error);
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      name="dynamic_form_complex"
      style={{ maxWidth: 800, margin: "0 auto" }}
      autoComplete="off"
      initialValues={{ questions: [{ answers: [""] }] }}
    >
      <Form.Item
        label="Tên bài thi"
        name="quizTitle"
        rules={[{ required: true, message: "Vui lòng nhập tên bài thi" }]}
      >
        <Input placeholder="Nhập tên bài thi" />
      </Form.Item>

      <Form.Item
        label="Ngày bắt đầu và kết thúc"
        name="dateRange"
        rules={[
          { required: true, message: "Vui lòng chọn ngày bắt đầu và kết thúc" },
        ]}
      >
        <RangePicker
          placeholder={["Bắt đầu", "Kết thúc"]}
          className="w-full"
          showTime
        />
      </Form.Item>

      <Form.Item
        label="Chọn lớp"
        name="class"
        rules={[{ required: true, message: "Vui lòng chọn lớp" }]}
      >
        <Select placeholder="Chọn lớp">
          <Option value="157153e5-ccb5-4f36-a3f4-7c6b44354bd4">
            DCCNTT13.10.7
          </Option>
        </Select>
      </Form.Item>

      <Form.Item label="Nhập số câu hỏi">
        <Input
          placeholder="Nhập số câu hỏi"
          type="number"
          onChange={(e) => {
            const count = parseInt(e.target.value, 10);
            const currentQuestions = form.getFieldValue("questions");
            if (count > currentQuestions.length) {
              const newQuestions = Array.from(
                { length: count - currentQuestions.length },
                () => ({
                  question: "",
                  answers: [""],
                  correctAnswer: "", // Đảm bảo giá trị mặc định là một chuỗi rỗng
                })
              );
              form.setFieldsValue({
                questions: [...currentQuestions, ...newQuestions],
              });
            } else {
              form.setFieldsValue({
                questions: currentQuestions.slice(0, count),
              });
            }
          }}
        />
      </Form.Item>

      <Form.List name="questions">
        {(fields, { add, remove }) => (
          <div>
            {fields.map((field, index) => (
              <Card
                size="small"
                title={`Câu hỏi ${index + 1}`}
                key={field.key}
                extra={<CloseOutlined onClick={() => remove(field.name)} />}
              >
                <Form.Item
                  label="Câu hỏi"
                  name={[field.name, "question"]}
                  rules={[{ required: true, message: "Vui lòng nhập câu hỏi" }]}
                >
                  <Input placeholder="Nhập câu hỏi" />
                </Form.Item>

                <Form.List name={[field.name, "answers"]}>
                  {(
                    subFields,
                    { add: addSubField, remove: removeSubField }
                  ) => (
                    <div>
                      {subFields.map((subField, subIndex) => (
                        <Space
                          key={subField.key}
                          align="baseline"
                          style={{ display: "flex", marginBottom: 8 }}
                        >
                          <Form.Item
                            {...subField}
                            name={[subField.name]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập câu trả lời",
                              },
                            ]}
                          >
                            <Input
                              placeholder={`Câu trả lời ${subIndex + 1}`}
                            />
                          </Form.Item>
                          <Form.Item
                            name={[field.name, "correctAnswer"]}
                            noStyle
                            shouldUpdate
                          >
                            {({ getFieldValue }) => {
                              const answers = getFieldValue([
                                field.name,
                                "answers",
                              ]);
                              return (
                                <Radio.Group
                                  value={getFieldValue([
                                    field.name,
                                    "correctAnswer",
                                  ])}
                                  onChange={(e) =>
                                    form.setFieldsValue({
                                      [field.name]: {
                                        correctAnswer: e.target.value,
                                      },
                                    })
                                  }
                                >
                                  {answers.map((_, index) => (
                                    <Radio key={index} value={index}>
                                      Câu trả lời {index + 1}
                                    </Radio>
                                  ))}
                                </Radio.Group>
                              );
                            }}
                          </Form.Item>
                          <CloseOutlined
                            onClick={() => removeSubField(subField.name)}
                          />
                        </Space>
                      ))}
                      <Button type="dashed" onClick={() => addSubField()} block>
                        + Thêm câu trả lời
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Thêm câu hỏi
            </Button>
          </div>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" onClick={handleSave}>
          Lưu
        </Button>
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </Form>
  );
}
