import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Pages, Profile } from './styles';

import logoheader from '~/assets/logoheader.svg';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <div>
          <nav>
            <img src={logoheader} alt="GymPoint" />
          </nav>
          <Pages>
            <NavLink to="/students">ALUNOS</NavLink>
            <NavLink to="/plans">PLANOS</NavLink>
            <NavLink to="/enrollments">MATRÍCULAS</NavLink>
            <NavLink to="/helporders">PEDIDOS DE AUXÍLIO</NavLink>
          </Pages>
        </div>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button" onClick={handleSignOut}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
