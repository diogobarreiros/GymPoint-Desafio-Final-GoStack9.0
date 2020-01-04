import React, { useEffect, useState } from 'react';
import {
  MdAdd,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { formatPrice } from '~/util/format';
import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  Header,
  Content,
  Table,
  LinkRemove,
  LinkEdit,
  Links,
  Pagination,
} from '~/styles/default';

export default function Plans() {
  const dispatch = useDispatch();

  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(false);

  async function loadPlanList() {
    const pageLimit = 10;
    try {
      const response = await api.get('plans', {
        params: { page, pageLimit },
      });
      const data = response.data.rows.map(plan => ({
        ...plan,
        durationFormatted:
          plan.duration === 1
            ? `${plan.duration} mês`
            : `${plan.duration} meses`,
        priceFormatted: formatPrice(plan.price),
      }));
      setPlans(data);

      if (page === 1) {
        setPrevDisable(true);
      }
      if (
        response.data.count <= pageLimit ||
        page >= response.data.count / pageLimit
      ) {
        setNextDisable(true);
      }
    } catch (e) {
      if (e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e.response.data.error);
      }
    }
  }

  useEffect(() => {
    loadPlanList();
  }, [page]); // eslint-disable-line

  async function handleDelete(id) {
    try {
      // eslint-disable-next-line no-alert
      const result = window.confirm('Deseja apagar este plano?');
      if (result) {
        await api.delete(`plans/${id}`);
        toast.success('Plano excluído com sucesso');
        loadPlanList();
      }
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  function handlePevPage() {
    if (page > 1) {
      setPage(page - 1);
      setNextDisable(false);
    }
  }
  function handleNextPage() {
    if (plans.length === 10) {
      setPage(page + 1);
      setPrevDisable(false);
    }
  }

  return (
    <Container>
      <Header>
        <strong>Gerenciando planos</strong>
        <div>
          <button type="button">
            <Link to="/plans/create">
              <div>
                <MdAdd size={20} color="#FFF" />
              </div>
              CADASTRAR
            </Link>
          </button>
        </div>
      </Header>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th style={{ textAlign: 'center' }}>DURAÇÃO</th>
              <th style={{ textAlign: 'center' }}>VALOR p/ MÊS</th>
              <Links>&nbsp;</Links>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td style={{ textAlign: 'center' }}>
                  {plan.durationFormatted}
                </td>
                <td style={{ textAlign: 'center' }}>{plan.priceFormatted}</td>
                <Links>
                  <Link to={`/plans/update/${plan.id}`}>
                    <LinkEdit>editar</LinkEdit>
                  </Link>
                  <LinkRemove onClick={() => handleDelete(plan.id)}>
                    apagar
                  </LinkRemove>
                </Links>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
      <Pagination>
        <button
          type="button"
          className={prevDisable ? 'pageDisable' : ''}
          onClick={() => handlePevPage()}
        >
          <MdKeyboardArrowLeft
            size={30}
            color={prevDisable ? '#BBB' : '#EE4D64'}
          />
        </button>
        <button
          type="button"
          className={nextDisable ? 'pageDisable' : ''}
          onClick={() => handleNextPage()}
        >
          <MdKeyboardArrowRight
            size={30}
            color={nextDisable ? '#BBB' : '#EE4D64'}
          />
        </button>
      </Pagination>
    </Container>
  );
}
