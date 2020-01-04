/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import * as Yup from 'yup';

import {
  format,
  addMonths,
  setHours,
  setMinutes,
  setSeconds,
  endOfSecond,
} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { FormInserts, Nav, InputFields } from '~/styles/default';
import { Container } from '../styles';
import api from '~/services/api';
import { formatPrice } from '~/util/format';

import InputAsyncSelect from '~/components/InputAsyncSelect';
import DatePicker from '~/components/InputDatePicker';
import ReactSelect from '~/components/InputSelect';

import history from '~/services/history';

import { signOut } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  student: Yup.object()
    .shape({
      value: Yup.number().integer(),
    })
    .typeError('Valor inválido')
    .required('Aluno obrigatório'),
  plan: Yup.object()
    .shape({
      value: Yup.number().integer(),
    })
    .typeError('Valor inválido')
    .required('Plano obrigatório'),
  start_date: Yup.date()
    .typeError('Valor inválido')
    .required('Data obrigatória'),
});

export default function EnrollmentCreate() {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date());
  const [plans, setPlans] = useState({});
  const [plan, setPlan] = useState({});
  const [initialData, setInitialData] = useState({});

  async function loadPlans() {
    try {
      const response = await api
        .get('plans', {
          params: { page: 1, pageLimit: 100 },
        })
        .then(r => r.data.rows)
        .then(d =>
          d.map(p => ({
            label: p.title,
            value: p.id,
            duration: p.duration,
            price: p.price,
          }))
        );

      setPlans(response);
    } catch (e) {
      if (e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e.response.data.error);
      }
    }
  }

  const end_date = useMemo(() => {
    if (!plan.duration) {
      return '';
    }
    const { duration } = plan;
    const formattedDate = format(
      addMonths(startDate, duration),
      "dd'/'MM'/'yyyy",
      {
        locale: pt,
      }
    );
    return formattedDate;
  }, [plan, startDate]);

  const totalPrice = useMemo(() => {
    if (!plan.price) return '';

    return formatPrice(Number(plan.duration) * Number(plan.price));
  }, [plan.duration, plan.price]);

  useEffect(() => {
    loadPlans();

    setInitialData({
      end_date,
      totalPrice,
    });
  }, [end_date, startDate, totalPrice]);// eslint-disable-line

  async function handleSubmit(data) {
    try {
      const dateNow = new Date();

      const dateNowComp = `${dateNow.getDate()}/${dateNow.getMonth() +
        1}/${dateNow.getFullYear()}`;
      const dateFormComp = `${data.start_date.getDate()}/${data.start_date.getMonth() +
        1}/${data.start_date.getFullYear()}`;
      let startDateNow;

      if (dateNowComp === dateFormComp) {
        startDateNow = endOfSecond(
          setSeconds(
            setMinutes(
              setHours(data.start_date, dateNow.getHours()),
              dateNow.getMinutes()
            ),
            dateNow.getSeconds()
          )
        );
      } else {
        startDateNow = data.start_date;
      }

      await api.post('enrollments', {
        student_id: data.student.value,
        plan_id: data.plan.value,
        start_date: startDateNow,
      });
      toast.success('Matrícula incluída com sucesso');
      history.push('/enrollments');
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  async function loadOptions(inputValue) {
    const response = await api
      .get('students', {
        params: { name: `${inputValue}`, page: 1, pageLimit: 100 },
      })
      .then(r => r.data.rows)
      .then(r =>
        r.map(student => ({
          label: student.name,
          value: student.id,
        }))
      );
    return response;
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit} initialData={initialData}>
        <Nav>
          <strong>Cadastro de matrícula</strong>
          <div>
            <div>
              <Link to="/enrollments">
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
          <InputAsyncSelect
            name="student"
            loadOptions={loadOptions}
            label="ALUNO"
          />

          <InputFields>
            <div className="formline">
              <label>
                <strong>PLANO</strong>
                <ReactSelect name="plan" options={plans} setChange={setPlan} />
              </label>
              <label>
                <strong>DATA DE INÍCIO</strong>
                <DatePicker name="start_date" setChange={setStartDate} />
              </label>
              <label>
                <strong>DATA DE TÉRMINO</strong>
                <Input name="end_date" readOnly className="readOnly" />
              </label>
              <label>
                <strong>VALOR FINAL</strong>
                <Input name="totalPrice" readOnly className="readOnly" />
              </label>
            </div>
          </InputFields>
        </FormInserts>
      </Form>
    </Container>
  );
}
