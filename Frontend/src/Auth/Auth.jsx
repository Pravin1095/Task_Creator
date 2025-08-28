import React, { useState } from "react";
import { PageContainer, Card, Title, Form, Heading,Input, Button, ToggleText, ToggleButton } from "./Auth.styles";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <PageContainer>
      <Card>
        <Title>Task Creator</Title>

        {isSignIn ? (
          <Form>
            <Heading>Sign In</Heading>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Button type="submit">Sign In</Button>
          </Form>
        ) : (
          <Form>
            <Heading>Sign Up</Heading>
            <Input type="text" placeholder="Full Name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Button type="submit">Sign Up</Button>
          </Form>
        )}

        <ToggleText>
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <ToggleButton onClick={() => setIsSignIn(!isSignIn)}>
            {isSignIn ? "Sign Up" : "Sign In"}
          </ToggleButton>
        </ToggleText>
      </Card>
    </PageContainer>
  );
}




