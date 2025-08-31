import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
 
export const ModalWrapper = styled.div`
  background: #f9fafb;
  color:#1f2937 ;
  padding: 24px;
  border-radius: 12px;
  width: 500px;
  height: 100px;
  max-width: 90%;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.4);
  animation: slideDown 0.3s ease;

  @keyframes slideDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h2 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
`;

export const ModalBody = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;
export const ButtonLayout = styled.div`
display : flex;
gap : 8px;
align-items : center;
justify-content : center;
`
export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #f9fafb;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
