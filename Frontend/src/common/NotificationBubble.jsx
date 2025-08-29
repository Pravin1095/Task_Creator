import React from "react";
import { BubbleContainer, BubbleCount } from "./NotificationBubble.styles";

const NotificationBubble = ({ children}) => {
 // no bubble if count is 0

  return (
    // <BubbleContainer>
      <BubbleCount>{children}</BubbleCount>
    // </BubbleContainer>
  );
};

export default NotificationBubble;
