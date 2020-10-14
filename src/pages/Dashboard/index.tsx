import React, {useCallback, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useAuth} from '../../hooks/Auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  ProviderInfo,
  ProviderMeta,
  ProviderMetaText,
  ProvidersListTitle,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const {user} = useAuth();
  const {navigate} = useNavigation();

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  const navigateToCreateAppointment = useCallback(
    (providerId) => {
      navigate('CreateAppointment', {providerId});
    },
    [navigate],
  );

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{uri: user.avatar_url}} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={(provider) => provider.id}
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleleiros</ProvidersListTitle>
        }
        renderItem={({item: provider}) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}>
            <ProviderAvatar source={{uri: provider.avatar_url}} />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>8h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;