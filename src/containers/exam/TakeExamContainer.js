import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import {
  getProviders as getProvidersSaga,
  getKeywords as getKeywordsSaga,
  getTitles as getTitlesSaga,
  getStudy as getStudySaga,
  getSimulation as getSimulationSaga,
  getGrade as getGradeSaga,
  examGradeSuccess
} from '../../redux/modules/exam';
import Title from '../../components/Title';
import SearchExam from '../../components/exam/SearchExam';
import SolveExam from '../../components/exam/Solve';
import Bookmark from '../../components/exam/Bookmark';
import { PARAM_INIT_DATA } from '../../common/constant';

const TakeExamContainer = () => {
  const [param, setParam] = useState(PARAM_INIT_DATA);
  const providers = useSelector(state => state.exam.providers.data?.providers);
  const keywords = useSelector(state => state.exam.keywords.data?.titles);
  const titles = useSelector(state => state.exam.titles.data?.titles);
  const study = useSelector(state => state.exam.study.data);
  const simulation = useSelector(state => state.exam.simulation.data);
  const grade = useSelector(state => state.exam.grade.data);

  const dispatch = useDispatch();

  const getProviders = useCallback(
    params => {
      dispatch(getProvidersSaga(params));
    },
    [dispatch]
  );
  const getKeywords = useCallback(
    params => {
      dispatch(getKeywordsSaga(params));
    },
    [dispatch]
  );
  const getTitles = useCallback(
    params => {
      dispatch(getTitlesSaga(params));
    },
    [dispatch]
  );
  const getStudy = useCallback(
    params => {
      dispatch(getStudySaga(params));
    },
    [dispatch]
  );
  const getSimulation = useCallback(
    params => {
      dispatch(getSimulationSaga(params));
    },
    [dispatch]
  );

  const getGrade = useCallback(
    params => {
      dispatch(getGradeSaga(params));
    },
    [dispatch]
  );

  const initializeCorrectCount = () => {
    dispatch(examGradeSuccess(null));
  };

  return (
    <>
      <Title>문제 풀기</Title>
      {param.currentPage === 1 && (
        <>
          <SearchExam
            param={param}
            setParam={setParam}
            getProviders={getProviders}
            providers={providers}
            getKeywords={getKeywords}
            keywords={keywords}
            getTitles={getTitles}
            titles={titles}
            getStudy={getStudy}
            getSimulation={getSimulation}
            simulation={simulation}
            initializeCorrectCount={initializeCorrectCount}
          />
          <hr />
        </>
      )}

      {param.isSimulationShow && <Bookmark param={param} setParam={setParam} />}

      {(!_.isEmpty(study?.exams) || !_.isEmpty(simulation?.exams)) && (
        <SolveExam
          param={param}
          setParam={setParam}
          getStudy={getStudy}
          study={study}
          getSimulation={getSimulation}
          simulation={simulation}
          getGrade={getGrade}
          grade={grade}
        />
      )}
    </>
  );
};

export default TakeExamContainer;
