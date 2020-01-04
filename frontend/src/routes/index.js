import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Student from '~/pages/Student';
import StudentUpdate from '~/pages/Student/Update';
import StudentCreate from '~/pages/Student/Create';

import Plan from '~/pages/Plan';
import PlanUpdate from '~/pages/Plan/Update';
import PlanCreate from '~/pages/Plan/Create';

import Enrollment from '~/pages/Enrollment';
import EnrollmentUpdate from '~/pages/Enrollment/Update';
import EnrollmentCreate from '~/pages/Enrollment/Create';

import HelpOrder from '~/pages/HelpOrder';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Student} isPrivate />
      <Route path="/students/update/:id" component={StudentUpdate} isPrivate />
      <Route path="/students/create" component={StudentCreate} isPrivate />

      <Route path="/plans" exact component={Plan} isPrivate />
      <Route path="/plans/update/:id" component={PlanUpdate} isPrivate />
      <Route path="/plans/create" component={PlanCreate} isPrivate />

      <Route path="/enrollments" exact component={Enrollment} isPrivate />
      <Route
        path="/enrollments/update/:id"
        component={EnrollmentUpdate}
        isPrivate
      />
      <Route
        path="/enrollments/create"
        component={EnrollmentCreate}
        isPrivate
      />

      <Route path="/helporders" component={HelpOrder} isPrivate />
    </Switch>
  );
}
