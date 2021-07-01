const general_error = 'Sorry we have a problem, please try again later'

const header = {
  item: {
    courses: 'Courses',
    class_live: 'Live classes',
    leadership: 'Leadership',
    tutorials: 'Tutorials',
    tools: 'Tools',
    questions_frequent: 'Frequently asked questions',
    log_out: 'Log Out',
    memories: 'Memories',
    events: 'FEX Events',
    live: "Live",
    login: 'Login'
  },
  profile: {
    hi: 'Hi'
  }
}

const scenes = {
  courses: {
    welcome: 'Welcome',
    welcome_first_paragraph_first: 'Access the academic and information content that',
    welcome_first_paragraph_second: 'has created for you.',
    welcome_second_paragraph: 'We want you to start or boost your digital business venture with these.',
    modules: 'Modules',
    hours: 'Hours and',
    minute: 'Minute',
    min: 'min',
    start_course: "Start course",
    continue_course: 'Continue course',
    course_progress: "Course Progress",
    course_detail: "Course Detail"
  },
  modules: {
    modules: 'Modules',
    module: 'Module',
    lessons: 'Lessons',
    theme_summary: 'Theme summary',
    quiz: 'Quiz',
    files: 'Files',
    correct: '¡Correct!',
    wrong: '¡Wrong!',
    confirm: 'Confirm',
  },
  profileCourse: {
    course_details: 'Course details',
    characteristics: 'Characteristics',
    modules: 'Modules',
    hours: 'Hours',
    available: "Available in {{unlockDays}} day{{plural}}",
  },
  profileUser: {
    data: 'Personal data',
    age: 'Age',
    civilStatus: 'Civil status',
    gender: 'Gender',
    studies: 'Level of studies',
    country: 'Country',
    profession: 'Profession',
    city: 'City',
    employmentSituation: 'Employment situation'
  }
}

const error = {
  general_error,
  login: {
    ERROR_LOGIN: general_error,
    USER_NOT_EXIST: 'User does not exist',
    NO_PASSWORD: 'Please input your password!',
    NO_USERNAME: 'Please input your username!',
    USER_INACTIVED: 'The user is inactive.'
  }
}

const button = {
  login: 'Login',
  user: 'User',
  password: 'Password',
  start: 'Start',
  continue: 'Continue',
  begin: 'Begin',
  logout: 'Sign off',
  account: 'My account',
  go_to: 'Go to',
  reset_course: 'Restart course',
  entry: "Entry",
  forgotPassword: "¡Forgot your password?",
  clickHere: "Click here",
  notAccount: "You do not have an account?",
  signHere: "Sign up here"
}

export const en = {
  header,
  button,
  scenes,
  error
}