import styled from 'styled-components';
import Button from '@mui/material/Button';
export const ContactListContainer = styled.div`
  margin-top: 20px;
`;

export const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const StyledListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const EditButton = styled(Button)`
  margin-right: 8px;
`;

export const DeleteButton = styled(Button)`
  background-color: #ff6666;
`;
