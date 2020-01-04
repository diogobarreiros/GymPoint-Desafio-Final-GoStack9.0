import React, { useEffect, useState } from 'react';
import {
  MdAdd,
  MdSearch,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form, Input } from '@rocketseat/unform';

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

import { Search } from './styles';

export default function Students() {
  const dispatch = useDispatch();

  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(false);

  async function loadStudentList() {
    const pageLimit = 10;
    try {
      const response = await api.get('students', {
        params: { q: name, page, pageLimit },
      });
      setStudents(response.data.rows);
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
    loadStudentList();
  }, [name, page]); // eslint-disable-line

  async function handleDelete(id) {
    try {
      // eslint-disable-next-line no-alert
      const result = window.confirm('Deseja apagar este aluno?');
      if (result) {
        await api.delete(`students/${id}`);
        toast.success('Aluno excluído com sucesso');
        loadStudentList();
      }
    } catch (e) {
      toast.error('Aluno encontra-se com matrícula ativa');
    }
  }

  function handlePevPage() {
    if (page > 1) {
      setPage(page - 1);
      setNextDisable(false);
    }
  }
  function handleNextPage() {
    if (students.length === 10) {
      setPage(page + 1);
      setPrevDisable(false);
    }
  }

  return (
    <Container>
      <Header>
        <strong>Gerenciando alunos</strong>
        <div>
          <button type="button">
            <Link to="/students/create">
              <div>
                <MdAdd size={20} color="#FFF" />
              </div>
              CADASTRAR
            </Link>
          </button>
          <Form>
            <Search>
              <MdSearch size={16} color="#999" />
              <Input
                value={name}
                name="name"
                onChange={e => setName(e.target.value)}
                placeholder="Buscar aluno"
              />
            </Search>
          </Form>
        </div>
      </Header>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
              <Links>&nbsp;</Links>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td style={{ paddingLeft: '12px' }}>{student.age}</td>
                <Links>
                  <Link to={`/students/update/${student.id}`}>
                    <LinkEdit>editar</LinkEdit>
                  </Link>
                  <LinkRemove onClick={() => handleDelete(student.id)}>
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
