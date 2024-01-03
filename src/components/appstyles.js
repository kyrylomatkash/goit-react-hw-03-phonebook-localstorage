import { styled } from '@mui/system';
import { Container, Typography, Button, Input } from '@mui/material';

export const AppContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Heading = styled(Typography)`
  font-size: 28px;
  margin-bottom: 20px;
`;

export const ErrorText = styled(Typography)`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const SearchInput = styled(Input)`
  && {
    margin-bottom: 15px;
    width: 200px;
  }
`;

export const AddButton = styled(Button)`
  && {
    margin-top: 15px;
    background-color: #4caf50;
    color: white;
    &:hover {
      background-color: #45a049;
    }
  }
`;
