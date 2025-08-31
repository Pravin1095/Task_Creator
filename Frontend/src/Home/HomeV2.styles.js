import { styled } from "styled-components";

/* Wrapper for input and button */
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 20px;
  padding: 20px;
  background: #1f2937;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
`;

export const FormWrapper = styled.form`
display : flex;
flex-direction : column;
justify-content : center;
align-items : center;

  gap: 12px;
  margin: 0 20px;
  padding: 20px;
  background: #1f2937;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
width : 50%;
`

/* Input field */
export const InputElement = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid #374151;
  background: #111827;
  color: #f9fafb;
  font-size: 15px;
  outline: none;
  transition: border 0.3s ease;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 5px rgba(99, 102, 241, 0.6);
  }
`;

/* Add Button */
export const AddButton = styled.button`
  width: 100%;
  height: 42px;
  font-family: "Motiva Sans", sans-serif;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #4f46e5, #4338ca);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

/* Tabs container */
export const Tab = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 20px 10px 0;
  background: #1f2937;
  padding: 10px;
  border-radius: 12px;
`;

/* Tab Button */
export const TabButton = styled.button`
  border: none;
  background: transparent;
  font-family: "Motiva Sans", sans-serif;
  font-size: 18px;
  font-weight: ${(props) => (props.isActive ? "700" : "500")};
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  color: ${(props) => (props.isActive ? "#6366f1" : "#d1d5db")};
  border-bottom: ${(props) =>
    props.isActive ? "2px solid #6366f1" : "2px solid transparent"};
  transition: all 0.3s ease;

  &:hover {
    background: #374151;
    color: #6366f1;
  }
`;

/* Body Layout */
export const BodyLayout = styled.div`
position : relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  & :first-child{
align-self: center;
justify-content : center;
  }
`;

/* Task Card */
export const CardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  margin : 0 10px;
  border: 1px solid #374151;
  border-radius: 16px;
  background: #1f2937;
  color: #f9fafb;
  font-size: 16px;
  font-family: "Motiva Sans", sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #facc15; /* Yellow accent */
`;

export const Description = styled.div`
  font-size: 14px;
  color: #d1d5db;
  line-height: 1.5;
`;

export const CheckBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #9ca3af;

  input {
    accent-color: #6366f1;
    transform: scale(1.2);
    cursor: pointer;
  }
`;

export const EditTitle = styled.h3`
  margin-left: 20px;
  text-align: left;
  color: #f87171; /* red accent for edit mode */
  font-size: 18px;
  font-weight: 600;
`;
