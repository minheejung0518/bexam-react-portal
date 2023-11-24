import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import _ from 'lodash';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import Timer from 'react-compound-timer';
import Swal from 'sweetalert2';

const Bookmark = props => {
  const { param, setParam } = props;

  const sortingBookmark = arr => {
    const tempArr = [[]];
    arr.forEach((bData, index) => {
      if (!(index % 5) && index > 4) {
        tempArr.push([]);
      }
      tempArr[Math.floor(index / 5)].push(bData);
    });
    return tempArr;
  };
  const bookmarkArr = sortingBookmark(
    param.bookmark.sort((prev, next) => {
      return Number(prev) - Number(next);
    })
  );

  const goToQuestion = e => {
    // return new Promise((resolve, reject) => {
    //   const questionNum = e.currentTarget.text;
    //   setParam({ ...param, currentPage: Math.ceil(Number(questionNum) / 10) });
    //   setTimeout(() => {
    //     resolve(questionNum);
    //   }, 300);
    // }).then(questionNum => {
    //   document.getElementsByClassName('questionItem')[(questionNum % 10) - 1].scrollIntoView();
    // });
    const questionNum = e.currentTarget.text;
    setParam({
      ...param,
      currentPage: Math.ceil(Number(questionNum) / 10),
      isScrolling: questionNum,
    });
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          right: '20px',
          top: '67px',
          zIndex: '1',
          width: '30%',
          borderRadius: 3,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#ddd',
          backgroundColor: '#fafafa',
        }}>
        <Table>
          <TableBody>
            {/*<TableRow>*/}
            {/*  <TableCell colSpan='6' component='th' align='center'>param.</TableCell>*/}
            {/*</TableRow>*/}
            <TableRow>
              <TableCell component='th' align='center'>
                Time
              </TableCell>
              <TableCell colSpan='5' align='center'>
                <Timer
                  initialTime={60000 * param.examTime}
                  lastUnit='h'
                  direction='backward'
                  formatValue={value => `${value < 10 ? `0${value}` : value}`}
                  checkpoints={[
                    {
                      time: 0,
                      callback: () => {
                        Swal.fire({
                          icon: 'warning',
                          type: 'warning',
                          text: '시험시간을 모두 사용하셨습니다.',
                        });
                        setParam({ ...param, timeOver: true });
                      },
                    },
                  ]}>
                  {() => (
                    <>
                      <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
                    </>
                  )}
                </Timer>
              </TableCell>
            </TableRow>
            {bookmarkArr.map((arr, index) => (
              <TableRow>
                {index === 0 && (
                  <TableCell component='th' rowSpan={bookmarkArr.length} align='center'>
                    Bookmark
                  </TableCell>
                )}
                {Array(5)
                  .fill(0)
                  .map((num, innerIndex) => (
                    <TableCell align='center'>
                      <a href='#none' onClick={goToQuestion}>
                        {arr[innerIndex]}
                      </a>
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default Bookmark;
