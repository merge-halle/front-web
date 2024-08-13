import React from "react";
import "./TestProductDetail.scss";

export default function TestProductDetail() {
	return (
		<div className="container">
			<div className="header-left">제품 관련 썸네일</div>
			<div className="header-right">제품 신청하기</div>
			<div className="content">
                <pre>
                제품명 : 
                제품설명 : 
                제품카테고리 : 
                제품가격 : 
                제품이미지 :
				제품설명이미지(ex, 쿠팡과 같은 상거래 제품 설명) :
				제품테스트종류 : (선착순, 수락 및 거부) 원하는테스터종류 :
				(10대, 남성, 학생, 등..)
                </pre>
				
			</div>
		</div>
	);
}
