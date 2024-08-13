import React, { useState } from "react";
import { Input, Button, message, Switch } from "antd";
import "./TestProductReview.scss";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Loading/Loading";

const { TextArea } = Input;

export default function TestProductReview() {
  const [useAI, setUseAI] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewText, setReviewText] = useState(""); // 리뷰 텍스트를 관리하는 상태
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  // Input 필드의 이름을 저장하는 배열
  const fields = ["사이즈 및 핏", "품질 및 내구성", "가성비", "재구매 의사"];

  // 각 필드의 값을 상태로 관리하는 배열
  const [fieldValues, setFieldValues] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {})
  );

  const handleSwitchChange = (checked) => {
    setUseAI(checked);
  };

  // 리뷰 생성 클릭
  const handleReview = () => {
    setIsLoading(true);
    // getReviewMutation.mutate(); // API 호출 시작
  };

  const handleInputChange = (field, value) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  // API 호출 함수
  const getReview = async () => {
    const reviewData = { ...fieldValues };
    const response = await axios.post(`${baseUrl}/`, reviewData);
    return response.data;
  };

  // API Mutation
  const getReviewMutation = useMutation({
    mutationFn: getReview,
    onSuccess: (response) => {
      setIsLoading(false);
      message.success('리뷰 생성 완료!');
      setUseAI(false);
      // setReviewText(response.reviewText); // 응답 메세지를 textarea에 넣기
    },
    onError: (error) => {
      console.error("Review generation failed", error);
      setIsLoading(false);
    },
  });

  return (
    <>
      {isLoading && useAI && (
        <>
          <div className="overlay"></div>
          <Loading text={"리뷰를 생성중입니다"} />
        </>
      )}
      <div className="page">
        <div style={{ margin: 10 }}>
          
          <Switch checked={useAI} onChange={handleSwitchChange} />
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
                  onChange={(e) => handleInputChange(field, e.target.value)}
                />
              </div>
            ))}
            <Button
              type="primary"
              onClick={handleReview}
              className="button"
            >
              리뷰 생성
            </Button>
          </div>
        ) : (
          <div>
            <TextArea
              rows={10}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <Button type="primary" className="button">
              리뷰 등록하기
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
