import React, { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Swal from 'sweetalert2';
import { Typography } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import _ from 'lodash';
import { MODE, PARAM_INIT_DATA } from '../../common/constant';

function SearchIcon() {
  return null;
}

const SearchExam = props => {
  const {
    param,
    setParam,
    getProviders,
    providers,
    getKeywords,
    keywords,
    getTitles,
    titles,
    getStudy,
    getSimulation,
    simulation,
    initializeCorrectCount,
  } = props;
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSearchData, setSelectedSearchData] = useState(PARAM_INIT_DATA);

  const refs = {
    keywordInput: React.createRef(),
    wrap: React.createRef(),
  };

  useEffect(() => {
    getProviders();
  }, [getProviders]);

  useEffect(() => {
    getKeywords();
  }, [getKeywords]);

  const handleChange = event => {
    const curName = event.target.name;
    const curValue = event.target.value;

    let currentValue = { [curName]: curValue };

    if (curName === 'keyword') {
      currentValue = {
        ...currentValue,
        examName: keywords.filter(item => item.code === curValue)[0]?.name,
        providerCode: '',
        examCode: '',
        selectedCode: '',
      };
      getTitles(currentValue);
    }
    if (curName === 'providerCode') {
      currentValue = {
        ...currentValue,
        keyword: '',
        examCode: '',
        selectedCode: '',
      };
      getTitles(currentValue);
      setSuggestions([selectedSearchData, refs]);
    }
    if (curName === 'examCode') {
      currentValue = {
        ...currentValue,
        examName: keywords.filter(item => item.code === curValue)[0].name,
        selectedCode: curValue,
      };
    }
    setSelectedSearchData({ ...selectedSearchData, ...currentValue });
  };

  const handleAutoComplete = event => {
    handleChange(event);
    const curValue = event.target.value;
    if (_.isEmpty(curValue)) {
      setSuggestions([]);
    } else {
      const fitKeywords = keywords.filter(
        data => data.name.toUpperCase().indexOf(curValue.toUpperCase()) > -1
      );

      const inputArr = Object.keys(fitKeywords) //name
        .map(key => fitKeywords[key])
        .slice(0, 5);

      setSuggestions(inputArr);
    }
  };

  const handleClickAuto = event => {
    const keywordName = _.cloneDeep(event.target.textContent);
    const keywordCode = _.cloneDeep(event.target.getAttribute('value'));
    setSelectedSearchData({
      ...selectedSearchData,
      keyword: keywordName,
      selectedCode: keywordCode,
    });
    refs.keywordInput.current.children[0].value = keywordName;
  };

  const inputFocus = isFocus => {
    setSelectedSearchData({ ...selectedSearchData, inputFocus: isFocus });
  };

  const validAutoComplete = () => {
    return _.isEmpty(suggestions) ||
      !_.isEmpty(selectedSearchData?.selectedCode) ||
      !selectedSearchData?.inputFocus
      ? 'hide'
      : '';
  };

  const validStartExam = () => {
    if (_.isEmpty(selectedSearchData?.mode) || _.isEmpty(selectedSearchData?.selectedCode)) {
      return true;
    }

    if (
      selectedSearchData?.mode === MODE.SIMULATION &&
      (_.isEmpty(selectedSearchData?.questionCount) || _.isEmpty(selectedSearchData?.examTime))
    ) {
      return true;
    }

    return false;
  };

  const startExam = () => {
    let isSimulationShow = false;
    if (selectedSearchData?.mode === MODE.STUDY) {
      const studyParam = {
        examCode: selectedSearchData?.selectedCode,
        //시험명(시험코드) => examCode
        pageNum: 1,
      };
      getStudy(studyParam);
    }
    if (selectedSearchData?.mode === MODE.SIMULATION) {
      let text = '';

      if (selectedSearchData?.questionCount % 10) {
        text = '문항 수는 10의 배수로 입력해주세요';
      }
      if (
        selectedSearchData?.questionCount < 10 ||
        selectedSearchData?.questionCount > 100 ||
        selectedSearchData?.questionCount % 1
      ) {
        text = '문항 수는 10 이상 100 이하의 자연수를 입력해주세요';
      }
      if (
        selectedSearchData?.examTime < 10 ||
        selectedSearchData?.examTime > 180 ||
        selectedSearchData?.examTime % 1
      ) {
        text = '시험 시간은 10 이상 180 이하의 자연수를 입력해주세요';
      }

      if (!_.isEmpty(text)) {
        Swal.fire({
          icon: 'warning',
          type: 'warning',
          text: text,
        });
        return;
      }

      const simulationParam = {
        examCode: selectedSearchData?.selectedCode,
        //시험명(시험코드) => examCode
        questionCount: selectedSearchData?.questionCount,
      };
      getSimulation(simulationParam);
      isSimulationShow = true;

      initializeCorrectCount();
    }
    setParam({ ...selectedSearchData, isSimulationShow: false });
    setTimeout(() => {
      setParam({
        ...selectedSearchData,
        currentPage: 1,
        bookmark: [],
        timeOver: false,
        isSimulationShow: isSimulationShow,
        isGetGrade: false
      });
    }, 2000);
  };

  return (
    <>
      <div className='filtering-container' ref={refs.wrap}>
        <Typography variant='h6' component='h2'>
          문제 조회
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <div className='filtering-item'>
              <FormControl>
                <InputLabel id='publisher-label'>발행기관</InputLabel>
                <Select
                  labelId='publisher-label'
                  id='providerCode'
                  name='providerCode'
                  value={selectedSearchData?.providerCode}
                  onChange={e => handleChange(e)}
                  className='MuiSelect-root exam-search'>
                  {providers?.map(item => (
                    <MenuItem value={item.code} key={item.code}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className='filtering-item'>
              <FormControl>
                <InputLabel id='exam-code-label'>시험 명(시험 코드)</InputLabel>
                <Select
                  labelId='exam-code-label'
                  id='examCode'
                  name='examCode'
                  value={selectedSearchData?.examCode}
                  onChange={e => handleChange(e)}
                  className='MuiSelect-root exam-search'>
                  {titles?.map(item => (
                    <MenuItem value={item.code} key={item.code}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className='filtering-item or-divider'>
              <Typography>or</Typography>
            </div>
            <div className='filtering-item keyword-layer'>
              <FormControl>
                <InputLabel id='keyword-label'>Keyword</InputLabel>
                <Input
                  id='keyword'
                  name='keyword'
                  type='text'
                  className='MuiInputBase-root exam-search'
                  autoComplete='off'
                  value={selectedSearchData?.keyword}
                  ref={refs.keywordInput}
                  onChange={e => handleAutoComplete(e)}
                  onFocus={() => {
                    inputFocus(true);
                  }}
                  onBlur={() => {
                    inputFocus(false);
                  }}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton edge='end' aria-label='search'>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <div className={`auto-search-wrap ${validAutoComplete()}`}>
                {suggestions?.map(suggestion => (
                  <p key={suggestion.code}>
                    <a
                      href='#none'
                      value={suggestion.code}
                      onMouseDown={event => {
                        handleClickAuto(event);
                      }}>
                      {suggestion.name}
                    </a>
                  </p>
                ))}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={2} />
        </Grid>

        <Divider />
        <div className='filtering-item'>
          <FormControl>
            <InputLabel id='mode-label'>Mode</InputLabel>
            <Select
              labelId='mode-label'
              id='mode'
              name='mode'
              value={selectedSearchData?.mode}
              onChange={e => handleChange(e)}
              className='MuiSelect-root'>
              <MenuItem value={MODE.STUDY}>학습 모드</MenuItem>
              <MenuItem value={MODE.SIMULATION}>모의 시험 모드</MenuItem>
            </Select>
          </FormControl>
        </div>
        {selectedSearchData?.mode === MODE.SIMULATION && (
          <>
            <div className='filtering-item'>
              <FormControl>
                <InputLabel htmlFor='question-number'>출제 문항 수 (10 배수 입력)</InputLabel>
                <Input
                  id='questionCount'
                  name='questionCount'
                  type='number'
                  className='MuiInputBase-root'
                  value={selectedSearchData?.questionCount}
                  onChange={e => handleChange(e)}
                />
              </FormControl>
            </div>
            <div className='filtering-item'>
              <FormControl>
                <InputLabel htmlFor='exam-time'>시험 시간 (10 ~ 180)</InputLabel>
                <Input
                  id='examTime'
                  name='examTime'
                  type='number'
                  className='MuiInputBase-root'
                  onChange={e => handleChange(e)}
                  value={selectedSearchData?.examTime}
                  endAdornment={<InputAdornment position='end'>min</InputAdornment>}
                />
              </FormControl>
            </div>
          </>
        )}
        <div className='filtering-item start-exam'>
          <Button
            variant='contained'
            color='primary'
            className='MuiButton-contained'
            disabled={validStartExam()}
            onClick={startExam}>
            Start Exam
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchExam;
