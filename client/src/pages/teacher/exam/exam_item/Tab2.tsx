import React, { useState } from "react";
import { Upload, message, Radio, Button, Input, DatePicker, Select, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import baseUrl from "../../../../apis/axios";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface Question {
  question: string;
  answers: string[];
}

const ExcelUpload: React.FC = () => {
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      const formattedQuestions: Question[] = jsonData.map((row) => ({
        question: row[0],
        answers: row.slice(1),
      }));

      setQuestions(formattedQuestions);
    };

    reader.onerror = (error) => {
      message.error(`Không thể đọc file: ${error}`);
    };

    reader.readAsArrayBuffer(file);
    return false;
  };

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = async () => {
    if (!quizTitle || !dateRange || !selectedClass) {
      message.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const formattedQuestions = questions.map((question, index) => ({
      text: question.question,
      answers: question.answers.map(answer => ({
        answer,
        isCorrect: selectedAnswers[index] === answer,
      })),
    }));

    const quizData = {
      quizDto: {
        title: quizTitle,
        start_time: dateRange[0].toISOString(),
        end_time: dateRange[1].toISOString(),
        classroom: selectedClass,
      },
      questionDto: formattedQuestions,
    };

    console.log(quizData);
    
    try {
      await baseUrl.post('/quiz/create', quizData);
      message.success('Questions and answers submitted successfully!');
    } catch (error) {
      message.error('Failed to submit questions and answers');
      console.error(error);
    }
  };

  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Tên bài thi">
          <Input value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} />
        </Form.Item>
        <Form.Item label="Ngày bắt đầu và kết thúc">
          <RangePicker showTime onChange={(dates) => setDateRange(dates)} />
        </Form.Item>
        <Form.Item label="Chọn lớp">
          <Select placeholder="Chọn lớp" onChange={(value) => setSelectedClass(value)}>
            <Option value="157153e5-ccb5-4f36-a3f4-7c6b44354bd4">Lớp 1</Option>
            <Option value="class2">Lớp 2</Option>
            <Option value="class3">Lớp 3</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Tải file Excel">
          <Upload beforeUpload={handleFileUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>
              Tải file có đuôi .xlsx và .xls
            </Button>
          </Upload>
        </Form.Item>
      </Form>

      <div className="bg-amber-50 p-2">
        {questions.length > 0 && (
          <div>
            {questions.map((question, questionIndex) => (
              <div key={questionIndex} style={{ marginBottom: "20px" }}>
                <p>Câu hỏi: {question.question}</p>
                <Radio.Group
                  onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}
                  value={selectedAnswers[questionIndex]}
                >
                  {question.answers.map((answer, answerIndex) => (
                    <Radio key={answerIndex} value={answer}>
                      {answer}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
            ))}
          </div>
        )}
      </div>
      <Button type="primary" onClick={handleSubmit}>
        Tạo đề thi
      </Button>
    </div>
  );
};

export default ExcelUpload;
