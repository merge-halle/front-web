import React, { useState } from 'react';
import { Input, Button } from 'antd';
import './TestProductReview.scss';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';

const { TextArea } = Input;

export default function TestProductReview() {
  const [useAI, setUseAI] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleClick = () => {
    setUseAI(!useAI);
  };

  // ai로 리뷰 받아오기
  const handleReview = () => {
    // getReviewMutation.mutate();
    setIsLoading(true);
  };

  // api
  const getReview = async () => {
    const response = await axios.post(`${baseUrl}/`, {});
    return response;
  };

  // api Mutation
  const getReviewMutation = useMutation({
    mutationFn: getReview,
    onSuccess: (response) => {
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('sign up failed', error);
    },
  });

  return (
    <>
      {isLoading && useAI && (
        <>
          <div className="overlay"></div>
          <Loading text={'리뷰를 생성중입니다'} />
        </>
      )}
      <div className="page">
        {useAI ? (
          <div>
            <Button
              type="primary"
              onClick={handleClick}
              className="button"
            >
              AI 없이 리뷰 작성하기
            </Button>
            <h3>사이즈 및 핏</h3>
            <Input placeholder="사이즈 및 핏에 대해 입력해주세요." />
            <h3>품질 및 내구성</h3>
            <Input placeholder="품질 및 내구성에 대해 입력해주세요." />
            <h3>가성비</h3>
            <Input placeholder="가성비에 대해 입력해주세요." />
            <h3>재구매 의사</h3>
            <Input placeholder="재구매 의사에 대해 입력해주세요." />
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
            <Button
              type="primary"
              onClick={handleClick}
              className="button"
            >
              AI 사용해서 리뷰 작성하기
            </Button>
            <TextArea rows={10} />
            <Button type="primary" className="button">
              리뷰 등록하기
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
