import axios from 'axios';
import _ from 'lodash';
import { BASE_API_URL } from '../common/constant';

const API_URL = `${BASE_API_URL}/bexam/api`;

export default class ExamService {
  static async getProviders(token) {
    const response = await axios.get(`${API_URL}/providers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // const response = {
    //   data: {
    //     providers: [
    //       {
    //         code: 'a1',
    //         name: 'amazon',
    //       },
    //       {
    //         code: 'a2',
    //         name: 'ms',
    //       },
    //     ],
    //   },
    // };
    return response.data;
  }

  static async getKeywords(token) {
    const response = await axios.get(`${API_URL}/titles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async getExamTitles(token, params) {
    const response = await axios.get(`${API_URL}/titles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    // let response = {
    //   data: {},
    // };
    // if (param === 'a1') {
    //   response = {
    //     data: {
    //       titles: [
    //         {
    //           code: 'aa1',
    //           name: 'amazon exam 1',
    //         },
    //         {
    //           code: 'aa2',
    //           name: 'amazon exam 2',
    //         },
    //       ],
    //     },
    //   };
    // }
    // if (param === 'a2') {
    //   response = {
    //     data: {
    //       titles: [
    //         {
    //           code: 'bb1',
    //           name: 'azure exam 1',
    //         },
    //         {
    //           code: 'bb2',
    //           name: 'azure exam 2',
    //         },
    //       ],
    //     },
    //   };
    // }

    return response.data;
  }

  static async getStudy(token, params) {
    // const {examCode, pageNum} = params;
    const response = await axios.get(`${API_URL}/study`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });

    response.data.exams = response.data?.exams?.map(studyArr => {
      return {
        ...studyArr,
        title: _.isEmpty(studyArr.title) ? '' : studyArr.title.replaceAll('\r\n', '<br/>'),
        questions: studyArr.questions.map(questionArr => {
          return {
            ...questionArr,
            text: _.isEmpty(questionArr.text) ? '' : questionArr.text.replaceAll('\r\n', '<br/>'),
          };
        }),
      };
    });

    console.log(response);
    return response.data;
  }

  static async getSimulation(token, params) {
    // const { examCode, questionCount } = params;
    const answerArr = [];
    const response = await axios.get(`${API_URL}/simulation`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });

    response.data.exams = response.data?.exams?.map(simulationArr => {
      return {
        ...simulationArr,
        title: _.isEmpty(simulationArr.title)
          ? ''
          : simulationArr.title.replaceAll('\r\n', '<br/>'),
        questions: simulationArr.questions.map(questionArr => {
          return {
            ...questionArr,
            text: _.isEmpty(questionArr.text) ? '' : questionArr.text.replaceAll('\r\n', '<br/>'),
          };
        }),
      };
    });

    response.data?.exams?.forEach(simulationArr => {
      answerArr.push({ questionNo: simulationArr.no, answer: '' });
    });
    response.data.answers = answerArr;

    return response.data;
  }

  static async getGrade(token, params) {
    const response = await axios.post(`${API_URL}/grade`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);

    return response.data;
  }
}
