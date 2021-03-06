import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1 auto;
  background: #eee;
  padding: 20px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 25px;
  flex: 1 auto;
`;

export const ListLoading = styled.View`
  align-self: center;
  margin-top: 20px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#999',
})`
  margin: 30px 0;
`;
