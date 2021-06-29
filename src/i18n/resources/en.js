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
    live: "Live"
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
  },
  quiz: {
    next: "Next",
    close: "Close",
    back: "Back",
    update: 'Update',
    next_lesson: 'Next Lesson',
    next_module: 'Next Module',
    next_course: 'Plus Courses',
    quiz_module: 'Final quiz',
    view_lesson: 'View lesson',
    try_again: 'Try again',
    quiz_correct: 'You have finished this lesson',
    quiz_wrong: 'Almost, try the lesson again',
    quiz_final_correct: 'You have finished this module',
    quiz_final_wrong: 'Almost, try the module again'
  },
  frequent_questions: {
    theme: 'Theme'
  },
  memories: {
    header: 'Memories',
    sub_header: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec arcu lectus, cursus et fringilla rutrum massa. Etiam ante odio, ullamcorper nec rutrum a, gravida vitae elit.',
    memory: 'Memory',
    live: "Live"
  },
  tutorials: {
    header: 'Tutorials',
    goTo: 'Go to tutorial',
  },
  tools: {
    header: 'Tools',
    goTo: 'Go to tool',
  },
  events: {
    click_here: 'Click Here',
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
  reset_course: 'Restart course'
}

export const en = {
  header,
  button,
  scenes,
  error
}