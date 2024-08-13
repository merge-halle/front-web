import React from 'react';
import './ProductInfoInput.scss';
import { Input, Button } from 'antd';

const { TextArea } = Input;

export default function ProductInfoInput() {
  return (
    <div className="page">
      <h3>제품 설명</h3>
      <TextArea rows={10} />
      <Button type="primary" className="button">
        AI 요청
      </Button>
    </div>
  );
}
