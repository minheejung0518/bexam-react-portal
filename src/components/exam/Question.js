import React, { useState } from 'react';
import { Box, Grid, Checkbox } from '@mui/material';
import _ from 'lodash';
import { BOOKMARK_IMAGE_PATH } from '../../common/constant';

const Question = ({
  title,
  no,
  questions,
  correct,
  multiAnswerYn,
  displayNo,
  selectedAnswer,
  setAnswers,
  answers,
  isBookmarking,
  param,
  setParam,
  grade,
}) => {
  const questionNo = Number(displayNo);

  const handleRadioButton = event => {
    const tempAnswers = _.cloneDeep(answers);
    tempAnswers[questionNo - 1].answer = [event.target.value];
    setAnswers(tempAnswers);
  };

  const handleCheckButton = event => {
    const tempAnswers = _.cloneDeep(answers);
    const curValue = `${event.target.value}`;

    const ind = Number(displayNo) - 1;
    const selectedAnswersArray = tempAnswers[ind].answer || [];
    if (event.target.checked) {
      const newSelectedAnswersArray = [...selectedAnswersArray, curValue];
      tempAnswers[ind].answer = newSelectedAnswersArray;
    } else {
      const newSelectedAnswersArray = selectedAnswersArray.filter(value => value !== curValue);
      tempAnswers[ind].answer = newSelectedAnswersArray;
    }
    setAnswers(tempAnswers);
  };

  const handleBookmarkButton = event => {
    const tempParam = _.cloneDeep(param);
    if (event.currentTarget.className.includes('clicked')) {
      tempParam.bookmark = tempParam.bookmark.filter(num => num !== event.currentTarget.value);
    } else {
      tempParam.bookmark.push(event.currentTarget.value);
    }
    setParam(tempParam);
  };

  const getAnswerOptionColor = answerIndex => {
    if (!grade) {
      return { color: 'black', fontWeight: 'normal' };
    }
    const gradeData = grade?.wrongAnswers?.filter(item => item.no === no);
    console.log(gradeData);

    if (gradeData?.length && gradeData[0].correct) {
      const correctAnswerStrings = gradeData[0].correct.map(num => `${num}`);
      return correctAnswerStrings.includes(`${answerIndex}`)
        ? { color: 'red', fontWeight: 'bold' }
        : { color: 'black', fontWeight: 'normal' };
    }
    return { color: 'black', fontWeight: 'normal' };
  };

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 1,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ddd',
        backgroundColor: '#fafafa',
        marginBottom: 3,
        padding: '15px 20px',
      }}
      className='questionItem'>
      <Grid item xs={12} lg={3}>
        {param.mode === 'simulation' && (
          <button
            type='button'
            className={`bookmark ${isBookmarking}`}
            value={displayNo}
            onClick={handleBookmarkButton}>
            <img
              src={
                isBookmarking === 'clicked' ? BOOKMARK_IMAGE_PATH.clicked : BOOKMARK_IMAGE_PATH.base
              }
              className='bookmark'
              alt='bookmark'
            />
          </button>
        )}
        <span>Question {displayNo}.</span>
      </Grid>
      <br />
      <h3 className='questionTitle' dangerouslySetInnerHTML={{ __html: title }} />
      <br />
      <ol>
        {questions.map(question => (
          <li key={question.no}>
            {param.mode === 'simulation' ? (
              <>
                {multiAnswerYn === 'Y' ? (
                  <label htmlFor={`${displayNo}-question-${question.no}`}>
                    <Grid container spacing={2} sx={{ marginLeft: '0px' }}>
                      <Grid
                        sx={{
                          textAlign: 'top',
                          padding: '5px 3px 3px 3px',
                          margin: '4px',
                          position: 'static',
                        }}>
                        <input
                          type='checkbox'
                          id={`${displayNo}-question-${question.no}`}
                          value={question.no}
                          checked={selectedAnswer.includes(`${question.no}`)}
                          onChange={handleCheckButton}
                          disabled={param.timeOver || param.isGetGrade}
                        />
                      </Grid>
                      <Grid
                        sx={{
                          textAlign: 'top',
                          padding: '3px',
                          margin: '4px',
                          position: 'static',
                        }}>
                        <span
                          dangerouslySetInnerHTML={{ __html: `${question.no}. ${question.text}` }}
                          style={getAnswerOptionColor(question.no)}
                        />
                      </Grid>
                    </Grid>
                  </label>
                ) : (
                  <label htmlFor={`${displayNo}-question-${question.no}`}>
                    <Grid container spacing={2} sx={{ marginLeft: '0px' }}>
                      <Grid
                        sx={{
                          textAlign: 'top',
                          padding: '5px 3px 3px 3px',
                          margin: '4px',
                          position: 'static',
                        }}>
                        <input
                          type='radio'
                          name={`${displayNo}-question-${no}`}
                          id={`${displayNo}-question-${question.no}`}
                          value={question.no}
                          checked={Number(selectedAnswer) === Number(question.no)}
                          onChange={handleRadioButton}
                          disabled={param.timeOver || param.isGetGrade}
                        />
                      </Grid>
                      <Grid
                        sx={{
                          textAlign: 'top',
                          padding: '3px',
                          margin: '4px',
                          position: 'static',
                        }}>
                        <span
                          dangerouslySetInnerHTML={{ __html: `${question.no}. ${question.text}` }}
                          style={getAnswerOptionColor(question.no)}
                        />
                      </Grid>
                    </Grid>
                  </label>
                )}
              </>
            ) : (
              <>
                <span
                  style={{
                    color: !_.isEmpty(correct) && correct.includes(question.no) ? 'red' : 'black',
                  }}
                  dangerouslySetInnerHTML={{ __html: `${question.no}. ${question.text}` }}
                />
              </>
            )}
          </li>
        ))}
      </ol>
    </Box>
  );
};

export default Question;
