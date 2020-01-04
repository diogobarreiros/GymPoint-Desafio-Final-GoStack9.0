import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import {
  Container,
  Nav,
  FormInserts,
  NumbersDiv,
  StringDiv,
} from '~/styles/default';
import api from '~/services/api';

import Mask from '~/components/InputMask';

import history from '~/services/history';

import { signOut } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .typeError('Valor inválido')
    .required(),
  weight: Yup.number('Somente valores numéricos')
    .typeError('Valor inválido')
    .required('O peso é obrigatório'),
  height: Yup.number('Somente valores numéricos')
    .typeError('Valor inválido')
    .required('A Altura é obrigatória'),
});

export default function StudentUpdate({ match }) {
  const dispatch = useDispatch();

  const { id } = match.params;
  const [student, setStudent] = useState({});

  useEffect(() => {
    async function loadManageStudent() {
      try {
        const response = await api.get(`students/${id}`);
        const { data } = response;
        setStudent({
          ...data,
        });
      } catch (e) {
        if (e.response.data.error === 'Token invalid') {
          dispatch(signOut());
        } else {
          toast.error(e.response.data.error);
        }
      }
    }
    loadManageStudent();
  }, [id]);// eslint-disable-line

  async function handleSubmit(data) {
    try {
      const { name, email, age, weight, height } = data;
      await api.put(`students/${student.id}`, {
        name,
        email,
        age,
        weight,
        height,
      });
      toast.success('Aluno alterado com sucesso');
      history.push('/students');
    } catch (e) {
      if (e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e.response.data.error);
      }
    }
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit} initialData={student}>
        <Nav>
          <strong>Edição de aluno</strong>
          <div>
            <div>
              <Link to="/students">
                <MdChevronLeft size={20} color="#FFF" />
                VOLTAR
              </Link>
            </div>
            <button type="submit">
              <MdCheck size={18} color="#FFF" />
              SALVAR
            </button>
          </div>
        </Nav>
        <FormInserts>
          <StringDiv>
            <div>
              <div>
                <strong>NOME COMPLETO</strong>
                <Input name="name" placeholder="John Doe" />
              </div>

              <div>
                <strong>ENDEREÇO DE E-MAIL</strong>
                <Input
                  name="email"
                  type="email"
                  placeholder="exemplo@dominio.com"
                />
              </div>
            </div>
          </StringDiv>

          <NumbersDiv>
            <div>
              <strong>IDADE</strong>
              <Input type="number" name="age" />
            </div>

            <div>
              <strong>PESO (em kg)</strong>
              <Mask name="weight" suffix="kg" />
            </div>

            <div>
              <strong>ALTURA</strong>
              <Mask name="height" suffix="m" />
            </div>
          </NumbersDiv>
        </FormInserts>
      </Form>
    </Container>
  );
}

StudentUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
