import React, { useEffect, useState } from 'react';
import { Input, Button, message, Switch } from 'antd';
import './TestProductReview.scss';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import { useLocation } from 'react-router-dom';
const { TextArea } = Input;

export default function TestProductReview() {
  const location = useLocation();
  const { questionId } = location.state;
  const [useAI, setUseAI] = useState(false);
  const [fields, setFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewText, setReviewText] = useState(''); // 리뷰 텍스트를 관리하는 상태

  // 각 필드의 값을 상태로 관리하는 배열
  const [fieldValues, setFieldValues] = useState(
    fields.reduce(
      (acc, field) => ({ ...acc, [field]: '' }),
      {}
    )
  );

  const handleSwitchChange = (checked) => {
    setUseAI(checked);
  };

  const handleInputChange = (field, value) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  // 리뷰 리스트 받아오기
  useEffect(() => {
    // 비동기 함수를 정의
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://betatest.p-e.kr/api/question/${questionId}`
        );

        if (response.status === 200) {
          console.log('서버 응답:', response.data); // response.data에서 questionList를 추출하고 비어 있는 문자열 필터링
          const questionList =
            response.data?.questionList || [];
          const filteredQuestionList = questionList.filter(
            (q) => q.trim() !== ''
          ); // 비어 있는 문자열 필터링
          setFields(filteredQuestionList);
        }
      } catch (error) {
        console.error('서버 요청 에러:', error); // 요청 중 에러 발생 시 콘솔에 에러 출력
        message.error('서버 요청 중 오류가 발생했습니다.'); // 요청 실패 메시지 표시
      }
    };
    // 비동기 함수를 호출
    fetchData();
  }, [questionId]); // dependency array에 questionId 추가

  // 리뷰 생성 API 호출 함수
  const makeReview = async () => {
    setIsLoading(true);
    try {
      // 질문과 답변을 포함한 body를 준비
      const questions = fields; // 서버에서 받은 질문 목록
      const answers = Object.values(fieldValues); // 각 필드에 대한 답변
      console.log('questions:', questions);
      console.log('answers:', answers);
      const response = await axios.post(
        `https://betatest.p-e.kr/api/review/${questionId}`,
        {
          questions: questions,
          answers: answers,
        }
      );

      if (response.status === 201) {
        console.log('서버 응답:', response.data);
        setReviewText(response.data.review);
        message.success('리뷰 생성 완료!');
        setUseAI(false);
      }
    } catch (error) {
      console.error('리뷰 작성 오류', error);
      message.error('리뷰 작성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && useAI && (
        <>
          <div className="overlay"></div>
          <Loading text={'리뷰를 생성중입니다'} />
        </>
      )}
      <div className="page">
        <div style={{ margin: 10 }}>
          <Switch
            checked={useAI}
            onChange={handleSwitchChange}
          />
          <span style={{ marginLeft: 8 }}>AI 사용</span>
        </div>
        {useAI ? (
          <div>
            {fields.map((field) => (
              <div key={field}>
                <h3>{field}</h3>
                <Input
                  placeholder={`${field}에 대해 입력해주세요.`}
                  value={fieldValues[field]}
                  onChange={(e) =>
                    handleInputChange(field, e.target.value)
                  }
                />
              </div>
            ))}
            <div className="pos-center">
              <Button
                type="primary"
                onClick={makeReview}
                className="button"
              >
                리뷰 생성
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <TextArea
              rows={10}
              value={reviewText}
              onChange={(e) =>
                setReviewText(e.target.value)
              }
            />
            <div className="pos-center">
              <Button type="primary" className="button">
                리뷰 등록하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
