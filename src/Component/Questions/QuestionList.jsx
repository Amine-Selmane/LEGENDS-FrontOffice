import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Banner from '../../Component/Banner/Banner';
import Preloader from '../Preloader';
import CallAction from '../../Component/CallAction';
import Footer from '../../Component/Footer/Footer';
import GotoTop from '../../Component/GotoTop';
import Home3Header from "../../Component/Headers/Home3Header";

const baseURL = 'http://localhost:5000';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${baseURL}/questions/getAllQuestions`);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
    setIsLoading(false);

  }, []);

  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(`${baseURL}/questions/deleteQuestion/${questionId}`);
      setQuestions(questions.filter(question => question._id !== questionId));
      message.success('Question deleted successfully!');
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const columns = [
    {
      title: 'Content',
      dataIndex: 'content',
      width: '27%',
      key: 'content',
    },
    {
      title: 'Options',
      dataIndex: 'options',
      key: 'options',
      render: (options) => options.join(', '),
    },
    {
      title: 'Correct Option Index',
      dataIndex: 'correctOptionIndex',
      width: '20%',
      key: 'correctOptionIndex',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Link to={`/question/update/${record._id}`} style={{ marginRight: 8 }}>
            <Button type="primary" icon={<EditOutlined />} />
          </Link>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDeleteQuestion(record._id)}
          >
            <Button type="danger" icon={<DeleteOutlined />} style={{ backgroundColor: 'red', color: 'white', width: 40 }} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Home3Header />
      <Banner title="List Of Questions" background="assets/images/banner.jpg" />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <div style={{ marginTop: '30px' }}> {/* Ajouter une marge supérieure */}
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
              <Link to="/question/new">
                <Button type="primary">New Question</Button>
              </Link>
            </div>
            <Table dataSource={questions} columns={columns} rowKey="_id" />
          </div>
          <Footer />
          <GotoTop />
        </>
      )}
    </div>
  );
};

export default QuestionList;
