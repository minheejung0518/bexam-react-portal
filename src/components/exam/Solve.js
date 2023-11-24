import React, { useEffect, useState } from 'react';
import { Box, Button, Divider } from '@mui/material';
import { Typography } from '@material-ui/core';
import Swal from "sweetalert2";
import _ from 'lodash';
import Question from './Question';
import Paging from '../List/Paging';


const SolveExam = props => {
  const { study, getStudy, param, setParam, getSimulation, simulation, getGrade, grade } = props;
  const [currentPageData, setCurrentPageData] = useState([]);
  // const examsToRender = param.mode === 'simulation' ? currentPageData : study?.exams;
  const [examsToRender, setExamsToRender] = useState(
    param.mode === 'simulation' ? currentPageData : study?.exams
  );
  const countPerPage = 10;
  const totalPages = Math.ceil(param?.questionCount / countPerPage);
  const [answers, setAnswers] = useState(simulation?.answers);
  const [isGradeBtnDisabled, setIsGradeBtnDisabled] = useState(false);

  useEffect(() => {
    const startIndex = (param.currentPage - 1) * countPerPage;
    const endIndex = startIndex + countPerPage;
    if (param.mode === 'simulation' && simulation?.exams) {
      setCurrentPageData(simulation?.exams.slice(startIndex, endIndex));
    }
  }, [param.currentPage, simulation, param.mode]);

  useEffect(() => {
    if (param.isScrolling) {
      setTimeout(() => {
        document
          .getElementsByClassName('questionItem')
          [(param.isScrolling - 1) % 10].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 400);
      setParam({ ...param, isScrolling: false });
    }
  }, [param, setParam]);

  useEffect(() => {
    setAnswers(simulation?.answers);
  }, [setAnswers, simulation]);

  useEffect(() => {
    setExamsToRender(param.mode === 'simulation' ? currentPageData : study?.exams);
  }, [param.mode, setExamsToRender, currentPageData, study, examsToRender]);


  const handleGradeExam = () => {
    let text = '답안을 제출 할까요?'
    answers.forEach(item => {
      if(_.isEmpty(item.answer)) {
        text = '풀지않은 문제가 있습니다. 그래도 답안을 제출할까요?'
      }
    })
    Swal.fire({
      // title: 'Modify',
      text: text,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'cancel'
    }).then(isConfirm => {
      console.log(isConfirm);
      if (isConfirm.value) {
        const noObj = simulation?.exams.map(item => ({
          no: item.no,
        }));

        const userAnswers = answers.map((item, index) => ({
          answer: _.isEmpty(item.answer) ? [] : item.answer,
          no: noObj[index].no,
        }));
        console.log('answers:', answers);
        console.log('userAnswers:', userAnswers);

        const gradeParam = {
          userSeq: 1,
          examCode: param.selectedCode,
          totalCount: param.questionCount,
          answers: userAnswers,
        };
        console.log('gradeParam:', gradeParam);

        getGrade(gradeParam);
        setAnswers(prevAnswers => ({
          ...prevAnswers,
          answer: userAnswers,
        }));

        setParam({...param, isSimulationShow: false, isGetGrade: true});
      }
    });

  };

  return (
    <>
      <Typography variant='h6' component='h2'>
        <span>{param.examName}</span>
      </Typography>
      <Divider
        sx={{
          marginTop: '20px',
          marginBottom: '20px',
        }}
      />

      <Box
        sx={{
          width: '100%',
          borderRadius: 3,
          borderWidth: 1,
          backgroundColor: '#fafafa',
          padding: '16px',
        }}>
        {!_.isEmpty(examsToRender) &&
          examsToRender.map((exam, index) => {
            const displayNo = (Number(param?.currentPage) - 1) * 10 + 1 + index;
            return (
              <Question
                {...exam}
                key={exam.no}
                displayNo={displayNo}
                answers={answers}
                selectedAnswer={
                  param.mode === 'simulation' && !_.isEmpty(answers)
                    ? answers[displayNo - 1].answer
                    : []
                }
                setAnswers={setAnswers}
                isBookmarking={param.bookmark.includes(`${displayNo}`) ? 'clicked' : ''}
                param={param}
                setParam={setParam}
                grade={grade}
              />
            );
          })}

        {param.currentPage === totalPages && (
          <>
            <div className='right-align'>
              <Button
                variant='contained'
                color='primary'
                className='MuiButton-contained'
                onClick={handleGradeExam}
                disabled={param.isGetGrade}
              >
                채점하기
              </Button>

              <Typography variant='h5' fontWeight='bold'>
                맞힌 개수: {(grade?.correctCount ? grade?.correctCount : 0)} / {param?.questionCount}
              </Typography>
            </div>
          </>
        )}

        {!_.isEmpty(examsToRender) && (
          <Paging
            param={param}
            setParam={setParam}
            getStudy={getStudy}
            study={study}
            simulation={simulation}
            getSimulation={getSimulation}
            mode={param.mode}
          />
        )}
      </Box>
    </>
  );
};

export default SolveExam;
