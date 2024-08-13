import React from "react";
import "./Mainpage.scss";
import { Input,Button } from 'antd';

const { TextArea } = Input;

export default function Mainpage() {
	return <div className="page">
    <h3>제품 설명</h3>
    <TextArea rows={10} />
    <Button type="primary" className="button">AI 요청</Button>
  </div>;
}
