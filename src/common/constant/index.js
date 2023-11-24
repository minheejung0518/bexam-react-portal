import React from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export const BASE_API_URL = process.env.REACT_APP_API_URL;

export const menuListItems = [
  {
    href: '/exam',
    icon: <MenuBookIcon />,
    title: '문제 풀기',
  },
];

export const MODE = {
    STUDY: 'study',
    SIMULATION : 'simulation'
  };

export const PARAM_INIT_DATA = {
    providerCode: '',
    examCode: '',
    examName: '',
    keyword: '',
    selectedCode: '',
    mode: '',
    questionCount: '',
    examTime: '',
    inputFocus: false,
    currentPage: 1,
    bookmark: [],
    isSimulationShow: false,
    timeOver: false,
    isScrolling: false,
    isGetGrade: false
};

export const BOOKMARK_IMAGE_PATH = {
    base: 'images/bookmark_purple_white.png',
    clicked : 'images/bookmark_purple.png'
};
