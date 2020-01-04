import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Popup from 'reactjs-popup';

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

import * as Yup from 'yup';
import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';

import { Pagination } from '~/styles/default';
import {
  Container,
  Cover,
  Header,
  Content,
  ModalContainer,
  ModalForm,
  AnswerSize,
  ModalInput,
} from './styles';

const schema = Yup.object().shape({
  answer: Yup.string()
    .max(255, 'Número de caracteres excedido')
    .required('Resposta é obrigatória'),
});

export default function Suport() {
  const dispatch = useDispatch();

  const [helpOrder, setHelpOrder] = useState([]);
  const [modalHelpOrder, setModalHelpOrder] = useState();
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);
  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(false);

  const [answer, setAnswer] = useState('');

  const answerSize = useMemo(() => {
    return 255 - answer.length;
  }, [answer]);

  async function loadSuport() {
    const pageLimit = 10;
    try {
      const response = await api.get('/students/help-orders/all', {
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
      setHelpOrder(response.data.rows);
    } catch (e) {
      if (e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e.response.data.error);
      }
    }
  }

  useEffect(() => {
    loadSuport();
  }, [page]); // eslint-disable-line

  function handleHelpOrder(suport) {
    setModalHelpOrder(suport);
    setShowModal(true);
  }

  async function handleSubmit(data) {
    try {
      const { id } = modalHelpOrder;

      await api.post(`/help-orders/${id}/answer`, {
        ...data,
      });
      toast.success(`Resposta enviada com sucesso`);
      setShowModal(false);
      loadSuport();
    } catch (error) {
      toast.error(`error: ${error}`);
    }
  }

  function handlePevPage() {
    if (page > 1) {
      setPage(page - 1);
      setNextDisable(false);
    }
  }
  function handleNextPage() {
    if (helpOrder.length === 10) {
      setPage(page + 1);
      setPrevDisable(false);
    }
  }
  if (helpOrder.length === 0 && page === 1) {
    return (
      <Container>
        <Cover>
          <Header>
            <h1>Pedidos de auxílio</h1>
          </Header>
          <Content>
            <div>
              <span>Sem pedidos de auxílio a serem respondidos no momento</span>
            </div>
          </Content>
        </Cover>
      </Container>
    );
  }

  return (
    <Container>
      <Cover>
        <Header>
          <h1>Pedidos de auxílio</h1>
        </Header>
        <Content>
          <table>
            <thead>
              <tr>
                <td>ALUNO</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {helpOrder.map(suport => (
                <tr key={suport.id}>
                  <td>{suport.student.name}</td>
                  <td>
                    <button
                      className="orderResponse"
                      type="button"
                      onClick={() => handleHelpOrder(suport)}
                    >
                      responder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      </Cover>

      <Popup open={showModal} onClose={() => setShowModal(false)}>
        <ModalContainer>
          <ModalForm
            initialData={modalHelpOrder}
            schema={schema}
            onSubmit={handleSubmit}
          >
            <strong>PERGUNTA DO ALUNO:</strong>
            <ModalInput
              multiline
              name="question"
              readOnly
              onChange={e => setAnswer(e.target.value)}
            />

            <strong>SUA RESPOSTA</strong>
            <ModalInput
              multiline
              name="answer"
              onChange={e => setAnswer(e.target.value)}
              placeholder="Escreva aqui sua resposta..."
            />
            <AnswerSize limit={answerSize < 0}>{answerSize}/255</AnswerSize>

            <button type="submit">Responder aluno</button>
          </ModalForm>
        </ModalContainer>
      </Popup>
    </Container>
  );
}
