import React from "react";
import { BubbleCount, NotificationLayout } from "./NotificationBubble.styles";

const NotificationBubble = ({ borderColor,textColor,width, children}) => {
 // no bubble if count is 0

  return (
    // <BubbleContainer>
      <NotificationLayout><BubbleCount borderColor={borderColor} width={width} textColor={textColor}>{children}</BubbleCount></NotificationLayout>
    // </BubbleContainer>
  );
};

export default NotificationBubble;
