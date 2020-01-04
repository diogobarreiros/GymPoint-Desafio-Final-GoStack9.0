import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import * as Yup from 'yup';

import {
  Container,
  Nav,
  FormInserts,
  NumbersDiv,
  StringDiv,
} from '~/styles/default';
import api from '~/services/api';
import { formatPrice } from '~/util/format';
import Mask from '~/components/InputMask';

import history from '~/services/history';

import { signOut } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  title: Yup.string().required('O titulo é obrigatório'),
  duration: Yup.number()
    .integer('somente numeros inteiros')
    .typeError('Valor inválido')
    .positive('não é permitido valores negativos')
    .required(),
  price: Yup.number()
    .typeError('Valor inválido')
    .required('Preço é obrigatório'),
});

export default function PlanCreate() {
  const dispatch = useDispatch();

  const [price, setPrice] = useState(null);
  const [duration, setDuration] = useState(null);
  const [totalPrice, setTotalPrice] = useState('');

  useEffect(() => {
    if (price && duration) {
      setTotalPrice(formatPrice(price * duration));
    }
  }, [price, duration]);

  async function handleSubmit(data) {
    try {
      await api.post('plans', {
        ...data,
      });
      toast.success('Aluno incluído com sucesso');
      history.push('/plans');
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
      <Form schema={schema} onSubmit={handleSubmit}>
        <Nav>
          <strong>Cadastro de plano</strong>
          <div>
            <div>
              <Link to="/plans">
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
                <strong>TÍTULO DO PLANO</strong>
                <Input name="title" placeholder="Diamond" />
              </div>
            </div>
          </StringDiv>

          <NumbersDiv>
            <div>
              <strong>DURAÇÃO (em meses)</strong>
              <Input
                name="duration"
                placeholder="0"
                onChange={e => setDuration(e.target.value)}
              />
            </div>

            <div>
              <strong>PREÇO MENSAL</strong>
              <Mask name="price" prefix="R$" setChange={e => setPrice(e)} />
            </div>

            <div>
              <strong>PREÇO TOTAL</strong>
              <Input
                type="text"
                name="totalPrice"
                readOnly
                className="readOnly"
                value={totalPrice}
              />
            </div>
          </NumbersDiv>
        </FormInserts>
      </Form>
    </Container>
  );
}
