import React from 'react'
import { Input,Button } from 'antd';
import './TestProductReview.scss'
const { TextArea } = Input;

export default function TestProductReview() {
  


  return (
    <div className='page'>
      <h3>사이즈 및 핏</h3>
      <Input placeholder="사이즈 및 핏에 대해 입력해주세요." />
      <h3>품질 및 내구성</h3>
      <Input placeholder="품질 및 내구성에 대해 입력해주세요." />
      <h3>가성비</h3>
      <Input placeholder="가성비에 대해 입력해주세요." />
      <h3>재구매 의사</h3>
      <Input placeholder="재구매 의사에 대해 입력해주세요." />
      <Button type="primary" className="button">AI로 댓글 완성하기</Button>

      <TextArea rows={10} />

    </div>
  )
}
