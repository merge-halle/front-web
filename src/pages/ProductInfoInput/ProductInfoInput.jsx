import React, { useState } from 'react';
import './ProductInfoInput.scss';
import { Input, Button, Modal, message } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

export default function ProductInfoInput() {
  const [productInfo, setProductInfo] = useState(''); // TextArea 값을 담을 state
  const [previewData, setPreviewData] = useState([
    '디자인',
    '품질',
  ]); // 서버에서 받은 데이터를 저장할 state
  const [isPreviewAvailable, setIsPreviewAvailable] =
    useState(false); // 미리보기 버튼 가시성 제어
  const [isModalVisible, setIsModalVisible] =
    useState(false); // 모달의 가시성 제어

  const handleTextChange = (e) => {
    setProductInfo(e.target.value); // TextArea의 값이 변경될 때 state 업데이트
  };

  const handleSubmit = async () => {
    try {
      // const response = await axios.post(
      //   'https://your-server-endpoint.com/api',
      //   {
      //     productInfo, // 서버로 보낼 데이터
      //   }
      // );
      message.success('AI 요청 완료!'); // 요청 성공 시 메시지 출력
      // 서버에서 받은 데이터를 배열로 저장
      //setPreviewData(response.data);
      // 서버 응답이 성공적이면 미리보기 버튼 보이도록 설정
      setIsPreviewAvailable(true);
    } catch (error) {
      console.error('서버 요청 에러:', error); // 요청 중 에러 발생 시 콘솔에 에러 출력
    }
  };

  const handlePreview = () => {
    setIsModalVisible(true); // 미리보기 버튼 클릭 시 모달을 보여줌
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // 모달 닫기
  };

  return (
    <div className="page">
      <h3>제품 설명</h3>
      <TextArea
        rows={10}
        value={productInfo}
        onChange={handleTextChange}
      />
      <div className="buttons">
        <Button
          type="primary"
          className="button"
          onClick={handleSubmit}
        >
          AI 요청
        </Button>
        {isPreviewAvailable && (
          <Button
            type="default"
            className="button"
            onClick={handlePreview}
          >
            미리보기
          </Button>
        )}
      </div>
      <Modal
        title={
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: 40,
            }}
          >
            미리보기
          </h2>
        }
        visible={isModalVisible}
        onCancel={handleModalClose}
        closable={false} // X 버튼을 제거하려면 이 속성을 추가
        footer={[
          <Button key="close" onClick={handleModalClose}>
            닫기
          </Button>,
        ]}
      >
        {previewData.map((item, index) => (
          <div key={index} className="preview-item">
            <p className="pre-title">{item}</p>
            <Input className="pre-input" />
          </div>
        ))}
      </Modal>
    </div>
  );
}
