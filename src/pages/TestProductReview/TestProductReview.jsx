import React, { useState } from "react";
import { Input, Button } from "antd";
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

	const handleClick = () => {
		setUseAI(!useAI);
	};

	// 리뷰 생성 클릭
	const handleReview = () => {
		// getReviewMutation.mutate();
		setIsLoading(true);
	};

  const handleInputChange = (field, value) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

	// api
	const getReview = async () => {
		const reviewData = { ...fieldValues };
		const response = await axios.post(`${baseUrl}/`, reviewData);
		return response;
	};

	// api Mutation
	const getReviewMutation = useMutation({
		mutationFn: getReview,
		onSuccess: (response) => {
			// 로딩 끝
			setIsLoading(false);
			// textarea 로 이동
			setUseAI(false);
			// 응답 메세지 textarea에 넣기
			// setReviewText(response.reviewText);
		},
		onError: (error) => {
			console.error("sign up failed", error);
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
				{useAI ? (
					<div>
						<Button
							type="primary"
							onClick={handleClick}
							className="button"
						>
							AI 없이 리뷰 작성하기
						</Button>
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
						<Button
							type="primary"
							onClick={handleClick}
							className="button"
						>
							AI 사용해서 리뷰 작성하기
						</Button>
						<TextArea
							rows={10}
							value={reviewText} // TextArea의 value로 reviewText 상태를 사용
							onChange={(e) => setReviewText(e.target.value)} // 사용자가 직접 입력할 수 있도록 onChange 핸들러 추가
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
