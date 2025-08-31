import styled from "styled-components";

export const NotificationLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const BubbleCount = styled.span`
  
  color: ${(props)=>props.textColor};
  width : ${(props)=>props.width ?? ''};
  font-size: 18px;
  font-weight: bold;
  min-width: 20px;
  height: 20px;
  padding: 10px 6px;
  border : 3px solid #c00;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
`;
