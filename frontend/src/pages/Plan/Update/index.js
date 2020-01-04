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

export default function PlanUpdate({ match }) {
  const dispatch = useDispatch();

  const { id } = match.params;
  const [price, setPrice] = useState(null);
  const [duration, setDuration] = useState(null);
  const [totalPrice, setTotalPrice] = useState('');
  const [plan, setPlan] = useState();

  useEffect(() => {
    if (price && duration) {
      setTotalPrice(formatPrice(price * duration));
    }
  }, [price, duration]);

  useEffect(() => {
    async function loadManagePlan() {
      try {
        const response = await api.get('plans', {
          params: { page: 1, pageLimit: 100 },
        });
        const data = response.data.rows.find(p => p.id === Number(id));
        setPlan(data);
        setPrice(data.price);
        setDuration(data.duration);
      } catch (e) {
        if (e.response.data.error === 'Token invalid') {
          dispatch(signOut());
        } else {
          toast.error(e.response.data.error);
        }
      }
    }
    loadManagePlan();
  }, [id]);// eslint-disable-line

  async function handleSubmit(data) {
    try {
      await api.put(`plans/${plan.id}`, {
        ...data,
      });
      toast.success('Plano alterado com sucesso');
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
      <Form schema={schema} initialData={plan} onSubmit={handleSubmit}>
        <Nav>
          <strong>Edição de plano</strong>
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
PlanUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
