import React, { useEffect, useState } from 'react';
import {
  MdAdd,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdCheckCircle,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

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

export default function Enrollments() {
  const dispatch = useDispatch();

  const [enrollments, setEnrollments] = useState([]);
  const [page, setPage] = useState(1);
  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(false);

  async function loadEnrollment() {
    const pageLimit = 10;
    try {
      const response = await api.get('enrollments', {
        params: { page, pageLimit },
      });
      if (page === 1) {
        setPrevDisable(true);
      }
      if (
        response.data.count <= pageLimit ||
        page >= response.data.count / pageLimit
      ) {
        setNextDisable(true);
      }
      const data = response.data.rows.map(enrollment => ({
        ...enrollment,
        startDateFormatted: format(
          parseISO(enrollment.start_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        endDateFormatted: format(
          parseISO(enrollment.end_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
      }));
      setEnrollments(data);
    } catch (e) {
      if (e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e.response.data.error);
      }
    }
  }

  useEffect(() => {
    loadEnrollment();
  }, [page]); // eslint-disable-line

  async function handleDelete(id) {
    try {
      // eslint-disable-next-line no-alert
      const result = window.confirm('Deseja apagar esta matrícula?');
      if (result) {
        await api.delete(`enrollments/${id}`);
        toast.success('Matrícula excluída com sucesso');
        loadEnrollment();
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
    if (enrollments.length === 10) {
      setPage(page + 1);
      setPrevDisable(false);
    }
  }

  return (
    <Container>
      <Header>
        <strong>Gerenciando matrículas</strong>
        <div>
          <button type="button">
            <Link to="/enrollments/create">
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
              <th>ALUNO</th>
              <th style={{ textAlign: 'center' }}>PLANO</th>
              <th style={{ textAlign: 'center' }}>INÍCIO</th>
              <th style={{ textAlign: 'center' }}>TÉRMINO</th>
              <th style={{ textAlign: 'center' }}>ATIVA</th>
              <Links style={{ textAlign: 'center' }}>&nbsp;</Links>
            </tr>
          </thead>
          <tbody>
            {enrollments.map(enrollment => (
              <tr key={enrollment.id}>
                <td>{enrollment.student.name}</td>
                <td style={{ textAlign: 'center' }}>{enrollment.plan.title}</td>
                <td style={{ textAlign: 'center' }}>
                  {enrollment.startDateFormatted}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {enrollment.endDateFormatted}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {enrollment.active ? (
                    <MdCheckCircle size={20} color="#42cb59" />
                  ) : (
                    <MdCheckCircle size={20} color="#dddddd" />
                  )}
                </td>
                <Links style={{ textAlign: 'center' }}>
                  <Link to={`/enrollments/update/${enrollment.id}`}>
                    <LinkEdit>editar</LinkEdit>
                  </Link>
                  <LinkRemove onClick={() => handleDelete(enrollment.id)}>
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
