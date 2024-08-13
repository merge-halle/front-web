import React, { useState } from "react";
import { Input, Button } from "antd";
import "./TestProductReview.scss";
import { useMutation} from "@tanstack/react-query";

const { TextArea } = Input;

export default function TestProductReview() {
	const [useAI, setUseAI] = useState(false);

	const handleClick = () => {
		setUseAI(!useAI);
	};

  const getReview = async () => {

  }

	return (
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
        </div>
				
			)}
      <Button
						type="primary"
						onClick={handleClick}
						className="button"
					>
						리뷰 등록하기
					</Button>
		</div>
	);
}
