import React from 'react';
import { Pagination } from '@mui/material';

const Paging = ({ study, getStudy, param, setParam, mode, simulation, getSimulation }) => {
  const totalPages =Math.ceil(study?.totalCount / 10);
  const countPages=Math.ceil(simulation?.exams.length / 10);

  const nextPaging = newPage => {
    if (mode === 'study') {
      const studyParam = {
        ...param,
        examCode: param.selectedCode,
        pageNum: newPage,
      };
      getStudy(studyParam);
      setParam({ ...studyParam, currentPage: newPage });
    }

    if (mode === 'simulation') {
      const simulationParam = {
        ...param,
        examCode: param?.selectedCode,
        questionCount: param?.questionCount,
      }
      setParam({ ...simulationParam, currentPage: newPage });
    }

  };

  const handlePageChange = (event, page) => {
    nextPaging(page);
  };

  return (
      <Pagination
          className='css-wjh20t-MuiPagination-ul'
          page={param.currentPage}
          onChange={(event, page) => handlePageChange(event, page)}
          variant='outlined'
          shape='rounded'
          size='small'
          showFirstButton
          showLastButton
          count={mode === 'study' ? totalPages : countPages}
      />
  );
};

export default Paging;