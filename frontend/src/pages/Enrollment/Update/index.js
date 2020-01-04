/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import {
  format,
  addMonths,
  setHours,
  setMinutes,
  setSeconds,
  endOfSecond,
  parseISO,
  startOfDay,
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

export default function EnrollmentUpdate({ match }) {
  const dispatch = useDispatch();

  const { id } = match.params;

  const [startDate, setStartDate] = useState();
  const [newDate, setNewDate] = useState();

  const [plans, setPlans] = useState({});
  const [plan, setPlan] = useState({});

  const [oldStudent, setOldStudent] = useState({});

  useEffect(() => {
    async function loadManageEnrollment() {
      try {
        const enrollment = await api
          .get('enrollments', {
            params: { page: 1, pageLimit: 100 },
          })
          .then(r => r.data.rows)
          .then(d => d.filter(e => e.id === Number(id)));

        setStartDate(parseISO(enrollment[0].start_date));
        setNewDate(parseISO(enrollment[0].start_date));
        setOldStudent({
          label: enrollment[0].student.name,
          value: enrollment[0].student.id,
        });

        const loadPlans = await api
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

        if (enrollment[0].plan) {
          const defaultPlan = loadPlans.filter(
            p => p.value === enrollment[0].plan.id
          );
          setPlan(defaultPlan[0]);
        }

        setPlans(loadPlans);
      } catch (e) {
        if (e.response.data.error === 'Token invalid') {
          dispatch(signOut());
        } else {
          toast.error(e.response.data.error);
        }
      }
    }

    loadManageEnrollment();
  }, [id]);// eslint-disable-line

  const end_date = useMemo(() => {
    if (!plan.duration) {
      return '';
    }

    const start_date = newDate || startDate;

    const { duration } = plan;
    const formattedDate = format(
      addMonths(start_date, duration),
      "dd'/'MM'/'yyyy",
      {
        locale: pt,
      }
    );
    return formattedDate;
  }, [newDate, plan, startDate]);

  const totalPrice = useMemo(() => {
    if (!plan.price) return '';
    return formatPrice(Number(plan.duration) * Number(plan.price));
  }, [plan]);

  const initialData = useMemo(() => {
    if (!!end_date && !!oldStudent && !!plan && !!startDate && !!totalPrice) {
      return {
        end_date,
        totalPrice,
        plan,
        start_date: startDate,
        student: oldStudent,
      };
    }
    return {};
  }, [end_date, oldStudent, plan, startDate, totalPrice]);

  async function handleSubmit(data) {
    try {
      const dateNow = new Date();

      const dateNowComp = `${dateNow.getDate()}/${dateNow.getMonth() +
        1}/${dateNow.getFullYear()}`;
      const dateFormComp = data.start_date
        ? `${data.start_date.getDate()}/${data.start_date.getMonth() +
            1}/${data.start_date.getFullYear()}`
        : dateNowComp;
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
        startDateNow = startOfDay(data.start_date);
      }

      let newData = {};
      if (!newDate) {
        newData = {
          student_id: data.student.value
            ? data.student.value
            : oldStudent.value,
          plan_id: data.plan.value ? data.plan.value : plan.value,
          start_date: data.start_date ? data.start_date : startDateNow,
        };
      } else {
        newData = {
          student_id: data.student.value
            ? data.student.value
            : oldStudent.value,
          plan_id: data.plan.value ? data.plan.value : plan.value,
          start_date: startDateNow,
        };
      }

      await api.put(`enrollments/${id}`, {
        ...newData,
      });
      history.push('/enrollments');
      toast.success('Matrícula alterada com sucesso');
    } catch (e) {
      if (e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e.response.data.error);
      }
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
      <Form onSubmit={handleSubmit} initialData={initialData}>
        <Nav>
          <strong>Edição de matrícula</strong>
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
                <DatePicker name="start_date" setChange={setNewDate} />
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

EnrollmentUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
